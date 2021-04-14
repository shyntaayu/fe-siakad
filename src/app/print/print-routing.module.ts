import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "app/helpers/auth.guard";
import { PrintLayoutComponent } from "./print-layout/print-layout.component";
import { ViewKrsComponent } from "./viewkrs/viewkrs.component";
import { ViewpresensiComponent } from "./viewpresensi/viewpresensi.component";

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintRoutingModule {}
