import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppConfig } from "app/model/app-config";
import { KrsService } from "app/services/krs.service";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { PrintService } from "../print.service";

@Component({
  selector: "app-viewkuts",
  templateUrl: "./viewkuts.component.html",
  styleUrls: ["./viewkuts.component.css"],
})
export class ViewKutsComponent extends AppComponentBase implements OnInit {
  data;
  nim;
  semester;
  current_date = Date.now();
  header;
  totalSks;

  constructor(
    private printService: PrintService,
    private krsService: KrsService,
    private appConfig: AppConfig,
    injector: Injector,
    route: ActivatedRoute
  ) {
    super(injector);
    // this.nim = localStorage.getItem("sinim");
    // this.semester = localStorage.getItem("sismt");
    this.nim = route.snapshot.params["nim"];
    this.semester = route.snapshot.params["semester"];
  }

  ngOnInit() {
    this.krsService
      .getKrsBody(this.appConfig.jenisAplikasiString, this.nim, this.semester)
      .pipe(
        finalize(() => {
          this.krsService
            .getKrsHeader(this.nim)
            .pipe(
              finalize(() => {
                // this.printService.onDataReady();
              })
            )
            .subscribe(
              (data) => {
                this.header = data.result[0];
                console.log(data);
              },
              (error) => {
                console.log(error);
                this.showMessage("Eror!", error.message, "error");
              }
            );
        })
      )
      .subscribe(
        (data) => {
          this.data = data.result;
          this.totalSks = this.data.reduce((total, num) => {
            return total + num.sks;
          }, 0);
          console.log(data);
        },
        (error) => {
          console.log(error);
          this.showMessage("Eror!", error.message, "error");
        }
      );
  }
}
