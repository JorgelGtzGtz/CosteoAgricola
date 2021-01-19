import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSiembraComponent } from './menu-siembra.component';

describe('MenuSiembraComponent', () => {
  let component: MenuSiembraComponent;
  let fixture: ComponentFixture<MenuSiembraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSiembraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSiembraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
