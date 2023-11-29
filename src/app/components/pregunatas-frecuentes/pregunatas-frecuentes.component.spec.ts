import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregunatasFrecuentesComponent } from './pregunatas-frecuentes.component';

describe('PregunatasFrecuentesComponent', () => {
  let component: PregunatasFrecuentesComponent;
  let fixture: ComponentFixture<PregunatasFrecuentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregunatasFrecuentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregunatasFrecuentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
