import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaketKrsComponent } from './paket-krs.component';

describe('PaketKrsComponent', () => {
  let component: PaketKrsComponent;
  let fixture: ComponentFixture<PaketKrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaketKrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaketKrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
