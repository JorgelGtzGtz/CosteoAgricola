import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAgroquimicoComponent } from './tipo-agroquimico.component';

describe('TipoAgroquimicoComponent', () => {
  let component: TipoAgroquimicoComponent;
  let fixture: ComponentFixture<TipoAgroquimicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoAgroquimicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAgroquimicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
