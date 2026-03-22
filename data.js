// Nature Moments Benelux - Location Data
// All locations are real places researched from various sources

const eventTypes = {
    // Spring
    bluebells: { emoji: "🔔", name: "Bluebells", season: "spring" },
    cherry_blossoms: { emoji: "🌸", name: "Cherry Blossoms", season: "spring" },
    wild_daffodils: { emoji: "🌼", name: "Wild Daffodils", season: "spring" },
    frog_migration: { emoji: "🐸", name: "Frog/Toad Migration", season: "spring" },
    
    // Summer
    sunflowers: { emoji: "🌻", name: "Sunflower Fields", season: "summer" },
    butterflies: { emoji: "🦋", name: "Butterfly Hotspots", season: "summer" },
    lavender: { emoji: "💜", name: "Lavender Fields", season: "summer" },
    fireflies: { emoji: "✨", name: "Fireflies", season: "summer" },
    heather: { emoji: "💮", name: "Purple Heather", season: "summer" },
    
    // Autumn
    autumn_colors: { emoji: "🍂", name: "Autumn Colors", season: "autumn" },
    mushrooms: { emoji: "🍄", name: "Mushroom Foraging", season: "autumn" },
    deer_rutting: { emoji: "🦌", name: "Deer Rutting", season: "autumn" },
    bird_migration: { emoji: "🦅", name: "Bird Migration", season: "autumn" },
    
    // Winter
    frozen_lakes: { emoji: "⛸️", name: "Frozen Lakes/Skating", season: "winter" },
    misty_forests: { emoji: "🌫️", name: "Misty Forests", season: "winter" },
    wintering_birds: { emoji: "🦢", name: "Wintering Birds/Geese", season: "winter" },
    
    // Year-round - Domains & Castles
    domain: { emoji: "🏛️", name: "Domain/Estate", season: "spring" },
    castle: { emoji: "🏰", name: "Castle", season: "spring" }
};

