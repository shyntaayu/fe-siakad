import {
  Component,
  OnInit,
  Injector,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { KrsService } from "app/services/krs.service";
import { AppComponentBase } from "shared/app-component-base";
const noop = () => {};
@Component({
  selector: "semester-ddl",
  template: `<div [busyIf]="isLoading">
    <mat-form-field class="example-full-width">
      <mat-label>Semester</mat-label>
      <input
        type="text"
        placeholder="Pilih Semester"
        aria-label="Number"
        matInput
        [matAutocomplete]="auto"
        [(ngModel)]="inputValue"
        (optionSelected)="onChange($event.option.value)"
      />
      <mat-autocomplete
        autoActiveFirstOption
        #auto="matAutocomplete"
        [displayWith]="displayFn.bind(this)"
      >
        <mat-option *ngFor="let option of semester" [value]="option.value">
          {{ option.nama }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SemesterDdlComponent,
      multi: true,
    },
  ],
})
export class SemesterDdlComponent
  extends AppComponentBase
  implements OnInit, ControlValueAccessor {
  private innerValue: any = "";
  semester;

  onChange: (value: string) => void;

  @Input() isDisabled: boolean = false;
  @Input() selectedSemester: number = undefined;

  isLoading = false;

  private onTouchedCallback: () => void = noop;

  constructor(private _krsService: KrsService, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let self = this;
    self.isLoading = true;
    this._krsService.getAllSemester().subscribe(
      (result) => {
        this.semester = result;
        self.isLoading = false;
      },
      (err) => {
        self.isLoading = false;
        console.error(err);
        this.showMessage("Eror!", err.message, "error");
      }
    );
  }

  ngOnChanges(): void {
    this.selectedSemester = this.selectedSemester;
  }

  get inputValue(): any {
    return this.innerValue;
  }

  set inputValue(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChange(v);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  displayFn(value?: number) {
    return value
      ? this.semester.find((_) => _.value === value).nama
      : undefined;
  }
}
