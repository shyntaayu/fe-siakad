import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MasterRoutingModule } from "./master-routing.module";
import { UserComponent } from "./user/user.component";
import { DynamicFormQuestionComponent } from "./dynamic-form-question/dynamic-form-question.component";
import { DynamicFormComponent } from "./dynamic-form-question/dynamic-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormBuilderModule } from "./dynamic-form-builder/dynamic-form-builder.module";
import { UserService } from "app/services/user.service";
import { UtilsModule } from "shared/utils/utils.module";
import { TableModule } from "primeng/table";

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
    UtilsModule,
    TableModule,
  ],
  providers: [UserService],
})
export class MasterModule {}
