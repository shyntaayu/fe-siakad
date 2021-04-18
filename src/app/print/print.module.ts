import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrintRoutingModule } from "./print-routing.module";
import { ViewpresensiComponent } from "./viewpresensi-backup/viewpresensi.component";
import { PrintLayoutComponent } from "./print-layout/print-layout.component";
import { PrintComponent } from "./print.component";
import { PrintService } from "./print.service";
import { RouterModule } from "@angular/router";
import { ViewKrsComponent } from "./viewkrs/viewkrs.component";
import { ViewKhsComponent } from "./viewkhs/viewkhs.component";
import { ViewBeritaAcaraComponent } from "./viewberitaacara/viewberitaacara.component";
import { ViewSalinanNilaiComponent } from "./viewsalinannilai/viewsalinannilai.component";
import { ViewPresensiKelasComponent } from "./viewpresensi/viewpresensi.component";
import { ViewKehadiranComponent } from "./viewkehadiran/viewkehadiran.component";
import { ViewKuasComponent } from "./viewkuas/viewkuas.component";
import { ViewKutsComponent } from "./viewkuts/viewkuts.component";

@NgModule({
  imports: [CommonModule, PrintRoutingModule, RouterModule],
  declarations: [
    ViewpresensiComponent,
    PrintLayoutComponent,
    PrintComponent,
    ViewKrsComponent,
    ViewKhsComponent,
    ViewBeritaAcaraComponent,
    ViewSalinanNilaiComponent,
    ViewPresensiKelasComponent,
    ViewKehadiranComponent,
    ViewKuasComponent,
    ViewKutsComponent,
  ],
  exports: [
    ViewpresensiComponent,
    PrintLayoutComponent,
    PrintComponent,
    ViewKrsComponent,
    ViewKhsComponent,
    ViewBeritaAcaraComponent,
    ViewSalinanNilaiComponent,
    ViewPresensiKelasComponent,
    ViewKehadiranComponent,
    ViewKuasComponent,
    ViewKutsComponent,
  ],
  providers: [PrintService],
  bootstrap: [PrintComponent],
})
export class PrintModule {}