const locations = [
    // ==================== SPRING - BLUEBELLS ====================
    {
        name: "Hallerbos (Blue Forest)",
        region: "flanders",
        province: "Flemish Brabant",
        lat: 50.7167,
        lng: 4.2667,
        type: "bluebells",
        description: "Belgium's most famous bluebell forest. A 552-hectare woodland that transforms into a stunning purple-blue carpet each spring. Expect crowds during peak bloom - arrive early morning or on weekdays.",
        bestTime: { start: "04-15", end: "05-05" },
        website: "https://www.hallerbos.be/en/",
        famous: true
    },
    {
        name: "Brakelbos",
        region: "flanders",
        province: "East Flanders",
        lat: 50.8045,
        lng: 3.7651,
        type: "bluebells",
        description: "A beautiful forest near Brakel featuring extensive bluebell displays. Less crowded than Hallerbos with excellent walking trails through the Flemish Ardennes.",
        bestTime: { start: "04-15", end: "05-05" },
        website: "https://www.visitvlaamseardennen.be/het-brakelbos"
    },
    {
        name: "Muziekbos",
        region: "flanders",
        province: "East Flanders",
        lat: 50.7453,
        lng: 3.6114,
        type: "bluebells",
        description: "The 'Music Forest' near Ronse, featuring the Werewolf hiking trail which showcases the best bluebell spots. Rolling hills and magical forest atmosphere.",
        bestTime: { start: "04-15", end: "05-05" },
        website: "https://www.visitvlaamseardennen.be/wandelen-muziekbos"
    },
    {
        name: "Sonian Forest (Forêt de Soignes)",
        region: "brussels",
        province: "Brussels-Capital",
        lat: 50.7667,
        lng: 4.4167,
        type: "bluebells",
        description: "A UNESCO World Heritage beech forest on Brussels' doorstep with patches of bluebells in spring. The ancient trees create a cathedral-like atmosphere.",
        bestTime: { start: "04-15", end: "05-05" },
        website: "https://www.soignes-zonien.net/"
    },
    {
        name: "Haagse Bos",
        region: "netherlands",
        province: "South Holland",
        lat: 52.0833,
        lng: 4.3333,
        type: "bluebells",
        description: "One of the oldest forests in the Netherlands, near The Hague, with wild hyacinth displays. A peaceful urban escape with historical significance.",
        bestTime: { start: "04-15", end: "05-05" },
        website: "https://www.denhaag.nl/"
    },
    {
        name: "Amelisweerd",
        region: "netherlands",
        province: "Utrecht",
        lat: 52.0667,
        lng: 5.15,
        type: "bluebells",
        description: "A historic estate forest near Utrecht known for its spring bluebell carpets. Features beautiful walking paths along the Kromme Rijn river.",
        bestTime: { start: "04-15", end: "05-05" },
        website: "https://www.amelisweerd.nl/"
    },
    
    // ==================== SPRING - CHERRY BLOSSOMS ====================
    {
        name: "Kersenbloesempark (Cherry Blossom Park)",
        region: "netherlands",
        province: "North Holland",
        lat: 52.2972,
        lng: 4.8475,
        type: "cherry_blossoms",
        description: "The famous cherry blossom park in Amsterdamse Bos, crowned the best place to see cherry blossoms in Europe. 400 cherry trees planted in a circle, gifted by Japan.",
        bestTime: { start: "03-25", end: "04-15" },
        website: "https://www.visitamstelveen.nl/en/discover-amstelveen/nature/cherry-blossom",
        famous: true
    },
    {
        name: "Westerpark Amsterdam",
        region: "netherlands",
        province: "North Holland",
        lat: 52.3867,
        lng: 4.8697,
        type: "cherry_blossoms",
        description: "A vibrant urban park in Amsterdam with beautiful cherry blossom trees. Popular spot for picnics and photos during bloom season.",
        bestTime: { start: "03-25", end: "04-15" },
        website: "https://www.amsterdam.nl/westerpark/"
    },
    {
        name: "Van Gogh Museum Area",
        region: "netherlands",
        province: "North Holland",
        lat: 52.3584,
        lng: 4.8811,
        type: "cherry_blossoms",
        description: "Small cluster of cherry blossom trees near the Van Gogh Museum, perfect for photos with the museum as backdrop. Peak bloom in late March.",
        bestTime: { start: "03-20", end: "04-10" },
        website: "https://www.vangoghmuseum.nl/"
    },
    {
        name: "Hortus Botanicus Leiden",
        region: "netherlands",
        province: "South Holland",
        lat: 52.1544,
        lng: 4.4839,
        type: "cherry_blossoms",
        description: "Historic botanical garden hosting a collection of cherry blossom trees. Stroll through tranquil pathways surrounded by diverse flora.",
        bestTime: { start: "03-25", end: "04-15" },
        website: "https://www.hortusleiden.nl/"
    },
    {
        name: "Japanese Garden Hasselt",
        region: "flanders",
        province: "Limburg",
        lat: 50.9314,
        lng: 5.3378,
        type: "cherry_blossoms",
        description: "The largest Japanese garden in Europe features authentic cherry blossoms, winding paths, and a serene atmosphere. A piece of Japan in Belgium.",
        bestTime: { start: "03-25", end: "04-20" },
        website: "https://www.visithasselt.be/en/japanese-garden"
    },
    
    // ==================== SPRING - WILD DAFFODILS ====================
    {
        name: "Perlenbach-Fuhrtsbachtal",
        region: "wallonia",
        province: "Liège (near German border)",
        lat: 50.5167,
        lng: 6.2833,
        type: "wild_daffodils",
        description: "Millions of wild yellow daffodils carpet the meadows in this nature reserve. The famous 15km 'Narcissus Route' hiking trail passes through the most spectacular areas.",
        bestTime: { start: "03-20", end: "05-01" },
        website: "https://www.eifel.info/en/discover-nature/daffodils",
        famous: true
    },
    {
        name: "Oleftal Nature Reserve",
        region: "wallonia",
        province: "Liège",
        lat: 50.4833,
        lng: 6.35,
        type: "wild_daffodils",
        description: "Another spectacular daffodil valley in the Eifel region. Less crowded than Perlenbach, with equally stunning yellow meadows in spring.",
        bestTime: { start: "03-25", end: "04-30" },
        website: "https://www.eifel.info/"
    },
    {
        name: "Mullerthal - Little Switzerland",
        region: "luxembourg",
        province: "Luxembourg",
        lat: 49.7917,
        lng: 6.3667,
        type: "wild_daffodils",
        description: "Luxembourg's 'Little Switzerland' features wild daffodils among dramatic rock formations and forest trails. Combine with the famous Mullerthal Trail.",
        bestTime: { start: "03-15", end: "04-15" },
        website: "https://www.mullerthal-trail.lu/en"
    },
    
    // ==================== SPRING - FROG MIGRATION ====================
    {
        name: "Drielandenpunt (Three-Country Point)",
        region: "netherlands",
        province: "Limburg",
        lat: 50.7544,
        lng: 5.9953,
        type: "frog_migration",
        description: "Major toad migration crossing point where Belgium, Netherlands, and Germany meet. Volunteers help amphibians cross busy roads during breeding season.",
        bestTime: { start: "02-15", end: "03-31" },
        website: "https://www.padden.nu/"
    },
    {
        name: "Garderen-Uddel Forests",
        region: "netherlands",
        province: "Gelderland",
        lat: 52.2167,
        lng: 5.7667,
        type: "frog_migration",
        description: "Forest area on the Veluwe where glowworms and amphibians can be spotted. Part of larger toad patrol network in the Netherlands.",
        bestTime: { start: "02-15", end: "03-31" },
        website: "https://www.natuurmonumenten.nl/"
    },
    
    // ==================== SUMMER - LAVENDER ====================
    {
        name: "Limburg Lavendel",
        region: "flanders",
        province: "Limburg",
        lat: 50.9125,
        lng: 5.3461,
        type: "lavender",
        description: "Belgium's own Provence! Lavender fields near Abbey Herkenrode in Hasselt. Includes Mediterranean garden, rose maze, and shop with lavender products.",
        bestTime: { start: "06-15", end: "07-31" },
        website: "https://www.limburglavendel.be/",
        famous: true
    },
    
    // ==================== SUMMER - HEATHER ====================
    {
        name: "De Hoge Veluwe National Park",
        region: "netherlands",
        province: "Gelderland",
        lat: 52.0833,
        lng: 5.8333,
        type: "heather",
        description: "The Netherlands' largest national park transforms into a purple sea when heather blooms. Rent free white bikes to explore, visit the Kröller-Müller Museum.",
        bestTime: { start: "08-15", end: "09-15" },
        website: "https://www.hogeveluwe.nl/en",
        famous: true
    },
    {
        name: "Posbank - Veluwezoom",
        region: "netherlands",
        province: "Gelderland",
        lat: 52.0333,
        lng: 6.0167,
        type: "heather",
        description: "The highest point in Veluwezoom National Park (90m) offers panoramic views over purple heather hills. The oldest national park in the Netherlands.",
        bestTime: { start: "08-15", end: "09-15" },
        website: "https://www.veluwezoom.nl/"
    },
    {
        name: "Kalmthoutse Heide",
        region: "flanders",
        province: "Antwerp",
        lat: 51.3833,
        lng: 4.4667,
        type: "heather",
        description: "One of Belgium's largest heathland areas, shared with the Netherlands. Purple heather mixed with sand dunes and pine forests.",
        bestTime: { start: "08-15", end: "09-15" },
        website: "https://www.natuurenbos.be/"
    },
    {
        name: "Strabrechtse Heide",
        region: "netherlands",
        province: "North Brabant",
        lat: 51.4,
        lng: 5.6333,
        type: "heather",
        description: "One of the largest connected heather areas in Western Europe. Features fens, sand drifts, and spectacular purple heather in late summer.",
        bestTime: { start: "08-15", end: "09-15" },
        website: "https://www.staatsbosbeheer.nl/"
    },
    
    // ==================== SUMMER - BUTTERFLIES ====================
    {
        name: "Vlinders aan de Vliet",
        region: "netherlands",
        province: "South Holland",
        lat: 52.0886,
        lng: 4.3928,
        type: "butterflies",
        description: "Tropical indoor butterfly jungle near The Hague. 1600m² greenhouse filled with free-flying exotic butterflies, birds, and reptiles. Open Feb-Nov.",
        bestTime: { start: "06-01", end: "07-31" },
        website: "https://www.vlindersaandevliet.nl/english"
    },
    {
        name: "Pantropica Vlinderica",
        region: "netherlands",
        province: "North Brabant",
        lat: 51.5053,
        lng: 5.4831,
        type: "butterflies",
        description: "Colorful butterflies flutter from flower to flower in this tropical paradise. Special mountain trails lead to viewing platforms.",
        bestTime: { start: "06-01", end: "07-31" },
        website: "https://pantropica.nl/en/discover-the-park/our-continents/vlinderica/"
    },
    {
        name: "Veluwe Heathlands",
        region: "netherlands",
        province: "Gelderland",
        lat: 52.15,
        lng: 5.9,
        type: "butterflies",
        description: "Dry heathlands and coastal dunes are prime habitat for native butterflies including the comma butterfly. Best spotted on sunny summer days.",
        bestTime: { start: "06-01", end: "07-31" },
        website: "https://www.vlinderstichting.nl/english/"
    },
    
    // ==================== SUMMER - FIREFLIES ====================
    {
        name: "South Limburg Forests",
        region: "netherlands",
        province: "Limburg",
        lat: 50.8,
        lng: 5.9,
        type: "fireflies",
        description: "The three-country point area is one of few places in the Netherlands to see fireflies. Visit late June to early July after dark in forested areas.",
        bestTime: { start: "06-15", end: "07-10" },
        website: "https://www.vislimburg.nl/"
    },
    {
        name: "Averbode Forest",
        region: "flanders",
        province: "Flemish Brabant",
        lat: 51.0333,
        lng: 5.0667,
        type: "fireflies",
        description: "Historic reports of firefly sightings in the forests around Averbode Abbey. Visit on warm, humid June evenings for best chances.",
        bestTime: { start: "06-10", end: "07-05" },
        website: "https://www.abdijparkaverbode.be/"
    },
    
    // ==================== SUMMER - SUNFLOWERS ====================
    {
        name: "Meise Botanic Garden",
        region: "flanders",
        province: "Flemish Brabant",
        lat: 50.9278,
        lng: 4.3222,
        type: "sunflowers",
        description: "One of the largest botanic gardens in the world, featuring impressive sunflower displays in August. Also includes historic castle and greenhouses.",
        bestTime: { start: "07-15", end: "08-31" },
        website: "https://www.plantentuinmeise.be/en"
    },
    {
        name: "Flevoland Sunflower Strips",
        region: "netherlands",
        province: "Flevoland",
        lat: 52.5,
        lng: 5.45,
        type: "sunflowers",
        description: "Agricultural sunflower strips planted around corn fields create ribbons of gold across the flat Flevoland landscape. Scattered throughout the region.",
        bestTime: { start: "07-15", end: "08-31" },
        website: "https://www.visitflevoland.nl/"
    },
    
    // ==================== AUTUMN - AUTUMN COLORS ====================
    {
        name: "Sonian Forest Autumn",
        region: "brussels",
        province: "Brussels-Capital",
        lat: 50.7667,
        lng: 4.4167,
        type: "autumn_colors",
        description: "The UNESCO-listed beech forest becomes a golden cathedral in autumn. Ancient trees create spectacular light shows on sunny October days.",
        bestTime: { start: "10-15", end: "11-15" },
        website: "https://www.soignes-zonien.net/",
        famous: true
    },
    {
        name: "Twente Coulissen Landscape",
        region: "netherlands",
        province: "Overijssel",
        lat: 52.3,
        lng: 6.7,
        type: "autumn_colors",
        description: "Unique 'coulissen' landscape with rows of trees surrounding farmlands creates stage-like scenery. Spectacular autumn colors in rural eastern Netherlands.",
        bestTime: { start: "10-15", end: "11-15" },
        website: "https://www.visittwente.com/"
    },
    {
        name: "Mullerthal Trail Autumn",
        region: "luxembourg",
        province: "Luxembourg",
        lat: 49.7917,
        lng: 6.3667,
        type: "autumn_colors",
        description: "Luxembourg's Little Switzerland hiking trails become magical in autumn. Moss-covered rock formations surrounded by golden beech and oak leaves.",
        bestTime: { start: "10-15", end: "11-15" },
        website: "https://www.mullerthal-trail.lu/en"
    },
    {
        name: "Ardennes Forests",
        region: "wallonia",
        province: "Luxembourg (BE)",
        lat: 50.05,
        lng: 5.5,
        type: "autumn_colors",
        description: "The rolling forested hills of the Belgian Ardennes offer spectacular autumn foliage. Combine with castle visits and local cuisine.",
        bestTime: { start: "10-15", end: "11-15" },
        website: "https://www.ardennes-etape.be/"
    },
    {
        name: "Het Loo Palace Gardens",
        region: "netherlands",
        province: "Gelderland",
        lat: 52.2342,
        lng: 5.9456,
        type: "autumn_colors",
        description: "Royal palace gardens near Apeldoorn featuring formal baroque gardens and surrounding woodland. Stunning autumn colors in the extensive park.",
        bestTime: { start: "10-10", end: "11-10" },
        website: "https://www.paleishetloo.nl/en"
    },
    
    // ==================== AUTUMN - MUSHROOMS ====================
    {
        name: "Hollandsche Rading",
        region: "netherlands",
        province: "Utrecht",
        lat: 52.1667,
        lng: 5.2,
        type: "mushrooms",
        description: "Popular mushroom foraging area with guided walks available. Learn to identify edible species safely. Remember: max 250g for personal use allowed.",
        bestTime: { start: "09-15", end: "11-15" },
        website: "https://www.mediamatic.net/en/page/8386/fungal-foraging"
    },
    {
        name: "Ardennes Mushroom Forests",
        region: "wallonia",
        province: "Namur",
        lat: 50.1,
        lng: 5.2,
        type: "mushrooms",
        description: "The Ardennes forests are Belgium's prime mushroom territory. Fall brings chanterelles, porcini, and many other species. Join guided forays for safety.",
        bestTime: { start: "09-15", end: "11-15" },
        website: "https://en.ardennes-etape.be/experience/news/how-discover-mushrooms-ardennes"
    },
    {
        name: "Forest to Plate - Belgium",
        region: "flanders",
        province: "Various",
        lat: 51.0,
        lng: 4.5,
        type: "mushrooms",
        description: "Professional foraging guides lead full-day mushroom hunting expeditions to secret locations. Includes organic lunch and expert identification help.",
        bestTime: { start: "09-15", end: "11-15" },
        website: "https://www.foresttoplate.com/activities/mushroom-walk-belgium"
    },
    
    // ==================== AUTUMN - DEER RUTTING ====================
    {
        name: "De Hoge Veluwe - Deer Rut",
        region: "netherlands",
        province: "Gelderland",
        lat: 52.0833,
        lng: 5.8333,
        type: "deer_rutting",
        description: "Experience the spectacular red deer rut with organized excursions led by nature guides. The belling (roaring) stags echo through the forest.",
        bestTime: { start: "09-15", end: "10-15" },
        website: "https://www.hogeveluwe.nl/en/discover-the-park/nature-and-landscape/red-deer",
        famous: true
    },
    {
        name: "Oostvaardersplassen",
        region: "netherlands",
        province: "Flevoland",
        lat: 52.4333,
        lng: 5.35,
        type: "deer_rutting",
        description: "Wild red deer, Konik horses, and Heck cattle roam freely in this rewilded marshland. The autumn rut offers dramatic wildlife watching.",
        bestTime: { start: "09-15", end: "10-15" },
        website: "https://www.nationaalparknieuwland.nl/en/"
    },
    {
        name: "Ede Forests",
        region: "netherlands",
        province: "Gelderland",
        lat: 52.05,
        lng: 5.65,
        type: "deer_rutting",
        description: "Multiple nature reserves around Ede offer excellent deer watching. The bellowing of stags and occasional fierce fights make for unforgettable experiences.",
        bestTime: { start: "09-15", end: "10-15" },
        website: "https://www.visit-ede.com/tips-for-visiting-ede/belling-stags-in-ede"
    },
    {
        name: "Zeeland Deer Spotting",
        region: "netherlands",
        province: "Zeeland",
        lat: 51.7,
        lng: 3.7,
        type: "deer_rutting",
        description: "Large herds of roe deer and fallow deer roam near Slot Haamstede. Combine deer watching with coastal walks and Highland cattle spotting.",
        bestTime: { start: "09-15", end: "10-31" },
        website: "https://www.zeeland.com/en/visit/blogs/deer-spotting-in-zeeland"
    },
    
    // ==================== AUTUMN - BIRD MIGRATION ====================
    {
        name: "Schiermonnikoog",
        region: "netherlands",
        province: "Friesland",
        lat: 53.4833,
        lng: 6.2,
        type: "bird_migration",
        description: "Wadden Sea island with dedicated 'trekvogelroute' (migration bird route). Autumn brings thrush families and countless waders stopping to refuel.",
        bestTime: { start: "10-01", end: "11-15" },
        website: "https://www.np-schiermonnikoog.nl/en/doen/beleef-de-vogeltrek/"
    },
    {
        name: "IJmuiden Piers",
        region: "netherlands",
        province: "North Holland",
        lat: 52.4667,
        lng: 4.5667,
        type: "bird_migration",
        description: "Spectacular seabird watching from the long piers. Autumn brings migrating seabirds, gannets, and skuas. Exciting and dynamic birding location.",
        bestTime: { start: "10-01", end: "11-15" },
        website: "https://limosahollandbirding.com/best-bird-spots-in-the-netherlands/"
    },
    {
        name: "De Vulkaan",
        region: "netherlands",
        province: "Various",
        lat: 52.5,
        lng: 4.7,
        type: "bird_migration",
        description: "Famous migration counting point where incredible numbers of songbirds pass. Over 100,000 chaffinches or starlings can be counted in a single day.",
        bestTime: { start: "10-01", end: "11-15" },
        website: "https://www.birdingplaces.eu/en/birdingplaces/netherlands/de-vulkaan"
    },
    {
        name: "Het Zwin Nature Reserve",
        region: "flanders",
        province: "West Flanders",
        lat: 51.3667,
        lng: 3.3667,
        type: "bird_migration",
        description: "Belgium's most iconic birding location with 500+ hectares of saltmarsh. More than half of all Belgian bird species recorded here. Stork breeding colony.",
        bestTime: { start: "10-01", end: "11-30" },
        website: "https://www.zwin.be/en/zwin-nature-park",
        famous: true
    },
    
    // ==================== WINTER - FROZEN LAKES/SKATING ====================
    {
        name: "Friesland Canals - Elfstedentocht Route",
        region: "netherlands",
        province: "Friesland",
        lat: 53.2,
        lng: 5.8,
        type: "frozen_lakes",
        description: "The legendary 200km Elfstedentocht skating race route through 11 Frisian towns. When canals freeze solid (rare now), the whole nation celebrates.",
        bestTime: { start: "12-15", end: "02-15" },
        website: "https://www.elfstedentocht.nl/",
        famous: true
    },
    {
        name: "Kinderdijk Skating",
        region: "netherlands",
        province: "South Holland",
        lat: 51.8833,
        lng: 4.6333,
        type: "frozen_lakes",
        description: "Skate past UNESCO-listed windmills when the polders freeze. Magical winter scenes that inspired Dutch Masters paintings for centuries.",
        bestTime: { start: "12-15", end: "02-15" },
        website: "https://www.kinderdijk.com/"
    },
    {
        name: "Giethoorn",
        region: "netherlands",
        province: "Overijssel",
        lat: 52.7333,
        lng: 6.0667,
        type: "frozen_lakes",
        description: "The 'Venice of the North' transforms in winter. When canals freeze, boats give way to skating between thatched-roof houses.",
        bestTime: { start: "12-15", end: "02-15" },
        website: "https://www.giethoorn.nl/"
    },
    
    // ==================== WINTER - MISTY FORESTS ====================
    {
        name: "Sonian Forest Winter Mornings",
        region: "brussels",
        province: "Brussels-Capital",
        lat: 50.7667,
        lng: 4.4167,
        type: "misty_forests",
        description: "The beech cathedral is at its most mystical on foggy winter mornings. Low light filtering through bare branches creates ethereal atmosphere.",
        bestTime: { start: "11-15", end: "01-31" },
        website: "https://www.soignes-zonien.net/"
    },
    {
        name: "Hoge Kempen National Park",
        region: "flanders",
        province: "Limburg",
        lat: 50.95,
        lng: 5.55,
        type: "misty_forests",
        description: "Belgium's only national park offers winter solitude. Pine forests and heathlands draped in mist, with chances of roe deer sightings.",
        bestTime: { start: "11-15", end: "01-31" },
        website: "https://www.nationaalparkhogekempen.be/"
    },
    {
        name: "De Veluwe Winter",
        region: "netherlands",
        province: "Gelderland",
        lat: 52.15,
        lng: 5.85,
        type: "misty_forests",
        description: "Early morning visits to the Veluwe in winter reveal misty heathlands and frost-covered forests. Wildlife is more visible with bare trees.",
        bestTime: { start: "11-15", end: "01-31" },
        website: "https://www.hogeveluwe.nl/en"
    },
    
    // ==================== WINTER - WINTERING BIRDS/GEESE ====================
    {
        name: "Lauwersmeer National Park",
        region: "netherlands",
        province: "Groningen/Friesland",
        lat: 53.35,
        lng: 6.2,
        type: "wintering_birds",
        description: "Fantastic winter feeding ground for geese and other birds breeding further north. Thousands of barnacle geese, white-fronted geese, and more.",
        bestTime: { start: "12-01", end: "02-28" },
        website: "https://www.np-lauwersmeer.nl/",
        famous: true
    },
    {
        name: "Oostvaardersplassen Winter Birds",
        region: "netherlands",
        province: "Flevoland",
        lat: 52.4333,
        lng: 5.35,
        type: "wintering_birds",
        description: "The marshlands attract massive flocks of geese in winter. Watch from hides as thousands of birds feed and rest during migration.",
        bestTime: { start: "12-01", end: "02-28" },
        website: "https://www.nationaalparknieuwland.nl/en/"
    },
    {
        name: "Het Zwin Winter",
        region: "flanders",
        province: "West Flanders",
        lat: 51.3667,
        lng: 3.3667,
        type: "wintering_birds",
        description: "The saltmarsh reserve hosts wintering waders, geese, and ducks. Winter is excellent for spotting rare visitors. Fewer tourists, more birds.",
        bestTime: { start: "12-01", end: "02-28" },
        website: "https://www.zwin.be/en/zwin-nature-park"
    },
    {
        name: "Blankaart Nature Reserve",
        region: "flanders",
        province: "West Flanders",
        lat: 51.0333,
        lng: 2.8833,
        type: "wintering_birds",
        description: "Important wetland for wintering waterfowl including rare species. The flooded meadows and ponds attract thousands of geese and ducks.",
        bestTime: { start: "12-01", end: "02-28" },
        website: "https://www.natuurpuntblankaartvijvergebied.be/"
    },
    {
        name: "Biesbosch National Park",
        region: "netherlands",
        province: "North Brabant",
        lat: 51.75,
        lng: 4.8,
        type: "wintering_birds",
        description: "Europe's largest freshwater tidal area. Winter brings dramatic gatherings of cormorants, great white egrets, and various goose species.",
        bestTime: { start: "12-01", end: "02-28" },
        website: "https://www.np-debiesbosch.nl/en/"
    },
    
    // Additional locations for completeness
    {
        name: "Koppenbergbos",
        region: "flanders",
        province: "East Flanders",
        lat: 50.8464,
        lng: 3.6203,
        type: "bluebells",
        description: "Famous among cyclists for the Koppenberg climb, this forest also offers beautiful bluebell carpets in spring. Combine cycling with flower spotting.",
        bestTime: { start: "04-15", end: "05-05" },
        website: "https://www.visitvlaamseardennen.be/het-koppenbergbos"
    },
    {
        name: "Warnsborn Estate",
        region: "netherlands",
        province: "Gelderland",
        lat: 52.0167,
        lng: 5.8833,
        type: "bluebells",
        description: "Located on the edge of the Veluwe near Arnhem, featuring wild hyacinths and beautiful walking trails through mixed woodland.",
        bestTime: { start: "04-15", end: "05-05" },
        website: "https://www.visitarnhem.com/"
    },
    {
        name: "Clingendael Estate",
        region: "netherlands",
        province: "South Holland",
        lat: 52.0942,
        lng: 4.3456,
        type: "cherry_blossoms",
        description: "Historic estate near The Hague with famous Japanese garden and cherry blossoms. The Japanese garden opens for limited weeks during bloom.",
        bestTime: { start: "04-01", end: "04-30" },
        website: "https://www.clingendael.org/"
    },
    {
        name: "Keukenhof Gardens",
        region: "netherlands",
        province: "South Holland",
        lat: 52.2697,
        lng: 4.5461,
        type: "cherry_blossoms",
        description: "World-famous flower garden featuring millions of tulips plus cherry blossom lanes. Open only 8 weeks per year during spring bloom.",
        bestTime: { start: "03-20", end: "05-15" },
        website: "https://keukenhof.nl/en/",
        famous: true
    },
    {
        name: "Texel Island",
        region: "netherlands",
        province: "North Holland",
        lat: 53.05,
        lng: 4.8,
        type: "bird_migration",
        description: "The largest Wadden Sea island is a birding paradise. Autumn migration brings spectacular concentrations of waders, geese, and rarities.",
        bestTime: { start: "09-15", end: "11-15" },
        website: "https://www.texel.net/en/",
        famous: true
    },
    {
        name: "Kampina Nature Reserve",
        region: "netherlands",
        province: "North Brabant",
        lat: 51.55,
        lng: 5.3,
        type: "heather",
        description: "Large heathland area near Boxtel with extensive purple heather in late summer. Also features fens and beautiful forest trails.",
        bestTime: { start: "08-15", end: "09-15" },
        website: "https://www.natuurmonumenten.nl/natuurgebieden/kampina"
    },
    {
        name: "Hautes Fagnes (High Fens)",
        region: "wallonia",
        province: "Liège",
        lat: 50.5,
        lng: 6.1,
        type: "misty_forests",
        description: "Belgium's highest plateau with unique peat bogs and moorland. Mystical atmosphere on foggy days. Best accessed via wooden boardwalks.",
        bestTime: { start: "11-01", end: "02-28" },
        website: "https://www.haute-fagnes.be/",
        famous: true
    },
    {
        name: "Mechelse Heide",
        region: "flanders",
        province: "Limburg",
        lat: 51.0,
        lng: 5.65,
        type: "heather",
        description: "Part of Hoge Kempen National Park, this gateway features extensive heathland turning purple in August. Well-marked trails for all levels.",
        bestTime: { start: "08-15", end: "09-15" },
        website: "https://www.nationaalparkhogekempen.be/"
    },
    {
        name: "Nationaal Park Drentsche Aa",
        region: "netherlands",
        province: "Drenthe",
        lat: 53.05,
        lng: 6.6,
        type: "autumn_colors",
        description: "One of the most complete brook valley systems in Western Europe. Ancient oak woods create spectacular autumn color shows.",
        bestTime: { start: "10-15", end: "11-15" },
        website: "https://www.nationaalparkdrentscheaa.nl/"
    }
];

