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
  selector: "jenis-ddl",
  template: `<div [busyIf]="isLoading">
    <mat-form-field class="example-full-width">
      <mat-label>Jenis</mat-label>
      <input
        type="text"
        placeholder="Pilih jenis"
        aria-label="Number"
        matInput
        [matAutocomplete]="auto"
        [(ngModel)]="inputValue"
      />
      <mat-autocomplete
        (optionSelected)="selectedSmt.emit(inputValue)"
        autoActiveFirstOption
        #auto="matAutocomplete"
        [displayWith]="displayFn.bind(this)"
      >
        <mat-option *ngFor="let option of jenis" [value]="option.value">
          {{ option.value }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: JenisDdlComponent,
      multi: true,
    },
  ],
})
export class JenisDdlComponent
  extends AppComponentBase
  implements OnInit, ControlValueAccessor {
  private innerValue: any = "";
  jenis;

  onChange: (value: string) => void;

  @Input() isDisabled: boolean = false;
  @Input() selectedJenis: number = undefined;
  @Output() selectedSmt: EventEmitter<any> = new EventEmitter<any>();

  isLoading = false;

  private onTouchedCallback: () => void = noop;

  constructor(private _krsService: KrsService, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let self = this;
    self.isLoading = true;
    this.jenis = [
      {
        value: "Kelas",
      },
      {
        value: "UTS",
      },
      {
        value: "UAS",
      },
      {
        value: "Praktikum",
      },
    ];
    self.isLoading = false;
  }

  ngOnChanges(): void {
    this.selectedJenis = this.selectedJenis;
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
    return value ? this.jenis.find((_) => _.value === value).value : undefined;
  }
}
