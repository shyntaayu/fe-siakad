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
  selector: "jenis-radio",
  template: `<div [busyIf]="isLoading">
    <mat-radio-group
      aria-labelledby="example-radio-group-label"
      class="example-radio-group"
      [(ngModel)]="inputValue"
    >
      <mat-radio-button
        class="example-radio-button"
        *ngFor="let option of jenis"
        [value]="option.value"
      >
        {{ option.value }}
      </mat-radio-button>
    </mat-radio-group>
  </div>`,
  styles: [
    ".example-radio-group {display: flex;flex-direction: row;margin: 15px 0; }.example-radio-button {margin: 5px;}",
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: JenisRadioComponent,
      multi: true,
    },
  ],
})

// <div [busyIf]="isLoading">
//     <mat-radio-group
//       aria-labelledby="example-radio-group-label"
//       class="example-radio-group"
//       [(ngModel)]="inputValue"
//     >
//       <div class="row">
//         <mat-radio-button
//           class="col-md-3"
//           *ngFor="let option of jenis"
//           [value]="option.value"
//         >
//           {{ option.value }}
//         </mat-radio-button>
//       </div>
//     </mat-radio-group>
//   </div>
export class JenisRadioComponent
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
