import { Component, inject, OnInit, signal } from '@angular/core';
import { LokacijeHttpService } from '../../../lokacije/podaci/lokacije-http.service';
import { Router } from '@angular/router';
import { LokacijaFormaModel } from '../../modeli/lokacija-forma.mode';
import { LokacijaFormaComponent } from '../../ui/lokacija-forma/lokacija-forma.component';
import { KategorijeHttpService } from '../../../lokacije/podaci/kategorije-http.service';
import { single } from 'rxjs';
import { KategorijaLokacije } from '../../../lokacije/modeli/lokacija.model';

@Component({
  selector: 'app-dodaj-lokaciju',
  imports: [LokacijaFormaComponent],
  templateUrl: './dodaj-lokaciju.component.html',
  styleUrl: './dodaj-lokaciju.component.scss',
})
export class DodajLokacijuComponent implements OnInit {
  private readonly lokacijeHttp = inject(LokacijeHttpService);
  private readonly router = inject(Router);
  private readonly kateogrijeHttp = inject(KategorijeHttpService);

  readonly kategorije = signal<KategorijaLokacije[]>([]);

  ngOnInit(): void {
    this.kateogrijeHttp.dohvatiSveKategorije().subscribe({
      next: (kategorije) => this.kategorije.set(kategorije),
    });
  }

  dodajLokaciju(zahtjev: LokacijaFormaModel): void {
    this.lokacijeHttp.dodajLokaciju(zahtjev).subscribe({
      next: () => this.router.navigate(['./uredivanje/lokacije']),
    });
  }

  odustani(): void {
    this.router.navigate(['/uredivanje/lokacije']);
  }
}
