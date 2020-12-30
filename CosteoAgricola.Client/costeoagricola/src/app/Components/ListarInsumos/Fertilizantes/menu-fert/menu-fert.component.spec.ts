import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFertComponent } from './menu-fert.component';

describe('MenuFertComponent', () => {
  let component: MenuFertComponent;
  let fixture: ComponentFixture<MenuFertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
