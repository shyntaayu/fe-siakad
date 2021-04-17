import {
  Component,
  OnInit,
  Injector,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { AppConfig } from "app/model/app-config";
import { KrsService } from "app/services/krs.service";
import { AppComponentBase } from "shared/app-component-base";
const noop = () => {};
@Component({
  selector: "dosen-by-matkul-ddl",
  template: `<div [busyIf]="isLoading">
    <mat-form-field class="example-full-width">
      <mat-label>Dosen</mat-label>
      <input
        type="text"
        placeholder="Pilih Dosen"
        aria-label="Number"
        matInput
        [matAutocomplete]="auto"
        [(ngModel)]="inputValue"
        #autoCompleteInput
      />
      <mat-autocomplete
        autoActiveFirstOption
        #auto="matAutocomplete"
        (optionSelected)="selectedDosen.emit(inputValue)"
        [displayWith]="displayFn.bind(this)"
      >
        <mat-option *ngFor="let option of dosen" [value]="option.nip">
          {{ option.nama }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DosenByMatkulDdlComponent,
      multi: true,
    },
  ],
})
export class DosenByMatkulDdlComponent
  extends AppComponentBase
  implements OnInit, ControlValueAccessor, OnChanges {
  private innerValue: any = "";
  dosen;
  stateCtrl: FormControl;

  onChange: (value: string) => void;

  @Input() isDisabled: boolean = false;
  @Input() kodeMatkul: any;
  @Input() nip: any;
  @Output() selectedDosen: EventEmitter<any> = new EventEmitter<any>();

  isLoading = false;

  private onTouchedCallback: () => void = noop;

  constructor(
    private _krsService: KrsService,
    injector: Injector,
    private appConfig: AppConfig
  ) {
    super(injector);
    this.stateCtrl = new FormControl();
  }

  ngOnInit(): void {}

  // ngOnChanges(): void {
  //   this.selectedDosen = this.selectedDosen;
  // }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.kodeMatkul) {
      this.loadData(changes.kodeMatkul.currentValue);
    } else {
    }
  }

  loadData(a) {
    console.log(this.kodeMatkul);
    if (this.kodeMatkul) {
      let self = this;
      self.isLoading = true;
      this._krsService
        .getDosenByMatkul(this.appConfig.jenisAplikasiString, this.kodeMatkul)
        .subscribe(
          (data) => {
            this.dosen = data.result;
            console.log(this.dosen);
            let sel = this.dosen.find((_) => _.nip === this.nip).nip;
            this.inputValue = sel;
            self.isLoading = false;
          },
          (err) => {
            self.isLoading = false;
            console.error(err);
            this.showMessage("Eror!", err.message, "error");
          }
        );
    }
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
    return value ? this.dosen.find((_) => _.nip === value).nama : undefined;
  }
}
