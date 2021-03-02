import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiembraComponent } from './siembra.component';

describe('SiembraComponent', () => {
  let component: SiembraComponent;
  let fixture: ComponentFixture<SiembraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiembraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiembraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
