import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DosenComponent } from "./dosen-ddl.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  declarations: [DosenComponent],
  exports: [DosenComponent],
})
export class ShareModule {}
