import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ControlMessageComponent } from "./control-message.component";
import { FormControlStyleComponent } from "./form-control-style.component";
import { ProdiDdlComponent } from "./prodi-ddl.component";
import { UtilsModule } from "shared/utils/utils.module";
import { TahunDdlComponent } from "./tahun-ddl.component";
import { SmtAngkaDdlComponent } from "./smtangka-ddl.component";
import { JenjangDdlComponent } from "./jenjang-ddl.component";
import { SemesterDdlComponent } from "./semester-ddl.component";
import { KelasDdlComponent } from "./kelas-ddl.component";
import { JenisDdlComponent } from "./jenis-ddl.component";
import { JenisRadioComponent } from "./jenis-radio.component";
import { MatRadioModule } from "@angular/material/radio";
import { DosenDdlComponent } from "./dosen-ddl.component";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule,
    MatRadioModule,
  ],
  declarations: [
    DosenDdlComponent,
    ControlMessageComponent,
    FormControlStyleComponent,
    ProdiDdlComponent,
    TahunDdlComponent,
    SemesterDdlComponent,
    JenjangDdlComponent,
    SmtAngkaDdlComponent,
    KelasDdlComponent,
    JenisDdlComponent,
    JenisRadioComponent,
  ],
  exports: [
    DosenDdlComponent,
    ControlMessageComponent,
    FormControlStyleComponent,
    ProdiDdlComponent,
    TahunDdlComponent,
    SemesterDdlComponent,
    JenjangDdlComponent,
    SmtAngkaDdlComponent,
    KelasDdlComponent,
    JenisDdlComponent,
    JenisRadioComponent,
  ],
})
export class ShareModule {}
