export type SlikaLokacije = {
  slikaId: number;
  putanjaSlike: string;
  opisSlike?: string | null;
  glavna: boolean;
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
  brojOcjena: number;
  prosjecnaOcjena?: number | null;
  nagradaXp: number;
  nagradaValuta: number;
  adresa: string;
  ulaznicaCijena: number;
  geoDuzina: number;
  geoSirina: number;
  kategorija: KategorijaLokacije;
  slikeLokacije: SlikaLokacije[];
};
