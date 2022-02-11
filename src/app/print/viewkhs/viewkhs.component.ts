import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppConfig } from "app/model/app-config";
import { KhsService } from "app/services/khs.service";
import { KrsService } from "app/services/krs.service";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { PrintService } from "../print.service";

@Component({
  selector: "app-viewkhs",
  templateUrl: "./viewkhs.component.html",
  styleUrls: ["./viewkhs.component.css"],
})
export class ViewKhsComponent extends AppComponentBase implements OnInit {
  data;
  nim;
  semester;
  current_date = Date.now();
  header;
  totalSks;
  footer;
  other;
  beban;
  dipk;
  ttd;

  constructor(
    private printService: PrintService,
    private krsService: KrsService,
    private khsService: KhsService,
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
    this.khsService
      .getKhs(this.appConfig.jenisAplikasiString, this.nim, this.semester)
      .pipe(
        finalize(() => {
          this.krsService
            .getKrsHeader(this.nim)
            .pipe(
              finalize(() => {
                this.khsService
                  .getIPK(this.appConfig.jenisAplikasiString, this.nim)
                  .pipe(
                    finalize(() => {
                      // this.printService.onDataReady();
                    })
                  )
                  .subscribe(
                    (data) => {
                      this.dipk = data.result;
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
                this.header = data.result[0];
                console.log(data);
                let prodi = this.header.prodi.toString().toLowerCase();
                if (
                  this.header.jenjang == "S1" &&
                  prodi == "teknologi informasi"
                ) {
                  this.ttd = "/assets/img/ttd-pak-samsul-2.png";
                }
                if (
                  this.header.jenjang == "S1" &&
                  prodi == "sistem informasi"
                ) {
                  this.ttd = "/assets/img/ttd-bu-dwi.gif";
                }
                if (
                  this.header.jenjang == "D3" &&
                  prodi == "sistem informasi"
                ) {
                  this.ttd = "/assets/img/ttd-bu-linda.png";
                }
              },
              (error) => {
                console.log(error);
                this.showMessage("Eror!", error.message, "error");
              }
            );
        })
      )
      .subscribe(
        (e) => {
          console.log("data", e);
          let data = e["result"];
          this.footer = data.list_khs[0];
          this.totalSks = data.total_sks;
          this.data = data.list_khs;
          this.other = data;

          if (data.ip <= 2) this.beban = 20;
          else this.beban = 24;

          console.log(data);
        },
        (error) => {
          console.log(error);
          this.showMessage("Eror!", error.message, "error");
        }
      );
  }
}
