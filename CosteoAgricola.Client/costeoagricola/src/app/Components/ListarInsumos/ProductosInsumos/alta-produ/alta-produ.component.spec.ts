import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProduComponent } from './alta-produ.component';

describe('AltaProduComponent', () => {
  let component: AltaProduComponent;
  let fixture: ComponentFixture<AltaProduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaProduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaProduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
