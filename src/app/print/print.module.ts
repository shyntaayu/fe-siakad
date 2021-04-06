import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrintRoutingModule } from "./print-routing.module";
import { ViewpresensiComponent } from "./viewpresensi/viewpresensi.component";
import { PrintLayoutComponent } from "./print-layout/print-layout.component";
import { PrintComponent } from "./print.component";
import { PrintService } from "./print.service";

@NgModule({
  declarations: [ViewpresensiComponent, PrintLayoutComponent, PrintComponent],
  imports: [CommonModule, PrintRoutingModule],
  providers: [PrintService],
  bootstrap: [PrintComponent],
})
export class PrintModule {}
