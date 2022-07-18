import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNilaiComponent } from './add-nilai.component';

describe('AddNilaiComponent', () => {
  let component: AddNilaiComponent;
  let fixture: ComponentFixture<AddNilaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNilaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNilaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
