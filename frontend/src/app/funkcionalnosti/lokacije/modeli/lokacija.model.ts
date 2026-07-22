export type SlikaLokacije = {
  slikaId: number;
  putanjaSlike: string;
  opisSlike?: string | null;
  glava: boolean;
};

export type KategorijaLokacije = {
  kategorijaId: number;
  naziv: string;
  opis?: string | null;
};

export type Lokacija = {
  lokacijaId: number;
  naziv: string;
  opis?: string | null;
  grad: string;
  zupanija: string;
  jePopularna: boolean;
  prosjecnaOcjena?: number | null;
  nagradaXp: number;
  nagradaValuta: number;
  kategorija: KategorijaLokacije;
  slikeLokacije: SlikaLokacije[];
};
