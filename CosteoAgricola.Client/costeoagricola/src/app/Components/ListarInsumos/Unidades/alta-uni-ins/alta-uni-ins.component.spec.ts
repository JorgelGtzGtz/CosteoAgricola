import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaUniInsComponent } from './alta-uni-ins.component';

describe('AltaUniInsComponent', () => {
  let component: AltaUniInsComponent;
  let fixture: ComponentFixture<AltaUniInsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaUniInsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaUniInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
