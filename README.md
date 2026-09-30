# Rentlio ONE Health Check

Interaktivni upitnik za iznajmljivače: 12 pitanja u 6 područja, automatsko bodovanje (0–24) i personalizirane preporuke kako Rentlio ONE pomaže u svakom području.

Napravljeno na **istom stacku kao rentl.io**:

| | rentl.io (provjereno na produkciji) | ovaj projekt |
|---|---|---|
| Framework | Next.js 12.3.7, Pages Router | Next.js 12.3.7, Pages Router |
| React | 18.2.0 | 18.2.0 |
| Stilovi | styled-components 5.3.11 | styled-components 5.3.11 (SWC `compiler.styledComponents`) |
| Font | Manrope (Google Fonts) | Manrope |
| Hosting | Netlify | Netlify (`netlify.toml`) |
| Analitika | GTM `GTM-5Q7HJWB` | `window.dataLayer` eventi (vidi dolje) |

Nema vanjskih biblioteka ni skripti. Sve je unutar postojećeg CSP-a na rentl.io (inline stilovi + `fonts.googleapis.com`).

---

## Pokretanje

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Node 16.14+ (preporuka 18, vidi `.nvmrc`).

---

## Struktura

```
data/healthCheck.js          ← SAV SADRŽAJ: pitanja, tekstovi, preporuke, linkovi, CTA
lib/scoring.js               ← bodovanje (čiste funkcije)
lib/analytics.js             ← GTM dataLayer eventi
lib/storage.js               ← pamćenje napretka u localStorage
components/HealthCheck/
  index.js                   ← glavna komponenta (koraci, animacija odgovora, tipkovnica)
  TopBar.js                  ← gornja traka: pitanje X/12, preostalo vrijeme, timeline 6 područja
  Intro.js                   ← uvodni ekran
  Question.js                ← jedno pitanje + "puf" animacija
  Reflection.js              ← završni korak (bez bodova)
  Results.js                 ← rezultat + preporuke + CTA + veliki logo
  RentlioOneLogo.js          ← logo iz brand booka (SVG)
  styles.js                  ← svi styled-components
styles/theme.js              ← tokeni (boje/fontovi s rentl.io)
pages/index.js               ← samostalna stranica
```

**Tekst se mijenja samo u `data/healthCheck.js`.** Komponente ne treba dirati.

---

## Ugradnja u rentl.io (preporučeno)

1. Kopirati u repo weba:
   - `components/HealthCheck/` → npr. `components/HealthCheck/`
   - `data/healthCheck.js` → npr. `data/healthCheck.js`
   - `lib/scoring.js`, `lib/analytics.js`, `lib/storage.js` → npr. `lib/healthCheck/`
   - Prilagoditi relativne importove (`../../data/...`, `../../lib/...`) ako se putanje razlikuju.

2. Tema: komponente čitaju `theme.colors.*`, `theme.fonts.*`, `theme.radius.*`, `theme.shadow`, `theme.ease.*`, `theme.bp.*`.
   - Ako web već ima `ThemeProvider`, dodati ove ključeve u postojeću temu (vrijednosti su u `styles/theme.js`), **ili**
   - omotati komponentu vlastitim providerom:
     ```jsx
     import { ThemeProvider } from 'styled-components';
     import { theme as hcTheme } from '../styles/healthCheckTheme';
     <ThemeProvider theme={(outer) => ({ ...outer, ...hcTheme })}>…</ThemeProvider>
     ```

