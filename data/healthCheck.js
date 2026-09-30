// ─────────────────────────────────────────────────────────────
// Rentlio ONE Health Check – SAV SADRŽAJ NA JEDNOM MJESTU
// Tekstove, pitanja, preporuke i linkove mijenjajte ovdje;
// komponente ne treba dirati.
// ─────────────────────────────────────────────────────────────

export const DEMO_URL = 'https://rentl.io/dogovori-sastanak';
export const RENTLIO_URL = 'https://rentl.io';
export const CTA_LABEL = 'Dogovorite individualnu provjeru';

// Procjena trajanja: sekunde po pitanju (12 × 15 s = 3 min)
export const SECONDS_PER_QUESTION = 15;

export const INTRO = {
  eyebrow: 'Praktični vodič za iznajmljivače',
  titleStart: 'Koliko je vaše poslovanje',
  titleAccent: 'stvarno zdravo?',
  lede:
    'Provjerite gdje vam odlazi vrijeme, gdje postoji prostor za pogrešku i što možete pojednostaviti prije iduće sezone.',
  chips: ['Oko 3 minute', '12 pitanja', 'Rezultat odmah'],
  checks: [
    'Provjerite gdje vam odlazi vrijeme',
    'Prepoznajte ručne korake i rizike',
    'Odaberite svoj prvi mali korak',
  ],
  mapFoot: 'Za apartmane, vile i kuće za odmor',
  howtoTitle: 'Ovaj Health Check nije test.',
  howtoText:
    'Ne postoji savršen način vođenja smještaja. Postoji samo način koji vam ostavlja više ili manje vremena, kontrole i mira. Realno pogledajte svakodnevne procese i prepoznajte gdje se posao još uvijek oslanja na ručni unos, pamćenje i stalno provjeravanje.',
  howtoNoteStart: 'Odgovarajte prema tome kako proces ',
  howtoNoteStrong: 'stvarno izgleda tijekom najprometnijeg dijela sezone',
  howtoNoteEnd: ', a ne kako biste željeli da izgleda.',
};

export const OPTIONS = [
  { value: 2, label: 'DA', desc: 'Proces je povezan, pregledan ili automatiziran.' },
  { value: 1, label: 'DJELOMIČNO', desc: 'Proces postoji, ali još uključuje ručne korake ili više nepovezanih mjesta.' },
  { value: 0, label: 'NE', desc: 'Proces ovisi o ručnom unosu, podsjetniku, provjeravanju ili pamćenju.' },
];

