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

export type KorisnikDekoracija = {
  korisnikDekoracijaId: number;
  datumDobivanja: string;
  aktivna: boolean;
  pozicijaPrikaza: number | null;
  dekoracijaId: number;
  korisnikId: number;
  dekoracija: Dekoracija;
};

export type DekoracijaTrgovina = Dekoracija & {
  posjeduje: boolean;
  otkljucano: boolean;
  razlogZakljucavanja: string | null;
  napredak?: number;
  potrebno?: number;
};
