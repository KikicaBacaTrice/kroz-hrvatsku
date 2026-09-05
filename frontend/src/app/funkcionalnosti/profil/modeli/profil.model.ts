export type ProfilBedz = {
  bedzId: number;
  naziv: string;
  opis: string | null;
  putanjaIkone: string;
};

export type MojProfil = {
  profilId: number;
  korisnikId: number;
  opisProfila: string | null;
  profilnaSlikaUrl: string | null;
  razina: number;
  xpBodovi: number;
  virtualniNovac: number;
  aktivnaPozadinaUrl: string | null;
  aktivnaDekoracijaAvatarUrl: string | null;

  bedzPozicija1Id: number | null;
  bedzPozicija2Id: number | null;
  bedzPozicija3Id: number | null;
  bedzPozicija1: ProfilBedz | null;
  bedzPozicija2: ProfilBedz | null;
  bedzPozicija3: ProfilBedz | null;

  korisnik: {
    korisnikId: number;
    ulogaId: number;
    ime: string | null;
    prezime: string | null;
    korisnickoIme: string;
    email: string;
  };
};

export type UrediProfilaZahtjev = {
  ime: string | null;
  prezime: string | null;
  korisnickoIme: string;
  opisProfila: string | null;
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

export type AdminKorisnik = {
  korisnikId: number;
  ime: string | null;
  prezime: string | null;
  korisnickoIme: string;
  ulogaId: number;
  uloga?: {
    naziv: string;
  };
  profil: {
    virtualniNovac: number;
  } | null;
};

export type azurirajNovacKorisnikaZahjtev = {
  virtualniNovac: number;
};
