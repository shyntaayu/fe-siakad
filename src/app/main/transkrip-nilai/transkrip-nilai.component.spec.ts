import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TranskripNilaiComponent } from "./transkrip-nilai.component";

describe("TranskripNilaiComponent", () => {
  let component: TranskripNilaiComponent;
  let fixture: ComponentFixture<TranskripNilaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranskripNilaiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranskripNilaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
