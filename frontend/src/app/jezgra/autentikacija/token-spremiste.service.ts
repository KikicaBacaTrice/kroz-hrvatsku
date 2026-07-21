import { Injectable } from '@angular/core';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class TokenSpremisteService {
  spremiToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  dohvatiToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  obrisiToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  jePrijavljen(): boolean {
    return !!this.dohvatiToken();
  }
}