export const AREAS = [
  {
    id: 'rezervacije',
    name: 'Rezervacije i raspoloživost',
    short: 'Rezervacije',
    tipTitle: 'Zašto je ovo važno',
    tip: 'Kada se kalendari vode odvojeno, svaki novi unos stvara još nekoliko ručnih koraka. Problem nije samo vrijeme, dovoljan je jedan previd da termin ostane otvoren na drugom kanalu.',
    help: {
      headline: 'Jedan kalendar za sve kanale i kraj brizi oko dvostrukih rezervacija',
      text: 'Nova rezervacija s Booking.coma ili Airbnba odmah zatvara termin na svim ostalim kanalima, a otkazivanje ga jednako brzo ponovno otvara. Ništa ne usklađujete ručno i ništa ne morate pamtiti.',
      gains: [
        'Raspoloživost i cijene ažuriraju se na svim kanalima u stvarnom vremenu',
        'Cijene mijenjate na jednom mjestu, i s mobitela',
        'Sve rezervacije vidite u jednom kalendaru',
      ],
      features: ['Channel Manager', 'Zajednički kalendar', 'Mobilna aplikacija'],
      featNote: 'Dvosmjerna veza s Booking.comom, Airbnbom, Expediom i drugim kanalima.',
    },
  },
  {
    id: 'organizacija',
    name: 'Pregled i organizacija',
    short: 'Organizacija',
    tipTitle: 'Dobar znak',
    tip: 'U svakom trenutku znate tko dolazi, tko odlazi, što je plaćeno i što još treba napraviti, bez traženja informacija na više mjesta.',
    help: {
      headline: 'Cijeli dan na ekranu mobitela',
      text: 'Tko danas dolazi, tko odlazi, što je plaćeno i što još treba napraviti. Sve je na jednom mjestu, bez listanja poruka, bilježnica i tablica.',
      gains: [
        'Dolasci, odlasci i boravci na početnom ekranu aplikacije',
        'Svi podaci o gostu i rezervaciji na jednom mjestu',
        'Plaćeno ili neplaćeno, napomene i zadaci vidljivi na prvi pogled',
      ],
      features: ['Mobilna aplikacija', 'Kalendar i lista rezervacija', 'Housekeeping'],
      featNote: 'Aplikacija za iOS i Android, ista kao na računalu.',
      proof: { who: 'Kaptol Rooms, Zagreb', what: 'Zamijenili su Excel i ručni eVisitor jednim sustavom.' },
    },
  },
  {
    id: 'komunikacija',
    name: 'Komunikacija s gostima',
    short: 'Komunikacija',
    tipTitle: 'Mali test',
    tip: 'Prisjetite se zadnjih pet rezervacija. Koliko ste puta ponovno napisali ili kopirali gotovo istu poruku? Ponavljajući sadržaj je dobar kandidat za predložak ili automatizaciju.',
    help: {
      headline: 'Poruke koje se šalju same, u pravom trenutku',
      text: 'Potvrdu, upute za dolazak, informacije o parkingu i preporuke napišete jednom. Rentlio ih šalje svakom gostu u pravoj fazi rezervacije, a poruke s više kanala stižu na jedno mjesto.',
      gains: [
        'Automatski e-mailovi prema datumu dolaska ili odlaska',
        'SMS i WhatsApp predlošci s imenom gosta i linkom za online check-in',
        'Poruke s Booking.coma, Airbnba i Expedije u jednom inboxu, uz automatski prijevod',
      ],
      features: ['E-mail predlošci', 'SMS i WhatsApp predlošci', 'Unified Inbox'],
      featNote: 'Varijable poput imena gosta i jedinice popunjavaju se same.',
    },
  },
  {
    id: 'administracija',
    name: 'Administracija i naplata',
    short: 'Administracija',
    tipTitle: 'Gdje se najčešće gubi vrijeme',
    tip: 'Isti podaci često već postoje u rezervaciji, ali ih iznajmljivač ponovno unosi u eVisitor, račun ili vlastitu evidenciju. Povezan proces smanjuje i posao i mogućnost pogreške.',
    help: {
      headline: 'Podatke gosta upišete jednom, a eVisitor i račun rješavaju se sami',
      text: 'Gost sam ispuni podatke prije dolaska, a vi ih jednim klikom prijavite u eVisitor. Račun izdajete izravno iz rezervacije, a naplata kartice može teći automatski.',
      gains: [
        'Online check-in i skeniranje dokumenata mobitelom',
        'Prijava i automatska odjava gostiju u eVisitoru',
        'Račun iz rezervacije u nekoliko klikova, s fiskalizacijom',
        'Automatska naplata prema otkaznim uvjetima',
      ],
      features: ['eVisitor integracija', 'Online check-in', 'Računi i fiskalizacija', 'Rentlio Pay'],
      featNote: 'Podaci iz rezervacije koriste se za prijavu, račun i naplatu.',
      proof: { who: 'Sukha Vacation House, Međimurje', what: 'Check-in je tri puta brži.' },
    },
  },
  {
    id: 'direktne',
    name: 'Direktne rezervacije',
    short: 'Direktne',
    tipTitle: 'Direktna rezervacija nije samo kontakt obrazac',
    tip: 'Gost treba vidjeti stvarnu dostupnost, cijenu i siguran način završetka rezervacije. Vama se pritom termin treba automatski evidentirati zajedno s ostalim rezervacijama.',
    help: {
      headline: 'Vaša web stranica koja stvarno prima rezervacije',
      text: 'Gost vidi stvarnu dostupnost i cijenu, rezervira i plati bez upita i dopisivanja. Rezervacija odmah ulazi u isti kalendar kao one s Booking.coma i Airbnba.',
      gains: [
        'Rezervacijska stranica povezana s kalendarom i svim kanalima',
        'Plaćanje karticom, Google Payom ili Apple Payom',
        'Link za rezervaciju na vašem webu, Instagramu ili Google profilu',
        'Manje provizija OTA kanalima za svaku direktnu rezervaciju',
      ],
      features: ['Rentlio Booking Engine', 'Rentlio Pay'],
      featNote: 'Radi i bez vlastite web stranice.',
    },
  },
  {
    id: 'vrijeme',
    name: 'Vrijeme i automatizacija',
    short: 'Vrijeme',
    tipTitle: 'Najvažnije pitanje',
    tip: 'Koji biste jedan ponavljajući zadatak prvi maknuli sa svog dnevnog popisa kada biste mogli? Na to pitanje vraćamo se na kraju.',
    help: {
      headline: 'Sezona u kojoj imate vremena za goste',
      text: 'Kad se kalendar, poruke, check-in i naplata odrađuju sami, poslovanje više ne ovisi o tome jeste li stalno na mobitelu. Možete otići na dan odmora, a sustav radi umjesto vas.',
      gains: [
        'Kanali, poruke, prijava gostiju i naplata povezani u jedan tok',
        'Sve važno na mobitelu, kad vam zatreba',
        'Pregled popunjenosti i prihoda bez vođenja tablica',
      ],
      features: ['PMS', 'Channel Manager', 'Booking Engine', 'Mobilna aplikacija'],
      featNote: 'Sve u jednom sustavu, bez spajanja više alata.',
      proof: { who: 'Balatura Luxury Rooms, Split', what: 'Uštedjeli su oko 10 sati tjedno.' },
    },
  },
];

