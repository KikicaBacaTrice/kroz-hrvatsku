import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutentikacijaComponent } from './autentikacija.component';

describe('AutentikacijaComponent', () => {
  let component: AutentikacijaComponent;
  let fixture: ComponentFixture<AutentikacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutentikacijaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutentikacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
