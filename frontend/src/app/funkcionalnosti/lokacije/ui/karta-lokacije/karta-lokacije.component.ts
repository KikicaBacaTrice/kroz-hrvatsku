import { Component, inject, input } from '@angular/core';
import { Lokacija } from '../../modeli/lokacija.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GOOGLE_MAPS_API_KEY } from '../../../../jezgra/konfiguracija/google.config';
import { DirekcijaIkonaComponent } from '../../../../dijeljeno/ui/ikone/direkcija-ikona/direkcija-ikona.component';

@Component({
  selector: 'app-karta-lokacije',
  imports: [DirekcijaIkonaComponent],
  templateUrl: './karta-lokacije.component.html',
  styleUrl: './karta-lokacije.component.scss',
})
export class KartaLokacijeComponent {
  lokacija = input.required<Lokacija>();

  private readonly sanitizer = inject(DomSanitizer);

  googleKarteSrc(): SafeResourceUrl {
    const query = encodeURIComponent(
      `${this.lokacija().geoSirina},${this.lokacija().geoDuzina}`,
    );

    const url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${query}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  googleUputeKakoDociUrl(): string {
    const query = encodeURIComponent(
      `${this.lokacija().geoSirina},${this.lokacija().geoDuzina}`,
    );

    return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  }
}
