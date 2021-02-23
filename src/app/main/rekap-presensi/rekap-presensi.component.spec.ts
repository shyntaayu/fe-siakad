import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RekapPresensiComponent } from './rekap-presensi.component';

describe('RekapPresensiComponent', () => {
  let component: RekapPresensiComponent;
  let fixture: ComponentFixture<RekapPresensiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RekapPresensiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RekapPresensiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
