import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarticaLokacijeComponent } from './kartica-lokacije.component';

describe('KarticaLokacijeComponent', () => {
  let component: KarticaLokacijeComponent;
  let fixture: ComponentFixture<KarticaLokacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KarticaLokacijeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KarticaLokacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
