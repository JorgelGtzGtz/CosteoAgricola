import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAgroComponent } from './menu-agro.component';

describe('MenuAgroComponent', () => {
  let component: MenuAgroComponent;
  let fixture: ComponentFixture<MenuAgroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAgroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAgroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
