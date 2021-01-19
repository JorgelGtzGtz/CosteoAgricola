import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaSiembraComponent } from './alta-siembra.component';

describe('AltaSiembraComponent', () => {
  let component: AltaSiembraComponent;
  let fixture: ComponentFixture<AltaSiembraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaSiembraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaSiembraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