// ==================== YEAR-ROUND - DOMAINS/ESTATES ====================
    {
        name: "Domein Bokrijk",
        region: "flanders",
        province: "Limburg",
        lat: 50.9544,
        lng: 5.4156,
        type: "domain",
        description: "550-hectare estate with open-air museum, arboretum, and nature playground. Historic Flemish buildings, beautiful gardens, and forest walks. Perfect year-round family destination.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.bokrijk.be/en",
        famous: true
    },
    {
        name: "Domein Hofstade",
        region: "flanders",
        province: "Flemish Brabant",
        lat: 50.9833,
        lng: 4.5167,
        type: "domain",
        description: "Provincial recreation domain with beach, swimming lake, and extensive parkland. Popular for walking, cycling, and water sports near Brussels.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.vlaamsbrabant.be/hofstade"
    },
    {
        name: "Domein Rivierenhof",
        region: "flanders",
        province: "Antwerp",
        lat: 51.2167,
        lng: 4.4667,
        type: "domain",
        description: "Antwerp's largest park with castle, rose garden, open-air theatre, and beautiful ponds. Popular for jogging, picnics, and summer concerts.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.rivierenhof.be/"
    },
    {
        name: "Domein Vrijbroekpark",
        region: "flanders",
        province: "Antwerp",
        lat: 51.0333,
        lng: 4.4833,
        type: "domain",
        description: "Green oasis in Mechelen with ponds, meadows, and nature education center. Home to Highland cattle and Konik horses. Great for family walks.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.natuurpunt.be/natuurgebied/vrijbroekpark"
    },
    {
        name: "Domein Huizingen",
        region: "flanders",
        province: "Flemish Brabant",
        lat: 50.7500,
        lng: 4.2667,
        type: "domain",
        description: "Provincial domain with castle, rose garden, animal park, and swimming pool. Rolling parkland with beautiful autumn colors. Near Brussels.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.vlaamsbrabant.be/huizingen"
    },
    {
        name: "Domein Kessel-Lo",
        region: "flanders",
        province: "Flemish Brabant",
        lat: 50.8833,
        lng: 4.7333,
        type: "domain",
        description: "Urban park with sports facilities, playground, and woodland walks. Popular with Leuven residents for running and relaxation.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.vlaamsbrabant.be/kessel-lo"
    },
    {
        name: "Domein Puyenbroeck",
        region: "flanders",
        province: "East Flanders",
        lat: 51.1167,
        lng: 3.8667,
        type: "domain",
        description: "Large recreation domain near Ghent with subtropical swimming pool, mini-golf, climbing forest, and extensive walking trails through varied landscapes.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.puyenbroeck.be/"
    },
    {
        name: "Domein Kiewit",
        region: "flanders",
        province: "Limburg",
        lat: 50.9667,
        lng: 5.3833,
        type: "domain",
        description: "Nature domain and gateway to Hoge Kempen National Park. Visitor center, walking trails through heath and forest. Starting point for longer hikes.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.nationaalparkhogekempen.be/nl/toegangspoorten/kiewit"
    },
    {
        name: "Park Middelheim",
        region: "flanders",
        province: "Antwerp",
        lat: 51.1833,
        lng: 4.4000,
        type: "domain",
        description: "Open-air sculpture museum in beautiful parkland. Over 200 sculptures by masters like Rodin, Moore, and Ai Weiwei. Free entry, stunning year-round.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.middelheimmuseum.be/",
        famous: true
    },
    {
        name: "Parc de la Boverie",
        region: "wallonia",
        province: "Liège",
        lat: 50.6333,
        lng: 5.5833,
        type: "domain",
        description: "Beautiful island park in Liège with La Boverie museum, rose garden, and riverside walks. Popular for jogging and weekend strolls.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.laboverie.com/"
    },
    {
        name: "Domein Solvay - Château de La Hulpe",
        region: "wallonia",
        province: "Walloon Brabant",
        lat: 50.7333,
        lng: 4.4667,
        type: "domain",
        description: "227-hectare estate with romantic English-style park, ponds, and Fondation Folon museum. Stunning in all seasons, especially autumn. Near Brussels.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.chateaudelahulpe.be/",
        famous: true
    },
    
    // ==================== YEAR-ROUND - CASTLES ====================
    {
        name: "Kasteel van Gaasbeek",
        region: "flanders",
        province: "Flemish Brabant",
        lat: 50.7833,
        lng: 4.1833,
        type: "castle",
        description: "Medieval castle transformed into romantic residence with art collection and beautiful gardens. Museum inside, park free to visit. One of Belgium's most beautiful castles.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.kasteelvangaasbeek.be/",
        famous: true
    },
    {
        name: "Château de Bouillon",
        region: "wallonia",
        province: "Luxembourg (BE)",
        lat: 49.7933,
        lng: 5.0672,
        type: "castle",
        description: "Spectacular fortress perched above the Semois river. Godfrey of Bouillon's castle, now hosts falconry shows. Dramatic setting in the Ardennes.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.bouilloninitiative.be/en/castle-of-bouillon",
        famous: true
    },
    {
        name: "Kasteel van Beersel",
        region: "flanders",
        province: "Flemish Brabant",
        lat: 50.7667,
        lng: 4.3000,
        type: "castle",
        description: "Remarkably preserved medieval moated castle with three round towers. One of the last intact feudal fortresses in Belgium. Near Brussels.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.kasteelvanbeersel.be/"
    },
    {
        name: "Château de Modave",
        region: "wallonia",
        province: "Liège",
        lat: 50.4500,
        lng: 5.3000,
        type: "castle",
        description: "17th-century castle perched on a cliff above the Hoyoux valley. Magnificent stucco ceilings and period furniture. Stunning setting.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.modave-castle.be/"
    },
    {
        name: "Gravensteen (Castle of the Counts)",
        region: "flanders",
        province: "East Flanders",
        lat: 51.0575,
        lng: 3.7208,
        type: "castle",
        description: "Imposing medieval fortress in the heart of Ghent. 12th-century stronghold with torture museum and panoramic views over the city.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://historischehuizen.stad.gent/en/castle-counts",
        famous: true
    },
    {
        name: "Château de Beloeil",
        region: "wallonia",
        province: "Hainaut",
        lat: 50.5500,
        lng: 3.7333,
        type: "castle",
        description: "The 'Belgian Versailles' - magnificent palace with French gardens, lake, and rich art collections. Home of the Princes de Ligne since 14th century.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.chateaudebeloeil.com/",
        famous: true
    },
    {
        name: "Château de Vêves",
        region: "wallonia",
        province: "Namur",
        lat: 50.2667,
        lng: 4.9667,
        type: "castle",
        description: "Fairytale castle with five pepper-pot towers rising from the forest. Still inhabited, with furnished rooms and beautiful views. Picture-perfect.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.chateau-de-veves.be/"
    },
    {
        name: "Château de Freÿr",
        region: "wallonia",
        province: "Namur",
        lat: 50.2333,
        lng: 4.9000,
        type: "castle",
        description: "Renaissance palace along the Meuse with spectacular terraced gardens and 300-year-old orange trees. Nicknamed 'the Versailles of the Meuse'.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.freyr.be/"
    },
    {
        name: "Kasteel van Laarne",
        region: "flanders",
        province: "East Flanders",
        lat: 51.0333,
        lng: 3.8500,
        type: "castle",
        description: "Moated pentagon-shaped fortress with impressive silverware collection. Well-preserved medieval castle with French-style gardens.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.kasteelvanlaarne.be/"
    },
    {
        name: "Château de Lavaux-Sainte-Anne",
        region: "wallonia",
        province: "Namur",
        lat: 50.1167,
        lng: 5.0833,
        type: "castle",
        description: "Medieval fortress with round towers reflected in its moat. Nature museum inside, plus wetland nature reserve with birdwatching hides.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.chateau-lavaux.com/"
    },
    {
        name: "Kasteel Ooidonk",
        region: "flanders",
        province: "East Flanders",
        lat: 51.0167,
        lng: 3.6167,
        type: "castle",
        description: "Stunning Flemish Renaissance castle with distinctive Spanish-Flemish architecture. Beautiful setting along the Leie river. Furnished interiors.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.ooidonk.be/"
    },
    {
        name: "Château d'Annevoie",
        region: "wallonia",
        province: "Namur",
        lat: 50.3500,
        lng: 4.8500,
        type: "castle",
        description: "Famous for its magnificent water gardens - unique in Belgium. Fountains powered purely by gravity since 1758. Romantic 18th-century park.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.annevoie.be/",
        famous: true
    },
    {
        name: "Muiderslot",
        region: "netherlands",
        province: "North Holland",
        lat: 52.3333,
        lng: 5.0667,
        type: "castle",
        description: "Iconic medieval castle on the Vecht river. Well-preserved 13th-century fortress with knights' hall, falconry, and beautiful herb gardens.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.muiderslot.nl/en",
        famous: true
    },
    {
        name: "Kasteel de Haar",
        region: "netherlands",
        province: "Utrecht",
        lat: 52.1208,
        lng: 4.9875,
        type: "castle",
        description: "The largest castle in the Netherlands, neo-Gothic fantasy with towers, turrets, and moats. Magnificent gardens and deer park. Near Utrecht.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.kasteeldehaar.nl/en",
        famous: true
    },
    {
        name: "Château de Vianden",
        region: "luxembourg",
        province: "Luxembourg",
        lat: 49.9350,
        lng: 6.2033,
        type: "castle",
        description: "One of the largest fortified castles west of the Rhine. Romanesque and Gothic architecture perched above the Our river. Luxembourg's most visited monument.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.castle-vianden.lu/",
        famous: true
    },
    {
        name: "Château de Beaufort",
        region: "luxembourg",
        province: "Luxembourg",
        lat: 49.8367,
        lng: 6.2883,
        type: "castle",
        description: "Two castles in one: medieval ruins and Renaissance château side by side. Known for its blackcurrant liqueur. Beautiful Mullerthal setting.",
        bestTime: { start: "01-01", end: "12-31" },
        website: "https://www.beaufortcastles.com/"
    },

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { locations, eventTypes };
}
