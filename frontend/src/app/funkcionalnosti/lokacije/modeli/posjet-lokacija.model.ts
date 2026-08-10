export type SlikaPosjeta = {
  slikaId: number;
  putanjaSlike: string;
  opisSlike?: string | null;
  datumDodavanja: string;
};

export type RijesenaLokacija = {
  rijenaLokacijaId: number;
  datumVrijemePosjeta: string;
  biljeska?: string | null;
  brojOsvojenihXp: number;
  brojOsvojeneValute: number;
  korisnikId: number;
  lokacijaId: number;
  slikePosjeta: SlikaPosjeta[];
};
