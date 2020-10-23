import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSemillasComponent } from './menu-semillas.component';

describe('MenuSemillasComponent', () => {
  let component: MenuSemillasComponent;
  let fixture: ComponentFixture<MenuSemillasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSemillasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSemillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
