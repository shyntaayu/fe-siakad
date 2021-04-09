import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DosenComponent } from "./dosen-ddl.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ControlMessageComponent } from "./control-message.component";
import { FormControlStyleComponent } from "./form-control-style.component";
import { ProdiDdlComponent } from "./prodi-ddl.component";
import { UtilsModule } from "shared/utils/utils.module";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule,
  ],
  declarations: [
    DosenComponent,
    ControlMessageComponent,
    FormControlStyleComponent,
    ProdiDdlComponent,
  ],
  exports: [
    DosenComponent,
    ControlMessageComponent,
    FormControlStyleComponent,
    ProdiDdlComponent,
  ],
})
export class ShareModule {}
