import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiLokacijeComponent } from './detalji-lokacije.component';

describe('DetaljiLokacijeComponent', () => {
  let component: DetaljiLokacijeComponent;
  let fixture: ComponentFixture<DetaljiLokacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetaljiLokacijeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaljiLokacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