// area = indeks u AREAS
export const QUESTIONS = [
  { area: 0, text: 'Imate li sve rezervacije i raspoloživost prikazane na jednom mjestu?' },
  { area: 0, text: 'Ažurira li se raspoloživost automatski na svim kanalima nakon nove rezervacije, promjene ili otkazivanja?' },
  { area: 1, text: 'Možete li brzo pronaći sve važne podatke o rezervaciji i gostu bez otvaranja više aplikacija, tablica ili poruka?' },
  { area: 1, text: 'Imate li na mobitelu jasan pregled današnjih dolazaka, odlazaka i boravaka?' },
  { area: 2, text: 'Jesu li najčešće poruke gostima unaprijed pripremljene ili automatizirane prema fazi rezervacije?' },
  { area: 2, text: 'Dobivaju li gosti pravovremeno potvrdu, upute za dolazak i ostale važne informacije bez toga da svaki put morate pamtiti što poslati?' },
  { area: 3, text: 'Možete li podatke o gostu prenijeti u eVisitor bez ponovnog ručnog prepisivanja?' },
  { area: 3, text: 'Možete li iz podataka rezervacije brzo izdati račun i provjeriti status naplate?' },
  { area: 4, text: 'Mogu li gosti samostalno provjeriti aktualnu dostupnost i rezervirati direktno, bez slanja upita?' },
  { area: 4, text: 'Ulaze li direktne rezervacije automatski u isti kalendar kao rezervacije s Booking.coma, Airbnba i drugih kanala?' },
  { area: 5, text: 'Možete li se jedan dan udaljiti od poslovanja bez stalnog provjeravanja kalendara, poruka i administracije?' },
  { area: 5, text: 'Ostaje li vam tijekom sezone dovoljno vremena za goste i kvalitetu usluge, umjesto da većinu vremena trošite na operativu?' },
];

export const REFLECTION = {
  tag: 'Bez bodova',
  title: 'Koji biste jedan ponavljajući zadatak prvi maknuli sa svog dnevnog popisa?',
  text: 'Taj odgovor često najbolje pokazuje gdje automatizacija može donijeti najveću razliku. Uzet ćemo ga u obzir u preporuci.',
  placeholder: 'Npr. svaki dan ručno prepisujem podatke gostiju u eVisitor…',
  ideas: [
    'Upisivanje gostiju u eVisitor',
    'Ručno zatvaranje termina na kanalima',
    'Slanje uputa za dolazak',
    'Izdavanje računa',
    'Odgovaranje na upite o dostupnosti',
  ],
};

export const BANDS = [
  {
    min: 0, max: 9, tone: 'low',
    label: 'Poslovanje se još uvelike oslanja na vas',
    text: 'Vi ste glavna poveznica između kalendara, gostiju i administracije. Najveći pomak donosi povezivanje osnovnih procesa i uklanjanje ponovnog unosa.',
  },
  {
    min: 10, max: 17, tone: 'mid',
    label: 'Dobra osnova, ali procesi nisu potpuno povezani',
    text: 'Dio poslovanja funkcionira dobro, ali određeni koraci još stvaraju dupli posao i prekide. Fokusirajte se na područje s najmanje bodova.',
  },
  {
    min: 18, max: 24, tone: 'high',
    label: 'Procesi su dobro postavljeni',
    text: 'Imate kvalitetnu osnovu. Sljedeći korak može biti dodatna automatizacija, bolji mobilni pregled ili povećanje udjela direktnih rezervacija.',
  },
];

export const RESULTS = {
  areasEyebrow: 'Rezultat po područjima',
  areasTitle: 'Gdje vam odlazi najviše vremena',
  helpEyebrow: 'Vaše preporuke',
  helpTitle: 'Kako vam Rentlio ONE može pomoći',
  helpLede: 'Preporuke su složene prema vašim odgovorima. Na vrhu je područje u kojem ćete razliku osjetiti najbrže.',
  allGoodTitle: 'Vaši procesi su već dobro posloženi',
  allGoodLede: 'Imate kvalitetnu osnovu u svim područjima. Sljedeći korak može biti dodatna automatizacija i veći udio direktnih rezervacija.',
  strongLabel: 'Ovo već radite dobro',
  levelLow: 'Ovo područje trenutno najviše ovisi o vama.',
  levelMid: 'Osnova postoji, ali još ima ručnih koraka.',
  proofSuffix: 'korisnik Rentlio ONE-a',
  featLabel: 'Omogućuje',
  ctaEyebrow: 'Individualna provjera prema vašem rezultatu',
  ctaTitle: 'Pokazat ćemo vam kako bi to izgledalo u vašem smještaju.',
  ctaTop: 'Krećemo od onoga što vam je najvažnije: ',
  ctaAllGood: 'Pokazat ćemo vam kako dodatno automatizirati poslovanje i povećati udio direktnih rezervacija.',
  ctaTask: 'I od zadatka koji ste spomenuli: ',
  restart: 'Ispunite provjeru ponovno',
  endline: 'Rezervacije, prodajni kanali i direktne rezervacije povezani u jednom sustavu.',
};
