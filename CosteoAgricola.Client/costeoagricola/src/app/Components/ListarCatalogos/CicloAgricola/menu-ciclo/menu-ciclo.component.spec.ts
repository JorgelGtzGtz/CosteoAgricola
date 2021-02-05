import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCicloComponent } from './menu-ciclo.component';

describe('MenuCicloComponent', () => {
  let component: MenuCicloComponent;
  let fixture: ComponentFixture<MenuCicloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCicloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCicloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
