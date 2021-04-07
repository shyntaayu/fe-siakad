import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Injector,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { KrsService } from "app/services/krs.service";
import { AppComponentBase } from "shared/app-component-base";
const noop = () => {};
@Component({
  selector: "prodi-ddl",
  template: `<div [busyIf]="isLoading">
    lala
    <mat-form-field class="example-full-width">
      <mat-label>Jurusan</mat-label>
      <input
        type="text"
        placeholder="Pilih Jurusan"
        aria-label="Number"
        matInput
        [formControlName]="formControlName"
        [matAutocomplete]="auto"
      />
      <mat-autocomplete
        autoActiveFirstOption
        #auto="matAutocomplete"
        [displayWith]="displayFn.bind(this)"
      >
        <mat-option *ngFor="let option of prodi" [value]="option.kode_prodi">
          {{ option.nama }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProdiDdlComponent),
      multi: true,
    },
  ],
})
export class ProdiDdlComponent
  extends AppComponentBase
  implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild("ProjectMappingCombobox") projectCodeComboboxElement: ElementRef;

  private innerValue: any = "";
  prodi;

  @Input() formControlName: string;
  @Input() isDisabled: boolean = false;
  @Input() selectedProjectMapping: number = undefined;
  @Output()
  selectedProjectMappingChange: EventEmitter<number> = new EventEmitter<number>();

  isLoading = false;
  disablekah: boolean = false;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(private _krsService: KrsService, injector: Injector) {
    super(injector);
  }

  disable_kah(bol?: boolean) {
    this.disablekah = bol ? true : false;
    this.onSegar();
  }

  ngOnInit(): void {
    let self = this;
    self.isLoading = true;
    this._krsService.getAllProdi().subscribe(
      (result) => {
        this.prodi = result;
        self.isLoading = false;
      },
      (err) => {
        self.isLoading = false;
        console.error(err);
      }
    );
  }

  ngAfterViewInit(): void {
    // $(this.projectCodeComboboxElement.nativeElement).selectpicker({
    //     iconBase: "famfamfam-flag",
    //     tickIcon: "fa fa-check",
    // });
  }

  public onSegar() {
    // setTimeout(() => {
    //     $(this.projectCodeComboboxElement.nativeElement).selectpicker(
    //         "refresh"
    //     );
    // }, 0);
  }

  ngOnChanges(): void {
    this.selectedProjectMapping = this.selectedProjectMapping;
    this.onSegar();
  }

  get inputValue(): any {
    return this.innerValue;
  }

  set inputValue(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
      this.onSegar();
    }
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onSegar();
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  displayFn(value?: number) {
    return value
      ? this.prodi.find((_) => _.kode_prodi === value).nama
      : undefined;
  }
}
