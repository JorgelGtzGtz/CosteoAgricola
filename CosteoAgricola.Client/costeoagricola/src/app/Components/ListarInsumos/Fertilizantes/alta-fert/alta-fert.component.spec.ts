import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaFertComponent } from './alta-fert.component';

describe('AltaFertComponent', () => {
  let component: AltaFertComponent;
  let fixture: ComponentFixture<AltaFertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaFertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaFertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
