import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProduInsuComponent } from './menu-produ-insu.component';

describe('MenuProduInsuComponent', () => {
  let component: MenuProduInsuComponent;
  let fixture: ComponentFixture<MenuProduInsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuProduInsuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProduInsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
