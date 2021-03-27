import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MasterRoutingModule } from "./master-routing.module";
import { UserComponent } from "./user/user.component";
import { DynamicFormQuestionComponent } from "./dynamic-form-question/dynamic-form-question.component";
import { DynamicFormComponent } from "./dynamic-form-question/dynamic-form.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    UserComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
  ],
  imports: [CommonModule, MasterRoutingModule, ReactiveFormsModule],
})
export class MasterModule {}
