import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaLotesComponent } from './alta-lotes.component';

describe('AltaLotesComponent', () => {
  let component: AltaLotesComponent;
  let fixture: ComponentFixture<AltaLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaLotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
