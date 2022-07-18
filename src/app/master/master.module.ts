import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MasterRoutingModule } from "./master-routing.module";
import { UserComponent } from "./user/user.component";
import { DynamicFormQuestionComponent } from "./dynamic-form-question/dynamic-form-question.component";
import { DynamicFormComponent } from "./dynamic-form-question/dynamic-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormBuilderModule } from "./dynamic-form-builder/dynamic-form-builder.module";
import { UserService } from "app/services/user.service";
import { UtilsModule } from "shared/utils/utils.module";

import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { CalendarModule } from "primeng/calendar";
import { SliderModule } from "primeng/slider";
import { MultiSelectModule } from "primeng/multiselect";
import { ContextMenuModule } from "primeng/contextmenu";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { ProgressBarModule } from "primeng/progressbar";
import { InputTextModule } from "primeng/inputtext";
import { FileUploadModule } from "primeng/fileupload";
import { ToolbarModule } from "primeng/toolbar";
import { RatingModule } from "primeng/rating";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputNumberModule } from "primeng/inputnumber";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { InputTextareaModule } from "primeng/inputtextarea";
import { RoleComponent } from "./role/role.component";
import { RoleService } from "app/services/role.service";
import { MahasiswaComponent } from "./mahasiswa/mahasiswa.component";
import { ListMahasiswaService } from "app/services/listmahasiswa.service";
import { MatButtonModule } from "@angular/material/button";
import { ShareModule } from "app/main/share/share.module";

@NgModule({
  declarations: [
    UserComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
    RoleComponent,
    MahasiswaComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    DynamicFormBuilderModule,
    UtilsModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    MatButtonModule,
    ShareModule,
  ],
  providers: [
    UserService,
    ConfirmationService,
    MessageService,
    RoleService,
    ListMahasiswaService,
  ],
})
export class MasterModule {}
