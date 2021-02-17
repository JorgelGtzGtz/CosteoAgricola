import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesInsumosComponent } from './unidades-insumos.component';

describe('UnidadesInsumosComponent', () => {
  let component: UnidadesInsumosComponent;
  let fixture: ComponentFixture<UnidadesInsumosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesInsumosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
