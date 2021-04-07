import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "dynamic-form-builder",
  templateUrl: "./dynamic-form-builder.component.html",
  styleUrls: ["./dynamic-form-builder.component.css"],
})
export class DynamicFormBuilderComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  @Input() fields: any[] = [];
  form: FormGroup;
  constructor() {}

  ngOnInit() {
    let fieldsCtrls = {};
    for (let f of this.fields) {
      if (f.type != "checkbox") {
        fieldsCtrls[f.name] = new FormControl(
          f.value || "",
          Validators.required
        );
      } else {
        let opts = {};
        for (let opt of f.options) {
          opts[opt.key] = new FormControl(opt.value);
        }
        fieldsCtrls[f.name] = new FormGroup(opts);
      }
    }
    this.form = new FormGroup(fieldsCtrls);
  }

  reset() {
    this.form.reset();
  }
}
