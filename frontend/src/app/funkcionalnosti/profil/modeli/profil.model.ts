export type MojProfil = {
  profilId: number;
  korisnikId: number;
  opisProfila: string | null;
  profilnaSlikaUrl: string | null;
  razina: number;
  xpBodovi: number;
  virtualniNovac: number;
  korisnik: {
    korisnikId: number;
    ulogaId: number;
    ime: string | null;
    prezime: string | null;
    korisnickoIme: string;
    email: string;
  };
};

export type ProfilSlikaPosjeta = {
  slikaId: number;
  putanjaSlike: string;
  opisSlike?: string | null;
  datumDodavanja: string;
  rijesenaLokacija: {
    datumVrijemePosjeta: string;
    lokacija: {
      lokacijaId: number;
      naziv: string;
    };
  };
};
