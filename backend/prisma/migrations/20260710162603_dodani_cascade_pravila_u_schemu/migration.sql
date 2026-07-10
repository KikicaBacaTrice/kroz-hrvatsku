-- DropForeignKey
ALTER TABLE "korisnik_dekoracija" DROP CONSTRAINT "korisnik_dekoracija_dekoracija_id_fkey";

-- DropForeignKey
ALTER TABLE "korisnik_dekoracija" DROP CONSTRAINT "korisnik_dekoracija_korisnik_id_fkey";

-- DropForeignKey
ALTER TABLE "korisnik_postignuce" DROP CONSTRAINT "korisnik_postignuce_korisnik_id_fkey";

-- DropForeignKey
ALTER TABLE "korisnik_postignuce" DROP CONSTRAINT "korisnik_postignuce_postignuce_id_fkey";

-- DropForeignKey
ALTER TABLE "postignuce" DROP CONSTRAINT "postignuce_dekoracija_id_fkey";

-- DropForeignKey
ALTER TABLE "povratna_informacija" DROP CONSTRAINT "povratna_informacija_korisnik_id_fkey";

-- DropForeignKey
ALTER TABLE "povratna_informacija" DROP CONSTRAINT "povratna_informacija_lokacija_id_fkey";

-- DropForeignKey
ALTER TABLE "profil" DROP CONSTRAINT "profil_korisnik_id_fkey";

-- DropForeignKey
ALTER TABLE "rijesena_lokacija" DROP CONSTRAINT "rijesena_lokacija_korisnik_id_fkey";

-- DropForeignKey
ALTER TABLE "rijesena_lokacija" DROP CONSTRAINT "rijesena_lokacija_lokacija_id_fkey";

-- DropForeignKey
ALTER TABLE "slika_lokacije" DROP CONSTRAINT "slika_lokacije_lokacija_id_fkey";

-- DropForeignKey
ALTER TABLE "slika_posjeta" DROP CONSTRAINT "slika_posjeta_rijesena_lokacija_id_fkey";

-- AddForeignKey
ALTER TABLE "profil" ADD CONSTRAINT "profil_korisnik_id_fkey" FOREIGN KEY ("korisnik_id") REFERENCES "korisnik"("korisnik_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slika_lokacije" ADD CONSTRAINT "slika_lokacije_lokacija_id_fkey" FOREIGN KEY ("lokacija_id") REFERENCES "lokacija"("lokacija_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rijesena_lokacija" ADD CONSTRAINT "rijesena_lokacija_korisnik_id_fkey" FOREIGN KEY ("korisnik_id") REFERENCES "korisnik"("korisnik_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rijesena_lokacija" ADD CONSTRAINT "rijesena_lokacija_lokacija_id_fkey" FOREIGN KEY ("lokacija_id") REFERENCES "lokacija"("lokacija_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slika_posjeta" ADD CONSTRAINT "slika_posjeta_rijesena_lokacija_id_fkey" FOREIGN KEY ("rijesena_lokacija_id") REFERENCES "rijesena_lokacija"("rijesena_lokacija_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "korisnik_dekoracija" ADD CONSTRAINT "korisnik_dekoracija_dekoracija_id_fkey" FOREIGN KEY ("dekoracija_id") REFERENCES "dekoracija"("dekoracija_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "korisnik_dekoracija" ADD CONSTRAINT "korisnik_dekoracija_korisnik_id_fkey" FOREIGN KEY ("korisnik_id") REFERENCES "korisnik"("korisnik_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postignuce" ADD CONSTRAINT "postignuce_dekoracija_id_fkey" FOREIGN KEY ("dekoracija_id") REFERENCES "dekoracija"("dekoracija_id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "korisnik_postignuce" ADD CONSTRAINT "korisnik_postignuce_postignuce_id_fkey" FOREIGN KEY ("postignuce_id") REFERENCES "postignuce"("postignuce_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "korisnik_postignuce" ADD CONSTRAINT "korisnik_postignuce_korisnik_id_fkey" FOREIGN KEY ("korisnik_id") REFERENCES "korisnik"("korisnik_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "povratna_informacija" ADD CONSTRAINT "povratna_informacija_korisnik_id_fkey" FOREIGN KEY ("korisnik_id") REFERENCES "korisnik"("korisnik_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "povratna_informacija" ADD CONSTRAINT "povratna_informacija_lokacija_id_fkey" FOREIGN KEY ("lokacija_id") REFERENCES "lokacija"("lokacija_id") ON DELETE CASCADE ON UPDATE CASCADE;
