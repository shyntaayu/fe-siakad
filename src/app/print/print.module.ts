import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrintRoutingModule } from "./print-routing.module";
import { ViewpresensiComponent } from "./viewpresensi/viewpresensi.component";
import { PrintLayoutComponent } from "./print-layout/print-layout.component";
import { PrintComponent } from "./print.component";
import { PrintService } from "./print.service";
import { RouterModule } from "@angular/router";
import { ViewKrsComponent } from "./viewkrs/viewkrs.component";
import { ViewKhsComponent } from "./viewkhs/viewkhs.component";

@NgModule({
  imports: [CommonModule, PrintRoutingModule, RouterModule],
  declarations: [
    ViewpresensiComponent,
    PrintLayoutComponent,
    PrintComponent,
    ViewKrsComponent,
    ViewKhsComponent,
  ],
  exports: [
    ViewpresensiComponent,
    PrintLayoutComponent,
    PrintComponent,
    ViewKrsComponent,
    ViewKhsComponent,
  ],
  providers: [PrintService],
  bootstrap: [PrintComponent],
})
export class PrintModule {}
