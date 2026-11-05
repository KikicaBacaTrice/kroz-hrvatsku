# Kroz Hrvatsku

Web aplikacija za istraživanje prirodnih, kulturnih i turističkih lokacija u Hrvatskoj, izrađena kao praktični dio završnog rada **„Razvoj web korisničkog sučelja prema načelima održivosti koda”**.

| Podatak | Vrijednost |
| --- | --- |
| Autor | Nikola Kihas |
| Ustanova | Sveučilište u Zagrebu, Fakultet organizacije i informatike, Varaždin |
| Studij | Informacijski i poslovni sustavi |
| Mentor | prof. dr. sc. Dragutin Kermek |
| Godina | 2026. |

## O projektu

Aplikacija povezuje pregled turističkih lokacija s elementima igrifikacije. Korisnik istražuje Hrvatsku, bilježi posjete i uspomene te ostvaruje napredak kroz iskustvene bodove, razine, postignuća i virtualnu valutu kojom može kupovati dekoracije profila.

Naglasak završnog rada je na organizaciji koda koja olakšava razumijevanje, održavanje i proširivanje aplikacije. Projekt primjenjuje modularnu strukturu, razdvajanje odgovornosti, ponovnu uporabu komponenti i responzivno oblikovanje sučelja.

## Prikaz aplikacije

### Početna stranica i popis lokacija

Pregled početne stranice, odabir županije na interaktivnoj karti i istraživanje popisa lokacija.

![Početna stranica, odabir županije i popis lokacija](dokumentacija/gifovi/pocetna-lista_lokacija.gif)

### Detalji lokacije

Pregled detalja lokacije, osnovnih informacija i galerije fotografija.

![Pregled detalja lokacije](dokumentacija/gifovi/detalji-lokacije.gif)

### Registracija i prijava

Pristup korisničkom računu putem sučelja za registraciju i prijavu.

![Registracija i prijava korisnika](dokumentacija/gifovi/Autentifikacija.gif)

### Povratne informacije

Komentari i ocjene kojima korisnici dijele svoja iskustva o lokacijama.

![Komentiranje i ocjenjivanje lokacija](dokumentacija/gifovi/povratne-informacije.gif)

### Profil i dekoracije

Pregled korisničkog profila i personalizacija pomoću dekoracija.

![Korisnički profil i dekoracije](dokumentacija/gifovi/profil-dekoracije.gif)

## Funkcionalnosti

- Pregled lokacija i filtriranje prema kriterijima, uključujući kategoriju i županiju.
- Interaktivna karta Hrvatske za odabir županije.
- Detalji lokacije s opisom, informacijama, galerijom fotografija i kartografskim prikazom.
- Registracija i prijava korisnika te zaštita pristupa pomoću JWT-a i korisničkih uloga.
- Bilježenje posjeta lokacijama uz bilješke i fotografije.
- Komentiranje i ocjenjivanje lokacija.
- Prikupljanje XP bodova, virtualne valute i postignuća.
- Uređivanje profila i personalizacija dekoracijama, poput pozadina, avatara i bedževa.
- Trgovina dekoracijama koje se kupuju virtualnom valutom.
- Administratorsko upravljanje lokacijama i korisnicima.

## Tehnologije

| Dio sustava | Tehnologije |
| --- | --- |
| Korisničko sučelje | Angular 19, TypeScript, RxJS, HTML, SCSS |
| Organizacija stilova | ITCSS, BEM i OOCSS načela |
| Poslužiteljski dio | Node.js, NestJS 11, TypeScript |
| Baza podataka | PostgreSQL i Prisma ORM 6 |
| Autentikacija | JWT, Passport i bcryptjs |
| Kartografski prikaz | Google Maps |

## Arhitektura i organizacija koda

Korisničko sučelje organizirano je po funkcionalnostima. Stranice povezuju prezentacijske komponente sa servisima za upravljanje stanjem, dok HTTP servisi izdvajaju komunikaciju s poslužiteljem. Zajedničke komponente omogućuju ponovnu uporabu elemenata sučelja. Globalni SCSS stilovi organizirani su po slojevima prema ITCSS pristupu.

Poslužiteljski dio podijeljen je na NestJS module prema područjima aplikacije. Kontroleri obrađuju HTTP zahtjeve, servisi provode poslovnu logiku, DTO objekti definiraju i validiraju ulazne podatke, a Prisma omogućuje pristup bazi podataka.

```text
kroz-hrvatsku/
├── frontend/
│   ├── src/app/
│   │   ├── jezgra/          # Autentikacija, konfiguracija, HTTP i raspored
│   │   ├── dijeljeno/       # Zajedničke komponente sučelja
│   │   └── funkcionalnosti/ # Stranice, UI, modeli, stanje i podatkovni servisi
│   ├── src/stilovi/         # Globalni SCSS slojevi
│   └── proxy.conf.json     # Prosljeđivanje API zahtjeva u razvoju
├── backend/
│   ├── src/                # NestJS moduli, kontroleri, servisi i DTO objekti
│   ├── prisma/             # Shema baze i migracije
│   ├── baza/               # SQL izvoz i sigurnosna kopija baze
│   └── prijenos/           # Fotografije lokacija, posjeta, profila i dekoracija
└── dokumentacija/          # Završni rad, opis ideje i ERA model
```

## Lokalno pokretanje

### Preduvjeti

