import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLotesComponent } from './menu-lotes.component';

describe('MenuLotesComponent', () => {
  let component: MenuLotesComponent;
  let fixture: ComponentFixture<MenuLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuLotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
