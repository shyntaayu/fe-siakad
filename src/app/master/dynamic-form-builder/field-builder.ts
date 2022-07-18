import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "field-builder",
  template: `
    <div class="form-group row" [formGroup]="form">
      <label class="col-md-3 form-control-label" [attr.for]="field.label">
        {{ field.label }}
        <strong class="text-danger" *ngIf="field.required">*</strong>
      </label>
      <div class="col-md-9" [ngSwitch]="field.type">
        <textbox *ngSwitchCase="'text'" [field]="field" [form]="form"></textbox>
        <textbox
          *ngSwitchCase="'password'"
          [field]="field"
          [form]="form"
        ></textbox>
        <dropdown
          *ngSwitchCase="'dropdown'"
          [field]="field"
          [form]="form"
        ></dropdown>
        <checkbox
          *ngSwitchCase="'checkbox'"
          [field]="field"
          [form]="form"
        ></checkbox>
        <radio *ngSwitchCase="'radio'" [field]="field" [form]="form"></radio>
        <file *ngSwitchCase="'file'" [field]="field" [form]="form"></file>

        <mat-error *ngIf="!isValid && isDirty">
          {{ field.label }} is <strong>required</strong>
        </mat-error>
      </div>
    </div>
  `,
})

// <div
//           class="alert alert-danger my-1 p-2 fadeInDown animated"
//           *ngIf="!isValid && isDirty"
//         >
//           {{ field.label }} is required
//         </div>
export class FieldBuilderComponent implements OnInit {
  @Input() field: any;
  @Input() form: any;

  get isValid() {
    return this.form.controls[this.field.name].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.name].dirty;
  }

  constructor() {}

  ngOnInit() {}
}
