-- CreateTable
CREATE TABLE "uloga" (
    "uloga_id" SERIAL NOT NULL,
    "naziv" VARCHAR(50) NOT NULL,
    "opis" VARCHAR(1000),

    CONSTRAINT "uloga_pkey" PRIMARY KEY ("uloga_id")
);

-- CreateTable
CREATE TABLE "korisnik" (
    "korisnik_id" SERIAL NOT NULL,
    "ime" VARCHAR(50),
    "prezime" VARCHAR(50),
    "korisnicko_ime" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "lozinka_hash" VARCHAR(255) NOT NULL,
    "uloga_id" INTEGER NOT NULL,

    CONSTRAINT "korisnik_pkey" PRIMARY KEY ("korisnik_id")
);

-- CreateTable
CREATE TABLE "profil" (
    "profil_id" SERIAL NOT NULL,
    "opis_profila" VARCHAR(1000),
    "razina" INTEGER NOT NULL DEFAULT 1,
    "xp_bodovi" INTEGER NOT NULL DEFAULT 0,
    "virtualni_novac" INTEGER NOT NULL DEFAULT 0,
    "korisnik_id" INTEGER NOT NULL,

    CONSTRAINT "profil_pkey" PRIMARY KEY ("profil_id")
);

-- CreateTable
CREATE TABLE "kategorija_lokacije" (
    "kategorija_id" SERIAL NOT NULL,
    "naziv" VARCHAR(100) NOT NULL,
    "opis" VARCHAR(1000),

    CONSTRAINT "kategorija_lokacije_pkey" PRIMARY KEY ("kategorija_id")
);

-- CreateTable
CREATE TABLE "lokacija" (
    "lokacija_id" SERIAL NOT NULL,
    "naziv" VARCHAR(200) NOT NULL,
    "opis" VARCHAR(1000),
    "adresa" VARCHAR(200) NOT NULL,
    "grad" VARCHAR(200) NOT NULL,
    "zupanija" VARCHAR(200) NOT NULL,
    "ulaznica_cijena" DECIMAL(10,2),
    "datum_dodavanja" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "geo_sirina" DECIMAL(9,6) NOT NULL,
    "geo_duzina" DECIMAL(9,6) NOT NULL,
    "nagrada_xp" INTEGER NOT NULL DEFAULT 0,
    "nagrada_valuta" INTEGER NOT NULL DEFAULT 0,
    "dodao_korisnik_id" INTEGER NOT NULL,
    "kategorija_id" INTEGER NOT NULL,

    CONSTRAINT "lokacija_pkey" PRIMARY KEY ("lokacija_id")
);

-- CreateTable
CREATE TABLE "SlikaLokacije" (
    "slika_id" SERIAL NOT NULL,
    "putanja_slike" VARCHAR(255) NOT NULL,
    "opis_slike" VARCHAR(255),
    "datum_dodavanja" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "glavna" BOOLEAN NOT NULL DEFAULT false,
    "lokacija_id" INTEGER NOT NULL,

    CONSTRAINT "SlikaLokacije_pkey" PRIMARY KEY ("slika_id")
);

-- CreateTable
CREATE TABLE "rijesena_lokacija" (
    "rijesena_lokacija_id" SERIAL NOT NULL,
    "datum_vrijeme_posjeta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "biljeska" VARCHAR(1000),
    "broj_osvojenih_xp" INTEGER NOT NULL DEFAULT 0,
    "broj_osvojene_valute" INTEGER NOT NULL DEFAULT 0,
    "korisnik_id" INTEGER NOT NULL,
    "lokacija_id" INTEGER NOT NULL,

    CONSTRAINT "rijesena_lokacija_pkey" PRIMARY KEY ("rijesena_lokacija_id")
);

-- CreateTable
CREATE TABLE "SlikaPosjeta" (
    "slika_id" SERIAL NOT NULL,
    "putanja_slike" VARCHAR(255) NOT NULL,
    "opis_slike" VARCHAR(255),
    "datum_dodavanja" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rijesena_lokacija_id" INTEGER NOT NULL,

    CONSTRAINT "SlikaPosjeta_pkey" PRIMARY KEY ("slika_id")
);

-- CreateTable
CREATE TABLE "tip_dekoracije" (
    "tip_dekoracije_id" SERIAL NOT NULL,
    "naziv" VARCHAR(100) NOT NULL,

    CONSTRAINT "tip_dekoracije_pkey" PRIMARY KEY ("tip_dekoracije_id")
);