3. Nova stranica, npr. `pages/health-check.js`:
   ```jsx
   import Head from 'next/head';
   import Layout from '../components/Layout';           // postojeći layout weba (header + footer)
   import HealthCheck from '../components/HealthCheck';

   export default function HealthCheckPage() {
     return (
       <Layout>
         <Head>
           <title>Rentlio ONE Health Check | Koliko je vaše poslovanje stvarno zdravo?</title>
           <meta name="description" content="Besplatna provjera za iznajmljivače u 3 minute: 12 pitanja, 6 područja i preporuke kako uštedjeti vrijeme uz Rentlio ONE." />
         </Head>
         <HealthCheck standalone={false} />
       </Layout>
     );
   }
   ```
   - `standalone={false}` sakriva Rentlio ONE logo u gornjoj traci upitnika (web već ima svoj header).
   - Ako je header weba sticky, postaviti visinu headera da se traka upitnika zalijepi ispod njega:
     ```css
     :root { --hc-sticky-top: 80px; }  /* visina headera weba */
     ```
   - `_document.js` i Google Fonts link nisu potrebni jer web već učitava Manrope.

4. Jezici: stranica je samo na hrvatskom. Ako web koristi i18n rute (`hr`, `en`, `si`), stranicu ograničiti na `hr` (npr. `getStaticProps` → `notFound` za ostale jezike) ili je ne linkati u en/si navigaciji.

### Samostalni deploy (alternativa)
Projekt radi i sam za sebe (npr. `health-check.rentl.io` na Netlifyju). `netlify.toml` koristi `@netlify/plugin-nextjs`.

---

## GTM eventi

Svi idu u `window.dataLayer`. U GTM-u napraviti **Custom Event** triggere:

| Event | Kada | Parametri |
|---|---|---|
| `health_check_start` | klik na "Započni provjeru" / "Kreni ispočetka" | – |
| `health_check_answer` | svaki odgovor | `hc_question` (1–12), `hc_area` (id područja), `hc_value` (2/1/0) |
| `health_check_complete` | prikaz rezultata | `hc_score` (0–24), `hc_band` (`low`/`mid`/`high`), `hc_weakest_area`, `hc_area_scores` (objekt), `hc_task_filled` (bool) |
| `health_check_cta_click` | klik na "Dogovorite individualnu provjeru" | `hc_score` |
| `health_check_restart` | ponovno ispunjavanje | – |

Id-evi područja: `rezervacije`, `organizacija`, `komunikacija`, `administracija`, `direktne`, `vrijeme`.

Tekst koji korisnik upiše u završnom koraku **ne šalje se nikamo**. Prikazuje se samo njemu u rezultatu.

---

## Ponašanje

- Jedno pitanje po ekranu. Nakon odgovora: odabrani odgovor "pukne" uz čestice, ostali izblijede, pitanje ode gore, a sljedeće uđe odozdo (ukupno ~1 s). Trajanja su u `components/HealthCheck/index.js` (`PICK_MS`, `EXIT_MS`).
- Tipkovnica: `1` / `2` / `3` = DA / DJELOMIČNO / NE, `←` natrag, `→` dalje (ako je odgovoreno).
- Timeline u gornjoj traci: klik na područje vraća na njegova pitanja (samo već dostupna).
- Napredak se pamti u `localStorage` (`rentlio-health-check-v1`). Ako pohrana nije dostupna, upitnik radi normalno.
- `prefers-reduced-motion`: animacije se isključuju.
- Rezultat: ukupno + po područjima, pa kartice preporuka poredane od najslabijeg područja (samo područja ispod 4/4). Područja s 4/4 prikazuju se kao "Ovo već radite dobro". Ako je sve 24/24, prikazuje se preporuka za direktne rezervacije.
- Bodovni razredi: 0–9, 10–17, 18–24 (`BANDS` u `data/healthCheck.js`).

---

## Prije objave provjeriti

- Primjere korisnika (Kaptol Rooms, Sukha Vacation House, Balatura) u `data/healthCheck.js` usporediti s pričama korisnika na webu.
- "Automatski prijevod" u Unified Inboxu: potvrditi da se smije navesti za Rentlio ONE.
- CTA link: `DEMO_URL` u `data/healthCheck.js` (trenutno `https://rentl.io/dogovori-sastanak`).
