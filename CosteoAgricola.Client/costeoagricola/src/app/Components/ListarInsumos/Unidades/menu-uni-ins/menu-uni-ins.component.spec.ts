import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUniInsComponent } from './menu-uni-ins.component';

describe('MenuUniInsComponent', () => {
  let component: MenuUniInsComponent;
  let fixture: ComponentFixture<MenuUniInsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuUniInsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUniInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
