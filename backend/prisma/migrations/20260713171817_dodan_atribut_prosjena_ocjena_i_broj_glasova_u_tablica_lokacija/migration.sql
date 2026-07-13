-- AlterTable
ALTER TABLE "lokacija" ADD COLUMN     "broj_ocjena" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prosjecna_ocjena" DOUBLE PRECISION;
