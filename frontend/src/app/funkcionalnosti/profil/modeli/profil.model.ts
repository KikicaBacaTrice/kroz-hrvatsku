export type MojProfil = {
  profilId: number;
  korisnikid: number;
  opisProfila: string | null;
  profilnaSlikaUrl: string | null;
  razina: number;
  xpBodovi: number;
  virtualniNovac: number;
  korisnik: {
    korinsikId: number;
    ime: string | null;
    prezime: string | null;
    korisnickoIme: string;
    email: string;
  };
};
