# Klets - hosting and email setup for klets.mclworks.eu

Everything here is EU-based: INWX (Germany) for the domain, Hetzner (Germany) for the server, Scaleway (France) for sending email. Part A you can do now. Part B needs the first build of the app and I will give the exact commands then.

## Hetzner or Scaleway?

**Hetzner.** Cheaper and simpler for this. One small server in Falkenstein (Germany) runs the whole thing: the static app, the tiny API, the database file and the email job. Their smallest ARM server (CAX11) is about €4 a month plus about €0.50 for an IPv4 address; the smallest x86 server (CX23) is about €5.50. Scaleway's cheapest comparable server costs more, and their cheaper serverless products mean four separate services to configure (functions, jobs, object storage, database) which is harder to set up and to understand. Scaleway stays in the picture for one thing: transactional email, because Hetzner does not offer it.

Both companies may ask for identity verification on a new account. That is normal.

## Part A: do now (about 45 minutes)

### A1. Create the Hetzner server
1. Go to hetzner.com, choose Cloud, create an account. Complete any verification they ask for.
2. Create a project called `mclworks`.
3. Add server: Location **Falkenstein**; Image **Ubuntu 24.04**; Type **Shared vCPU, Arm64, CAX11** (or x86 CX23 if CAX11 is unavailable); Networking: tick both IPv4 and IPv6; SSH key: skip for now (you will get a root password by email); Name: `klets`.
4. Note the server's **IPv4** and **IPv6** addresses from the server page.
5. On the server page open **Firewall**, create a firewall with inbound rules for TCP 22, 80 and 443 only, apply it to the server.

Cost note: Hetzner bills by the hour and shows the monthly cap. Nothing else on the account should be created.

### A2. Point the subdomain at the server (INWX)
1. Log in at inwx.de, open **mclworks.eu**, go to **Nameserver / DNS records**.
2. Add record: Type **A**, Name `klets`, Value the IPv4 address, TTL 3600.
3. Add record: Type **AAAA**, Name `klets`, Value the IPv6 address, TTL 3600.
4. Save. Within an hour `klets.mclworks.eu` points at the server. Nothing will show yet because nothing is installed.

Do not change the nameservers themselves. INWX's own DNS is fine and free.

### A3. Set up email sending (Scaleway Transactional Email)
1. Go to scaleway.com, create an account (Paris region is fine). Set a budget alert of €5 so nothing surprises you.
2. In the console open **Transactional Email**, click **Add domain**, enter `mclworks.eu`.
3. Scaleway shows four DNS records to add at INWX: an **SPF** TXT record, a **DKIM** TXT record, an **MX** record for bounces and a **DMARC** TXT record. Add each one exactly as shown, on the exact name they give (some are on `mclworks.eu`, some on a subdomain such as `_dmarc`).
4. Back in Scaleway click **Verify domain**. This can take up to an hour.
5. Once verified, go to **IAM**, create an API key with access to Transactional Email only. You get an access key and a secret key. **Do not paste these into chat or into the repository.** In Part B you will type them into a file on the server yourself.

The emails will come from `klets@mclworks.eu`. That address does not need a mailbox; replies can go to your normal address, which we set in the app.

If you would rather see sent emails in a dashboard, Brevo (France) is the alternative, but its free plan puts a Brevo logo in every email, which looks wrong for a daily reminder. Scaleway sends clean emails at €0 for our volume (300 a month free).

### A4. Send me
- The server's IPv4 address (not secret).
- Confirmation that the DNS records are in and the Scaleway domain shows as verified.
- The email address each of you wants the reminders at (can be given later in the app).

## Part B: when stage 1 is built

I will give you a single command to paste into the Hetzner web console (the "Console" button on the server page). It installs Caddy (which fetches the TLS certificate for klets.mclworks.eu on its own), Node, and the app, and sets up:

- a service that serves the app and the API,
- a timer that runs every fifteen minutes and sends any reminder emails that are due,
- a timer that pulls the latest code from the repository every five minutes, so a push from me becomes a deployment without any US build service in the middle,
- a nightly backup of the database file to a second folder on the same server, later to a Hetzner Storage Box.

Then you will create the file `/srv/klets/.env` on the server and type the Scaleway keys into it. That is the only step where a secret is involved and it never leaves your server.

## Running costs at trial scale

| Item | Monthly |
|---|---|
| Hetzner CAX11 with IPv4 | about €4.50 |
| Scaleway Transactional Email, about 60 emails a month | €0 |
| INWX domain | about €0.85 (€10 a year, already paid) |
| Total | about €5.50 |

## Where this is not EU

- The code is pulled from GitHub (US). The server only reads it. A Codeberg (Germany) mirror can replace that later.
- TLS certificates come from Let's Encrypt (US non-profit) by default in Caddy. Caddy can be switched to ZeroSSL (Austria); I will do that in Part B if you want.
- Your own and your husband's mailboxes are wherever they are.