-- CreateTable
CREATE TABLE "nacin_otkljucavanja" (
    "nacin_otkljucavanja_id" SERIAL NOT NULL,
    "naziv" VARCHAR(100) NOT NULL,

    CONSTRAINT "nacin_otkljucavanja_pkey" PRIMARY KEY ("nacin_otkljucavanja_id")
);

-- CreateTable
CREATE TABLE "dekoracija" (
    "dekoracija_id" SERIAL NOT NULL,
    "naziv" VARCHAR(100) NOT NULL,
    "opis" VARCHAR(255) NOT NULL,
    "cijena_valuta" INTEGER,
    "slika_dekoracija" VARCHAR(255) NOT NULL,
    "tip_dekoracije_id" INTEGER NOT NULL,
    "nacin_otkljucavanja_id" INTEGER NOT NULL,

    CONSTRAINT "dekoracija_pkey" PRIMARY KEY ("dekoracija_id")
);

-- CreateTable
CREATE TABLE "korisnik_dekoracija" (
    "korisnik_dekoracija_id" SERIAL NOT NULL,
    "datum_dobivanja" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aktivna" BOOLEAN NOT NULL DEFAULT false,
    "pozicija_prikaza" INTEGER,
    "dekoracija_id" INTEGER NOT NULL,
    "korisnik_id" INTEGER NOT NULL,

    CONSTRAINT "korisnik_dekoracija_pkey" PRIMARY KEY ("korisnik_dekoracija_id")
);

-- CreateTable
CREATE TABLE "postignuce" (
    "postignuce_id" SERIAL NOT NULL,
    "naziv" VARCHAR(100) NOT NULL,
    "opis" VARCHAR(255),
    "broj_potrebnih_lokacija" INTEGER NOT NULL,
    "nagrada_xp" INTEGER NOT NULL DEFAULT 0,
    "nagrada_valuta" INTEGER NOT NULL DEFAULT 0,
    "kategorija_id" INTEGER NOT NULL,
    "dekoracija_id" INTEGER,

    CONSTRAINT "postignuce_pkey" PRIMARY KEY ("postignuce_id")
);

-- CreateTable
CREATE TABLE "korisnik_postignuce" (
    "korisnik_postignuce_id" SERIAL NOT NULL,
    "datum_otkljucavanja" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postignuce_id" INTEGER NOT NULL,
    "korisnik_id" INTEGER NOT NULL,

    CONSTRAINT "korisnik_postignuce_pkey" PRIMARY KEY ("korisnik_postignuce_id")
);

