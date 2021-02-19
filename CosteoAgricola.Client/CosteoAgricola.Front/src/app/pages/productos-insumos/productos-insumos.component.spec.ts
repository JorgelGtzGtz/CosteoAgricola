import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosInsumosComponent } from './productos-insumos.component';

describe('ProductosInsumosComponent', () => {
  let component: ProductosInsumosComponent;
  let fixture: ComponentFixture<ProductosInsumosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosInsumosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
