import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "app/helpers/auth.guard";
import { PrintLayoutComponent } from "./print-layout/print-layout.component";
import { ViewBeritaAcaraComponent } from "./viewberitaacara/viewberitaacara.component";
import { ViewKehadiranComponent } from "./viewkehadiran/viewkehadiran.component";
import { ViewKhsComponent } from "./viewkhs/viewkhs.component";
import { ViewKrsComponent } from "./viewkrs/viewkrs.component";
import { ViewKuasComponent } from "./viewkuas/viewkuas.component";
import { ViewKutsComponent } from "./viewkuts/viewkuts.component";
import { ViewpresensiComponent } from "./viewpresensi-backup/viewpresensi.component";
import { ViewPresensiKelasComponent } from "./viewpresensi/viewpresensi.component";
import { ViewSalinanNilaiComponent } from "./viewsalinannilai/viewsalinannilai.component";

const routes: Routes = [
  {
    path: "",
    // outlet: "print",
    component: PrintLayoutComponent,
    // canActivate: [AuthGuard],
    // data: { permission: "1" },
    children: [
      {
        path: "presensi/:invoiceIds",
        component: ViewpresensiComponent,
      },
      {
        path: "krs/:nim/:semester",
        component: ViewKrsComponent,
      },
      {
        path: "khs/:nim/:semester",
        component: ViewKhsComponent,
      },
      {
        path: "berita-acara",
        component: ViewBeritaAcaraComponent,
      },
      {
        path: "salinan-nilai",
        component: ViewSalinanNilaiComponent,
      },
      {
        path: "absensi",
        component: ViewPresensiKelasComponent,
      },
      {
        path: "kehadiran",
        component: ViewKehadiranComponent,
      },
      {
        path: "kartu-uas/:nim/:semester",
        component: ViewKuasComponent,
      },
      {
        path: "kartu-uts/:nim/:semester",
        component: ViewKutsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintRoutingModule {}
