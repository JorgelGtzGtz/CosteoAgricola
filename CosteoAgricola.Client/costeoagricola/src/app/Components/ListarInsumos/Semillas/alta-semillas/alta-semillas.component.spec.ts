import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaSemillasComponent } from './alta-semillas.component';

describe('AltaSemillasComponent', () => {
  let component: AltaSemillasComponent;
  let fixture: ComponentFixture<AltaSemillasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaSemillasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaSemillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
