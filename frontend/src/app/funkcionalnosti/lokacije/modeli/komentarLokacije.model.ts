export type KomentarLokacije = {
  povratnaInformacijaId: number;
  tekst: string;
  ocjena: number;
  datum: string;
  korisnikId: number;

  korisnik: {
    korisnickoIme: string;
    ime?: string | null;
    prezime?: string | null;
  };
};
