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
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { startWith } from "rxjs/operators";
const noop = () => {};
@Component({
  selector: "dosen-ddl",
  template: ` <mat-form-field class="example-full-width">
    <mat-label>Number</mat-label>
    <input
      type="text"
      placeholder="Pick one"
      aria-label="Number"
      matInput
      [formControl]="myControl"
      [matAutocomplete]="auto"
    />
    <mat-autocomplete
      autoActiveFirstOption
      #auto="matAutocomplete"
      [(ngModel)]="inputValue"
    >
      <mat-option
        *ngFor="let option of filteredOptions | async"
        [value]="option"
      >
        {{ option }}
      </mat-option>
    </mat-autocomplete>
  </mat-form-field>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DosenComponent),
      multi: true,
    },
  ],
})
export class DosenComponent implements OnInit {
  @ViewChild("ProjectCodeCombobox") projectCodeComboboxElement: ElementRef;

  private innerValue: any = "";
  project: any[] = [];

  @Input() isDisabled: boolean = false;
  @Input() selectedProject: number = undefined;
  @Output()
  selectedProjectChange: EventEmitter<number> = new EventEmitter<number>();

  isLoading = false;
  disablekah: boolean = false;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(
    // private _permissionService: PermissionServiceProxy,
    // private _msUnitServiceProxy: MsUnitServiceProxy,
    injector: Injector
  ) {
    // super(injector);
  }

  disable_kah(bol?: boolean) {
    this.disablekah = bol ? true : false;
    this.onSegar();
  }

  // ngOnInit(): void {
  //     let self = this;
  //     self.isLoading = true;
  //     // this._msUnitServiceProxy.getMsProjectDropdownMapping().subscribe(result => {
  //     //     this.project = result.items
  //     //     setTimeout(() => {
  //     //         $(self.projectCodeComboboxElement.nativeElement).selectpicker('refresh');
  //     //     }, 0);
  //     //     self.isLoading = false;
  //     // }, err => {
  //     //     self.isLoading = false;
  //     //     console.error(err);
  //     // })
  // }

  // ngAfterViewInit(): void {
  //     $(this.projectCodeComboboxElement.nativeElement).selectpicker({
  //         iconBase: 'famfamfam-flag',
  //         tickIcon: 'fa fa-check'
  //     });
  // }

  public onSegar() {
    setTimeout(() => {
      // $(this.projectCodeComboboxElement.nativeElement).selectpicker('refresh');
    }, 0);
  }

  ngOnChanges(): void {
    this.selectedProject = this.selectedProject;
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

  myControl = new FormControl();
  options: string[] = ["One", "Two", "Three"];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
