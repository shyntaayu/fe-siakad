import { Component, Injector, OnInit } from "@angular/core";
import { AppConfig } from "app/model/app-config";
import { KrsService } from "app/services/krs.service";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { PrintService } from "../print.service";

@Component({
  selector: "app-viewkrs",
  templateUrl: "./viewkrs.component.html",
  styleUrls: ["./viewkrs.component.css"],
})
export class ViewKrsComponent extends AppComponentBase implements OnInit {
  data;
  nim;
  semester;
  current_date = Date.now();

  constructor(
    private printService: PrintService,
    private krsService: KrsService,
    private appConfig: AppConfig,
    injector: Injector
  ) {
    super(injector);
    this.nim = localStorage.getItem("sinim");
    this.semester = localStorage.getItem("sismt");
  }

  ngOnInit() {
    this.krsService
      .getKrs2(this.appConfig.jenisAplikasiString, this.nim, this.semester)
      .pipe(
        finalize(() => {
          // this.printService.onDataReady();
        })
      )
      .subscribe(
        (data) => {
          this.data = data.result;
          console.log(data);
        },
        (error) => {
          console.log(error);
          console.log(error.status);
          this.showMessage("Eror!", error.message, "error");
        }
      );
  }
}
