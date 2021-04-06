import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpresensiComponent } from './viewpresensi.component';

describe('ViewpresensiComponent', () => {
  let component: ViewpresensiComponent;
  let fixture: ComponentFixture<ViewpresensiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpresensiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpresensiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
