// Nature Moments Benelux - Application Logic

// Initialize map
const map = L.map('map').setView([51.0, 5.0], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// State
let markers = [];
let selectedLocation = null;
let userLocation = null;
let sortByDistance = false;
let currentFilters = {
    season: 'all',
    type: 'all',
    region: 'all',
    search: ''
};

// Geolocation
function getUserLocation() {
    if (!navigator.geolocation) {
        console.log('Geolocation not supported');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            updateNearMeButton(true);
            if (sortByDistance) {
                renderLocationList();
            }
        },
        (error) => {
            console.log('Geolocation error:', error);
            updateNearMeButton(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

function updateNearMeButton(hasLocation) {
    const btn = document.getElementById('nearMeBtn');
    if (btn) {
        btn.disabled = !hasLocation;
        btn.title = hasLocation ? 'Sort by distance from you' : 'Location not available';
    }
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    // Haversine formula
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function getDistanceText(km) {
    if (km < 1) return `${Math.round(km * 1000)}m`;
    if (km < 10) return `${km.toFixed(1)}km`;
    return `${Math.round(km)}km`;
}

function toggleNearMe() {
    if (!userLocation) {
        getUserLocation();
        return;
    }
    sortByDistance = !sortByDistance;
    const btn = document.getElementById('nearMeBtn');
    if (btn) {
        btn.classList.toggle('active', sortByDistance);
    }
    renderLocationList();
}

function fitMapToFiltered() {
    const filtered = getFilteredLocations();
    if (filtered.length === 0) return;
    
    const bounds = L.latLngBounds(filtered.map(l => [l.lat, l.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
    
    // On mobile, collapse the bottom sheet
    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth <= 768) {
        sidebar.classList.remove('expanded');
        sidebar.classList.add('collapsed');
    }
}

// Helper functions
function getCurrentDate() {
    return new Date();
}

function parseDate(dateStr, year) {
    const [month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function isHappeningNow(location) {
    const now = getCurrentDate();
    const year = now.getFullYear();
    
    // Handle year-wrapping events (e.g., winter events spanning Dec-Feb)
    const start = parseDate(location.bestTime.start, year);
    let end = parseDate(location.bestTime.end, year);
    
    // If end is before start, it wraps to next year
    if (end < start) {
        end = parseDate(location.bestTime.end, year + 1);
    }
    
    // Check if now is within range, accounting for year wrap
    if (now >= start && now <= end) {
        return true;
    }
    
    // Also check if we're in the previous year's wrap
    const startLastYear = parseDate(location.bestTime.start, year - 1);
    const endLastYear = parseDate(location.bestTime.end, year);
    if (now >= startLastYear && now <= endLastYear && startLastYear > endLastYear) {
        return true;
    }
    
    return false;
}

function isComingSoon(location, daysAhead = 14) {
    const now = getCurrentDate();
    const year = now.getFullYear();
    const start = parseDate(location.bestTime.start, year);
    
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + daysAhead);
    
    return start > now && start <= futureDate;
}

function getMonthsForEvent(location) {
    const months = [];
    const startParts = location.bestTime.start.split('-').map(Number);
    const endParts = location.bestTime.end.split('-').map(Number);
    
    let month = startParts[0];
    const endMonth = endParts[0];
    
    // Handle wrap-around (e.g., Dec to Feb)
    while (true) {
        months.push(month);
        if (month === endMonth) break;
        month = month === 12 ? 1 : month + 1;
        if (months.length > 12) break; // Safety
    }
    
    return months;
}

function formatDateRange(start, end) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [sm, sd] = start.split('-').map(Number);
    const [em, ed] = end.split('-').map(Number);
    return `${monthNames[sm-1]} ${sd} – ${monthNames[em-1]} ${ed}`;
}

function getSeason(location) {
    return eventTypes[location.type]?.season || 'spring';
}

function getSeasonName(season) {
    const names = { spring: 'Spring', summer: 'Summer', autumn: 'Autumn', winter: 'Winter' };
    return names[season] || season;
}

// Create marker icons
function createMarkerIcon(location) {
    const season = getSeason(location);
    const emoji = eventTypes[location.type]?.emoji || '📍';
    const isNow = isHappeningNow(location);
    
    return L.divIcon({
        className: 'custom-icon',
        html: `<div class="custom-marker ${season} ${isNow ? 'now' : ''}">${emoji}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
    });
}

// Render functions
function renderLocationList() {
    const list = document.getElementById('locationList');
    const filtered = getFilteredLocations();
    
    if (filtered.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <span class="icon">🔍</span>
                <h4>No locations found</h4>
                <p>Try adjusting your filters</p>
            </div>
        `;
        return;
    }
    
    // Calculate distances if we have user location
    const withDistance = filtered.map(loc => ({
        ...loc,
        distance: userLocation ? calculateDistance(userLocation.lat, userLocation.lng, loc.lat, loc.lng) : null
    }));
    
    // Sort: by distance if enabled, otherwise happening now first, then famous, then alphabetical
    withDistance.sort((a, b) => {
        if (sortByDistance && a.distance !== null && b.distance !== null) {
            return a.distance - b.distance;
        }
        const aNow = isHappeningNow(a);
        const bNow = isHappeningNow(b);
        if (aNow !== bNow) return bNow - aNow;
        if (a.famous !== b.famous) return b.famous - a.famous;
        return a.name.localeCompare(b.name);
    });
    
    list.innerHTML = withDistance.map(loc => {
        const isNow = isHappeningNow(loc);
        const type = eventTypes[loc.type];
        const season = getSeason(loc);
        const distanceText = loc.distance !== null ? getDistanceText(loc.distance) : '';
        
        return `
            <div class="location-card ${isNow ? 'happening-now' : ''} ${selectedLocation === loc.name ? 'selected' : ''}" 
                 onclick="selectLocation('${loc.name.replace(/'/g, "\\'")}')">
                <div class="location-header">
                    <h4>${type?.emoji || ''} ${loc.famous ? '⭐ ' : ''}${loc.name}</h4>
                    <div class="header-badges">
                        ${distanceText && sortByDistance ? `<span class="distance-badge">${distanceText}</span>` : ''}
                        ${isNow ? '<span class="now-badge">Now</span>' : ''}
                    </div>
                </div>
                <div class="location-type">${type?.name || loc.type}</div>
                <div class="location-meta">
                    <span class="tag season-${season}">${getSeasonName(season)}</span>
                    <span class="tag region">${loc.region}</span>
                    ${distanceText && !sortByDistance ? `<span class="tag distance">${distanceText}</span>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    // Update counts
    const happeningNowCount = filtered.filter(isHappeningNow).length;
    document.getElementById('locationCount').textContent = `${filtered.length} locations`;
    document.getElementById('happeningNowCount').textContent = `${happeningNowCount} happening now`;
}

function createMarkers() {
    // Clear existing
    markers.forEach(m => map.removeLayer(m));
    markers = [];
    
    const filtered = getFilteredLocations();
    
    filtered.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lng], { icon: createMarkerIcon(loc) })
            .addTo(map)
            .bindPopup(`
                <div class="popup-content">
                    <h4>${eventTypes[loc.type]?.emoji || ''} ${loc.name}</h4>
                    <p>${eventTypes[loc.type]?.name || loc.type} • ${loc.province}</p>
                </div>
            `);
        
        marker.on('click', () => selectLocation(loc.name));
        markers.push(marker);
    });
}

function getFilteredLocations() {
    return locations.filter(loc => {
        // Season filter
        if (currentFilters.season !== 'all') {
            const season = getSeason(loc);
            if (season !== currentFilters.season) return false;
        }
        
        // Type filter
        if (currentFilters.type !== 'all') {
            if (loc.type !== currentFilters.type) return false;
        }
        
        // Region filter
        if (currentFilters.region !== 'all') {
            if (loc.region !== currentFilters.region) return false;
        }
        
        // Search filter
        if (currentFilters.search) {
            const search = currentFilters.search.toLowerCase();
            const searchable = `${loc.name} ${loc.province} ${loc.region} ${eventTypes[loc.type]?.name || ''}`.toLowerCase();
            if (!searchable.includes(search)) return false;
        }
        
        return true;
    });
}

function selectLocation(name) {
    const loc = locations.find(l => l.name === name);
    if (!loc) return;
    
    selectedLocation = name;
    map.setView([loc.lat, loc.lng], 11);
    showInfoPanel(loc);
    renderLocationList();
}

function showInfoPanel(loc) {
    const type = eventTypes[loc.type];
    const season = getSeason(loc);
    
    document.getElementById('panelTitle').textContent = 
        `${type?.emoji || ''} ${loc.famous ? '⭐ ' : ''}${loc.name}`;
    
    document.getElementById('panelMeta').innerHTML = `
        <span class="tag season-${season}">${getSeasonName(season)}</span>
        <span class="tag region">${loc.region}</span>
        <span>${loc.province}</span>
    `;
    
    document.getElementById('panelTiming').innerHTML = 
        `📅 Best time: ${formatDateRange(loc.bestTime.start, loc.bestTime.end)}` +
        (isHappeningNow(loc) ? ' <strong>• HAPPENING NOW!</strong>' : '');
    
    document.getElementById('panelDesc').textContent = loc.description;
    document.getElementById('panelDirections').href = 
        `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
    document.getElementById('panelInfo').href = loc.website;
    
    document.getElementById('infoPanel').classList.add('active');
}

function closePanel() {
    document.getElementById('infoPanel').classList.remove('active');
    selectedLocation = null;
    renderLocationList();
}

// Update "Now" banner
function updateNowBanner() {
    const nowLocations = locations.filter(isHappeningNow);
    const comingSoon = locations.filter(l => isComingSoon(l, 14) && !isHappeningNow(l));
    
    const nowTypes = [...new Set(nowLocations.map(l => eventTypes[l.type]?.name))];
    const soonTypes = [...new Set(comingSoon.map(l => eventTypes[l.type]?.name))];
    
    let text = '';
    if (nowTypes.length > 0) {
        text = `🌟 Happening now: ${nowTypes.slice(0, 3).join(', ')}`;
        if (nowTypes.length > 3) text += ` +${nowTypes.length - 3} more`;
    }
    if (soonTypes.length > 0 && text) {
        text += ` | Coming soon: ${soonTypes.slice(0, 2).join(', ')}`;
    } else if (soonTypes.length > 0) {
        text = `📅 Coming soon: ${soonTypes.slice(0, 3).join(', ')}`;
    }
    
    if (!text) {
        text = '🌿 Explore nature moments throughout the year in Benelux';
    }
    
    document.getElementById('nowText').textContent = text;
    
    // Click handler
    document.getElementById('nowBanner').onclick = () => {
        currentFilters = { season: 'all', type: 'all', region: 'all', search: '' };
        updateFilterUI();
        renderLocationList();
        createMarkers();
        
        // Scroll to first "now" location
        const firstNow = nowLocations[0];
        if (firstNow) {
            selectLocation(firstNow.name);
        }
    };
}

// Initialize type filters
function initTypeFilters() {
    const container = document.getElementById('typeFilters');
    const types = Object.entries(eventTypes);
    
    container.innerHTML = `<button class="chip active" data-type="all">All Types</button>`;
    
    types.forEach(([key, info]) => {
        const chip = document.createElement('button');
        chip.className = `chip ${info.season}`;
        chip.dataset.type = key;
        chip.textContent = `${info.emoji} ${info.name}`;
        container.appendChild(chip);
    });
}

function updateFilterUI() {
    // Season
    document.querySelectorAll('#seasonFilters .chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.season === currentFilters.season);
    });
    
    // Type
    document.querySelectorAll('#typeFilters .chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.type === currentFilters.type);
    });
    
    // Region
    document.querySelectorAll('#regionFilters .chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.region === currentFilters.region);
    });
    
    // Search
    document.getElementById('searchInput').value = currentFilters.search;
}

// Calendar view
function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const currentMonth = getCurrentDate().getMonth() + 1;
    
    grid.innerHTML = months.map((monthName, idx) => {
        const monthNum = idx + 1;
        const isCurrent = monthNum === currentMonth;
        
        // Get events for this month
        const eventsThisMonth = {};
        locations.forEach(loc => {
            const eventMonths = getMonthsForEvent(loc);
            if (eventMonths.includes(monthNum)) {
                const type = loc.type;
                if (!eventsThisMonth[type]) {
                    eventsThisMonth[type] = [];
                }
                eventsThisMonth[type].push(loc);
            }
        });
        
        const eventEntries = Object.entries(eventsThisMonth);
        
        return `
            <div class="month-card ${isCurrent ? 'current' : ''}">
                <h3>${isCurrent ? '📍 ' : ''}${monthName}</h3>
                <div class="month-events">
                    ${eventEntries.length === 0 ? '<p style="color: #9ca3af; font-size: 0.85rem;">Quiet month</p>' : ''}
                    ${eventEntries.map(([type, locs]) => `
                        <div class="month-event" onclick="filterByType('${type}')">
                            <span class="emoji">${eventTypes[type]?.emoji || '📍'}</span>
                            <span>${eventTypes[type]?.name || type}</span>
                            <span class="count">${locs.length}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function filterByType(type) {
    currentFilters.type = type;
    currentFilters.season = 'all';
    updateFilterUI();
    
    // Switch to map view
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === 'map');
    });
    document.getElementById('mapView').classList.remove('hidden');
    document.getElementById('calendarView').classList.remove('active');
    
    renderLocationList();
    createMarkers();
}

// Event listeners
function initEventListeners() {
    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.getElementById('mapView').classList.toggle('hidden', view !== 'map');
            document.getElementById('calendarView').classList.toggle('active', view === 'calendar');
            
            if (view === 'calendar') {
                renderCalendar();
            } else {
                setTimeout(() => map.invalidateSize(), 100);
            }
        });
    });
    
    // Season filters
    document.getElementById('seasonFilters').addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        
        currentFilters.season = chip.dataset.season;
        updateFilterUI();
        renderLocationList();
        createMarkers();
        closePanel();
    });
    
    // Type filters
    document.getElementById('typeFilters').addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        
        currentFilters.type = chip.dataset.type;
        updateFilterUI();
        renderLocationList();
        createMarkers();
        closePanel();
    });
    
    // Region filters
    document.getElementById('regionFilters').addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        
        currentFilters.region = chip.dataset.region;
        updateFilterUI();
        renderLocationList();
        createMarkers();
        closePanel();
    });
    
    // Search
    let searchTimeout;
    document.getElementById('searchInput').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentFilters.search = e.target.value;
            renderLocationList();
            createMarkers();
        }, 200);
    });
}

// Mobile bottom sheet handling
function initMobileSheet() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar || window.innerWidth > 768) return;
    
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    
    const handle = document.getElementById('sheetHandle');
    if (!handle) return;
    
    handle.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        isDragging = true;
        sidebar.style.transition = 'none';
    });
    
    handle.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentY = e.touches[0].clientY;
        const diff = startY - currentY;
        
        // Prevent default to stop page scroll
        e.preventDefault();
    });
    
    handle.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        sidebar.style.transition = '';
        
        const diff = startY - currentY;
        if (diff > 50) {
            // Swiped up - expand
            sidebar.classList.add('expanded');
            sidebar.classList.remove('collapsed');
        } else if (diff < -50) {
            // Swiped down - collapse
            sidebar.classList.remove('expanded');
            sidebar.classList.add('collapsed');
        }
    });
    
    // Click to toggle
    handle.addEventListener('click', () => {
        sidebar.classList.toggle('expanded');
        sidebar.classList.toggle('collapsed');
    });
}

// Initialize app
function init() {
    initTypeFilters();
    initEventListeners();
    updateNowBanner();
    renderLocationList();
    createMarkers();
    initMobileSheet();
    
    // Try to get user location on startup
    getUserLocation();
    
    // Fit map to all markers
    if (locations.length > 0) {
        const bounds = L.latLngBounds(locations.map(l => [l.lat, l.lng]));
        map.fitBounds(bounds, { padding: [30, 30] });
    }
}

// Make functions global for onclick handlers
window.selectLocation = selectLocation;
window.closePanel = closePanel;
window.filterByType = filterByType;
window.toggleNearMe = toggleNearMe;
window.fitMapToFiltered = fitMapToFiltered;

// Start app
init();
