import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLokacijaComponent } from './lista-lokacija.component';

describe('ListaLokacijaComponent', () => {
  let component: ListaLokacijaComponent;
  let fixture: ComponentFixture<ListaLokacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaLokacijaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaLokacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
