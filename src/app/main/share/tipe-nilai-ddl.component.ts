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
import { AppConfig } from "app/model/app-config";
import { KhsService } from "app/services/khs.service";
import { AppComponentBase } from "shared/app-component-base";
const noop = () => {};
@Component({
  selector: "tipe-nilai-ddl",
  template: `<div [busyIf]="isLoading">
    <mat-form-field class="example-full-width">
      <mat-label>Tipe Nilai</mat-label>
      <input
        type="text"
        placeholder="Pilih Tipe Nilai"
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
        <mat-option
          *ngFor="let option of tipe_nilai"
          [value]="option.idmaster_tipe_nilai"
        >
          {{ option.nama }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TipeNilaiDdlComponent,
      multi: true,
    },
  ],
})
export class TipeNilaiDdlComponent
  extends AppComponentBase
  implements OnInit, ControlValueAccessor
{
  private innerValue: any = "";
  tipe_nilai;

  onChange: (value: string) => void;

  @Input() isDisabled: boolean = false;
  @Input() selectedTipeNilai: number = undefined;

  isLoading = false;

  private onTouchedCallback: () => void = noop;

  constructor(
    private _khsService: KhsService,
    injector: Injector,
    private appConfig: AppConfig
  ) {
    super(injector);
  }

  ngOnInit(): void {
    let self = this;
    self.isLoading = true;
    this._khsService.getTipeNilai(this.appConfig.jenisAplikasiString).subscribe(
      (result) => {
        this.tipe_nilai = result.result;
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
    this.selectedTipeNilai = this.selectedTipeNilai;
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
      ? this.tipe_nilai.find((_) => _.idmaster_tipe_nilai === value).nama
      : undefined;
  }
}
