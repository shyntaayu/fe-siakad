import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "dropdown",
  template: `
    <div [formGroup]="form">
      <mat-select
        class="form-control"
        [id]="field.name"
        [formControlName]="field.name"
      >
        <mat-option *ngFor="let opt of field.options" [value]="opt.key">{{
          opt.label
        }}</mat-option>
      </mat-select>
    </div>
  `,
})

// <select
//         class="form-control"
//         [id]="field.name"
//         [formControlName]="field.name"
//       >
//         <option *ngFor="let opt of field.options" [value]="opt.key">
//           {{ opt.label }}
//         </option>
//       </select>
export class DropDownComponent {
  @Input() field: any = {};
  @Input() form: FormGroup;

  constructor() {}
}
