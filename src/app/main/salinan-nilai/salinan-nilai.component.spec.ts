import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalinanNilaiComponent } from './salinan-nilai.component';

describe('SalinanNilaiComponent', () => {
  let component: SalinanNilaiComponent;
  let fixture: ComponentFixture<SalinanNilaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalinanNilaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalinanNilaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
