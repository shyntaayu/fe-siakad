import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "app/helpers/auth.guard";
import { PrintLayoutComponent } from "./print-layout/print-layout.component";
import { ViewpresensiComponent } from "./viewpresensi/viewpresensi.component";

const routes: Routes = [
  {
    path: "",
    // outlet: "print",
    component: PrintLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "presensi/:invoiceIds",
        component: ViewpresensiComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintRoutingModule {}
