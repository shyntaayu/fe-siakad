import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KartuUjianComponent } from './kartu-ujian.component';

describe('KartuUjianComponent', () => {
  let component: KartuUjianComponent;
  let fixture: ComponentFixture<KartuUjianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KartuUjianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KartuUjianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
