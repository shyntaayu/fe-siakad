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
  selector: "tahun-ddl",
  template: `<div [busyIf]="isLoading">
    <mat-form-field class="example-full-width">
      <mat-label>Tahun</mat-label>
      <input
        type="text"
        placeholder="Pilih Tahun"
        aria-label="Number"
        matInput
        [matAutocomplete]="auto"
        [(ngModel)]="inputValue"
        (optionSelected)="onChange($event.option.value)"
      />
      <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
        <mat-option
          *ngFor="let option of tahun"
          [value]="option.tahun_akademik"
        >
          {{ option.tahun_akademik }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TahunDdlComponent,
      multi: true,
    },
  ],
})
export class TahunDdlComponent
  extends AppComponentBase
  implements OnInit, ControlValueAccessor {
  private innerValue: any = "";
  tahun;

  onChange: (value: string) => void;

  @Input() isDisabled: boolean = false;
  @Input() selectedTahun: number = undefined;

  isLoading = false;

  private onTouchedCallback: () => void = noop;

  constructor(private _krsService: KrsService, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let self = this;
    self.isLoading = true;
    this._krsService.getAllTahun().subscribe(
      (result) => {
        this.tahun = result;
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
    this.selectedTahun = this.selectedTahun;
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
}
