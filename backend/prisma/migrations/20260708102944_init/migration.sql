/*
  Warnings:

  - You are about to drop the `SlikaLokacije` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SlikaPosjeta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SlikaLokacije" DROP CONSTRAINT "SlikaLokacije_lokacija_id_fkey";

-- DropForeignKey
ALTER TABLE "SlikaPosjeta" DROP CONSTRAINT "SlikaPosjeta_rijesena_lokacija_id_fkey";

-- DropTable
DROP TABLE "SlikaLokacije";

-- DropTable
DROP TABLE "SlikaPosjeta";

-- CreateTable
CREATE TABLE "slika_lokacije" (
    "slika_id" SERIAL NOT NULL,
    "putanja_slike" VARCHAR(255) NOT NULL,
    "opis_slike" VARCHAR(255),
    "datum_dodavanja" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "glavna" BOOLEAN NOT NULL DEFAULT false,
    "lokacija_id" INTEGER NOT NULL,

    CONSTRAINT "slika_lokacije_pkey" PRIMARY KEY ("slika_id")
);

-- CreateTable
CREATE TABLE "slika_posjeta" (
    "slika_id" SERIAL NOT NULL,
    "putanja_slike" VARCHAR(255) NOT NULL,
    "opis_slike" VARCHAR(255),
    "datum_dodavanja" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rijesena_lokacija_id" INTEGER NOT NULL,

    CONSTRAINT "slika_posjeta_pkey" PRIMARY KEY ("slika_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "slika_lokacije_putanja_slike_key" ON "slika_lokacije"("putanja_slike");

-- CreateIndex
CREATE UNIQUE INDEX "slika_posjeta_putanja_slike_key" ON "slika_posjeta"("putanja_slike");

-- AddForeignKey
ALTER TABLE "slika_lokacije" ADD CONSTRAINT "slika_lokacije_lokacija_id_fkey" FOREIGN KEY ("lokacija_id") REFERENCES "lokacija"("lokacija_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slika_posjeta" ADD CONSTRAINT "slika_posjeta_rijesena_lokacija_id_fkey" FOREIGN KEY ("rijesena_lokacija_id") REFERENCES "rijesena_lokacija"("rijesena_lokacija_id") ON DELETE RESTRICT ON UPDATE CASCADE;
