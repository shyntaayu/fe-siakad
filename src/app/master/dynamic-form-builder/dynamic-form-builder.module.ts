import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicFormBuilderComponent } from "./dynamic-form-builder.component";
import { FieldBuilderComponent } from "./field-builder";
import { TextBoxComponent } from "./atoms/textbox";
import { DropDownComponent } from "./atoms/dropdown";
import { CheckBoxComponent } from "./atoms/checkbox";
import { FileComponent } from "./atoms/file";
import { RadioComponent } from "./atoms/radio";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [
    DynamicFormBuilderComponent,
    FieldBuilderComponent,
    TextBoxComponent,
    DropDownComponent,
    CheckBoxComponent,
    FileComponent,
    RadioComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [DynamicFormBuilderComponent],
})
export class DynamicFormBuilderModule {}
