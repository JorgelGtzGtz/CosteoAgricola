import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAgroComponent } from './alta-agro.component';

describe('AltaAgroComponent', () => {
  let component: AltaAgroComponent;
  let fixture: ComponentFixture<AltaAgroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaAgroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaAgroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
