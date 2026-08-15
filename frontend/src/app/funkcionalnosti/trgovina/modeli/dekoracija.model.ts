export type TipDekoracije = {
  tipDekoracijeId: number;
  naziv: string;
  maxAktivnih: number;
};

export type NacinOtkljucavanja = {
  nacinOtkljucavanjaId: number;
  naziv: string;
};

export type Dekoracija = {
  dekoracijaId: number;
  naziv: string;
  opis: string;
  cijenaValuta: number | null;
  slikaDekoracija: string;
  tipDekoracijeId: number;
  tipDekoracije: TipDekoracije;
  nacinOtkljucavanja: NacinOtkljucavanja;
};
