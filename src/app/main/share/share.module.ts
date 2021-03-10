import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DosenComponent } from "./dosen-ddl.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ControlMessageComponent } from "./control-message.component";
import { FormControlStyleComponent } from "./form-control-style.component";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DosenComponent,
    ControlMessageComponent,
    FormControlStyleComponent,
  ],
  exports: [DosenComponent, ControlMessageComponent, FormControlStyleComponent],
})
export class ShareModule {}
