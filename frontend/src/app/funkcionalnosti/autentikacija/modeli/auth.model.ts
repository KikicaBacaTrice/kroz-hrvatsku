export type PrijavaZahtjev = {
  email: string;
  lozinka: string;
};

export type RegistracijaZahtjev = {
  ime: string;
  prezime: string;
  korisnickoIme: string;
  email: string;
  lozinka: string;
};

export type AuthKorisnik = {
  korisnikId: number;
  ime: string | null;
  prezime: string | null;
  korinsickoIme: string;
  email: string;
  ulogaId: number;
};

export type AuthOdgovor = {
  accessToken: string;
  korisnik: AuthKorisnik;
};
