import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemillasInsumosComponent } from './semillas-insumos.component';

describe('SemillasInsumosComponent', () => {
  let component: SemillasInsumosComponent;
  let fixture: ComponentFixture<SemillasInsumosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemillasInsumosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemillasInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