-- CreateTable
CREATE TABLE "povratna_informacija" (
    "povratna_informacija_id" SERIAL NOT NULL,
    "tekst" VARCHAR(1000) NOT NULL,
    "ocjena" INTEGER NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "korisnik_id" INTEGER NOT NULL,
    "lokacija_id" INTEGER NOT NULL,

    CONSTRAINT "povratna_informacija_pkey" PRIMARY KEY ("povratna_informacija_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uloga_naziv_key" ON "uloga"("naziv");

-- CreateIndex
CREATE UNIQUE INDEX "korisnik_korisnicko_ime_key" ON "korisnik"("korisnicko_ime");

-- CreateIndex
CREATE UNIQUE INDEX "korisnik_email_key" ON "korisnik"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profil_korisnik_id_key" ON "profil"("korisnik_id");

-- CreateIndex
CREATE UNIQUE INDEX "kategorija_lokacije_naziv_key" ON "kategorija_lokacije"("naziv");

-- CreateIndex
CREATE UNIQUE INDEX "SlikaLokacije_putanja_slike_key" ON "SlikaLokacije"("putanja_slike");

-- CreateIndex
CREATE UNIQUE INDEX "rijesena_lokacija_korisnik_id_lokacija_id_key" ON "rijesena_lokacija"("korisnik_id", "lokacija_id");

-- CreateIndex
CREATE UNIQUE INDEX "SlikaPosjeta_putanja_slike_key" ON "SlikaPosjeta"("putanja_slike");

-- CreateIndex
CREATE UNIQUE INDEX "tip_dekoracije_naziv_key" ON "tip_dekoracije"("naziv");

-- CreateIndex
CREATE UNIQUE INDEX "nacin_otkljucavanja_naziv_key" ON "nacin_otkljucavanja"("naziv");

-- CreateIndex
CREATE UNIQUE INDEX "dekoracija_naziv_key" ON "dekoracija"("naziv");

-- CreateIndex
CREATE UNIQUE INDEX "korisnik_dekoracija_korisnik_id_dekoracija_id_key" ON "korisnik_dekoracija"("korisnik_id", "dekoracija_id");

-- CreateIndex
CREATE UNIQUE INDEX "postignuce_naziv_key" ON "postignuce"("naziv");

-- CreateIndex
CREATE UNIQUE INDEX "korisnik_postignuce_korisnik_id_postignuce_id_key" ON "korisnik_postignuce"("korisnik_id", "postignuce_id");

-- AddForeignKey
ALTER TABLE "korisnik" ADD CONSTRAINT "korisnik_uloga_id_fkey" FOREIGN KEY ("uloga_id") REFERENCES "uloga"("uloga_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profil" ADD CONSTRAINT "profil_korisnik_id_fkey" FOREIGN KEY ("korisnik_id") REFERENCES "korisnik"("korisnik_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lokacija" ADD CONSTRAINT "lokacija_dodao_korisnik_id_fkey" FOREIGN KEY ("dodao_korisnik_id") REFERENCES "korisnik"("korisnik_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lokacija" ADD CONSTRAINT "lokacija_kategorija_id_fkey" FOREIGN KEY ("kategorija_id") REFERENCES "kategorija_lokacije"("kategorija_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlikaLokacije" ADD CONSTRAINT "SlikaLokacije_lokacija_id_fkey" FOREIGN KEY ("lokacija_id") REFERENCES "lokacija"("lokacija_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rijesena_lokacija" ADD CONSTRAINT "rijesena_lokacija_korisnik_id_fkey" FOREIGN KEY ("korisnik_id") REFERENCES "korisnik"("korisnik_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rijesena_lokacija" ADD CONSTRAINT "rijesena_lokacija_lokacija_id_fkey" FOREIGN KEY ("lokacija_id") REFERENCES "lokacija"("lokacija_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlikaPosjeta" ADD CONSTRAINT "SlikaPosjeta_rijesena_lokacija_id_fkey" FOREIGN KEY ("rijesena_lokacija_id") REFERENCES "rijesena_lokacija"("rijesena_lokacija_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dekoracija" ADD CONSTRAINT "dekoracija_tip_dekoracije_id_fkey" FOREIGN KEY ("tip_dekoracije_id") REFERENCES "tip_dekoracije"("tip_dekoracije_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dekoracija" ADD CONSTRAINT "dekoracija_nacin_otkljucavanja_id_fkey" FOREIGN KEY ("nacin_otkljucavanja_id") REFERENCES "nacin_otkljucavanja"("nacin_otkljucavanja_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "korisnik_dekoracija" ADD CONSTRAINT "korisnik_dekoracija_dekoracija_id_fkey" FOREIGN KEY ("dekoracija_id") REFERENCES "dekoracija"("dekoracija_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "korisnik_dekoracija" ADD CONSTRAINT "korisnik_dekoracija_korisnik_id_fkey" FOREIGN KEY ("korisnik_id") REFERENCES "korisnik"("korisnik_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postignuce" ADD CONSTRAINT "postignuce_kategorija_id_fkey" FOREIGN KEY ("kategorija_id") REFERENCES "kategorija_lokacije"("kategorija_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postignuce" ADD CONSTRAINT "postignuce_dekoracija_id_fkey" FOREIGN KEY ("dekoracija_id") REFERENCES "dekoracija"("dekoracija_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "korisnik_postignuce" ADD CONSTRAINT "korisnik_postignuce_postignuce_id_fkey" FOREIGN KEY ("postignuce_id") REFERENCES "postignuce"("postignuce_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "korisnik_postignuce" ADD CONSTRAINT "korisnik_postignuce_korisnik_id_fkey" FOREIGN KEY ("korisnik_id") REFERENCES "korisnik"("korisnik_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "povratna_informacija" ADD CONSTRAINT "povratna_informacija_korisnik_id_fkey" FOREIGN KEY ("korisnik_id") REFERENCES "korisnik"("korisnik_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "povratna_informacija" ADD CONSTRAINT "povratna_informacija_lokacija_id_fkey" FOREIGN KEY ("lokacija_id") REFERENCES "lokacija"("lokacija_id") ON DELETE RESTRICT ON UPDATE CASCADE;
