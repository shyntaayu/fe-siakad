import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhsComponent } from './khs.component';

describe('KhsComponent', () => {
  let component: KhsComponent;
  let fixture: ComponentFixture<KhsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
