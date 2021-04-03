import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MasterRoutingModule } from "./master-routing.module";
import { UserComponent } from "./user/user.component";
import { DynamicFormQuestionComponent } from "./dynamic-form-question/dynamic-form-question.component";
import { DynamicFormComponent } from "./dynamic-form-question/dynamic-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormBuilderModule } from "./dynamic-form-builder/dynamic-form-builder.module";

@NgModule({
  declarations: [
    UserComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    DynamicFormBuilderModule,
  ],
})
export class MasterModule {}
