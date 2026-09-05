import { Component, EventEmitter, Output, output } from '@angular/core';

@Component({
  selector: 'app-karta-hrvatske',
  imports: [],
  templateUrl: './karta-hrvatske.component.html',
  styleUrl: './karta-hrvatske.component.scss',
})
export class KartaHrvatskeComponent {
  @Output() zupanijaOdabrana = new EventEmitter<string>();

  private aktivnaZupanijaElement: Element | null = null;

  odaberiZupaniju(zupanija: string, event: Event): void {
    this.aktivnaZupanijaElement?.classList.remove(
      'karta-hrvatske__zupanija--aktivna',
    );

    const element = event.currentTarget as Element;
    element.classList.add('karta-hrvatske__zupanija--aktivna');
    this.aktivnaZupanijaElement = element;

    this.zupanijaOdabrana.emit(zupanija);
  }
}