- Node.js 22.13 ili noviji iz grane 22.x i npm. Poslužitelj koristi ugrađenu funkciju `loadEnvFile` za učitavanje `.env` datoteke.
- PostgreSQL 16, prema verziji korištenoj za priloženi izvoz baze.
- PostgreSQL alati `createdb` i `psql`, dostupni kroz `PATH`, ili pgAdmin za pripremu baze.

Naredbe u nastavku polaze iz korijenske mape projekta, osim gdje je drukčije navedeno.

### 1. Instalacija ovisnosti

Frontend i backend imaju zasebne ovisnosti i skripte:

```sh
cd backend
npm ci
cd ../frontend
npm ci
cd ..
```

### 2. Priprema baze podataka

Za pokretanje aplikacije s pripremljenim podacima stvorite **novu, praznu bazu** i uvezite priloženi SQL izvoz:

```sh
createdb -h localhost -p 5432 -U postgres kroz_hrvatsku
psql -h localhost -p 5432 -U postgres -d kroz_hrvatsku -v ON_ERROR_STOP=1 -f backend/baza/kroz-hrvatsku-baza.sql
```

Isti postupak moguće je obaviti kroz pgAdmin: stvorite bazu `kroz_hrvatsku`, otvorite njezin Query Tool i izvršite SQL datoteku. Izvoz sadrži shemu, podatke i evidenciju Prisma migracija te koristi vlasnika `postgres`, pa navedeni primjer pretpostavlja tu PostgreSQL ulogu.

Uvoz uključuje i podatke potrebne za rad aplikacije, poput korisničkih uloga, kategorija, lokacija i dekoracija. Sama primjena migracija na praznu bazu ne popunjava te podatke. Za priloženi SQL izvoz nije potrebno ponovno stvarati shemu migracijama.

U mapi `backend/baza/` nalazi se i datoteka `kroz_hrvatsku_baza.backup` kao dodatna sigurnosna kopija. Za gore navedene korake koristi se SQL datoteka.

### 3. Konfiguracija poslužitelja

U mapi `backend/` stvorite datoteku `.env`:

```dotenv
DATABASE_URL="postgresql://postgres:VASA_LOZINKA@localhost:5432/kroz_hrvatsku?schema=public"
JWT_SECRET="OVDJE_POSTAVITE_VLASTITU_DUGU_NASUMICNU_TAJNU"
JWT_EXPIRES_IN=86400
PORT=3000
```

Prilagodite korisničko ime, lozinku i naziv baze vlastitoj instalaciji. `JWT_EXPIRES_IN` predstavlja trajanje tokena u sekundama. Datoteka `.env` isključena je iz Gita.

Generirajte Prisma klijent:

```sh
cd backend
npx prisma generate
```

### 4. Pokretanje poslužitelja

U terminalu, iz mape `backend/`:

```sh
npm run start:dev
```

API je dostupan na `http://localhost:3000`. Prenesene datoteke poslužuju se na putanji `/prijenos`.

### 5. Pokretanje korisničkog sučelja

U drugom terminalu, iz mape `frontend/`:

```sh
npm start
```

Otvorite **http://localhost:4200**. Za isprobavanje korisničkih funkcionalnosti registrirajte vlastiti račun. Novi računi dobivaju osnovnu korisničku ulogu; administratorski pristup zahtijeva ulogu administratora.

Angularov razvojni poslužitelj zahtjeve prema `/api` prosljeđuje na `http://localhost:3000` i uklanja prefiks `/api`. Postavke se nalaze u `frontend/proxy.conf.json`, a osnovna API putanja u `frontend/src/app/jezgra/konfiguracija/api.config.ts`.

Ako promijenite API port, prilagodite i proxy konfiguraciju. Poslužiteljska CORS konfiguracija u `backend/src/main.ts` dopušta izvorište `http://localhost:4200`.

### Google Maps

Ključ za kartografski prikaz konfiguriran je u datoteci `frontend/src/app/jezgra/konfiguracija/google.config.ts`. Za vlastitu instalaciju postavite svoj Google Maps API ključ s omogućenim Maps JavaScript API-jem i dopuštenim izvorištem za lokalnu aplikaciju.

## Dodatne naredbe

Naredbe se izvršavaju unutar odgovarajuće mape:

| Mapa | Naredba | Namjena |
| --- | --- | --- |
| `frontend/` | `npm run build` | Izgradnja korisničkog sučelja |
| `frontend/` | `npm test` | Pokretanje testova pomoću Karma/Jasmine |
| `backend/` | `npm run build` | Izgradnja poslužiteljskog dijela |
| `backend/` | `npm test` | Pokretanje jediničnih testova pomoću Jesta |
| `backend/` | `npm run test:e2e` | Pokretanje end-to-end testova |
| `backend/` | `npx prisma studio` | Pregled podataka kroz Prisma Studio |

Za posluživanje izgrađenog frontenda potrebno je posebno konfigurirati web poslužitelj i prosljeđivanje API zahtjeva; razvojni proxy koristi se pri pokretanju naredbom `npm start`.

## Dokumentacija završnog rada

- [Završni rad - Nikola Kihas](dokumentacija/Zavr%C5%A1ni%20rad%20-%20Nikola%20Kihas.pdf): teorijska podloga, načela održivosti koda, arhitektura, organizacija stilova i analiza praktičnog rješenja.
- [Opis ideje za praktični dio - Kroz Hrvatsku](dokumentacija/Opis%20ideje%20za%20prakti%C4%8Dni%20dio%20-%20Kroz%20Hrvatsku.pdf): početni opis ideje i planiranih funkcionalnosti.
- [ERA model baze podataka](dokumentacija/era-model.png): prikaz entiteta i njihovih veza.
