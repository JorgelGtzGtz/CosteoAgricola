import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientesActivosComponent } from './ingredientes-activos.component';

describe('IngredientesActivosComponent', () => {
  let component: IngredientesActivosComponent;
  let fixture: ComponentFixture<IngredientesActivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientesActivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientesActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
