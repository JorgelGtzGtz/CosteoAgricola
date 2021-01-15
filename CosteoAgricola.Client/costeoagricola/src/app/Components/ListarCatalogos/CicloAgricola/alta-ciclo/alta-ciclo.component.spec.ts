import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCicloComponent } from './alta-ciclo.component';

describe('AltaCicloComponent', () => {
  let component: AltaCicloComponent;
  let fixture: ComponentFixture<AltaCicloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaCicloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaCicloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
