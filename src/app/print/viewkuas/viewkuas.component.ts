import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppConfig } from "app/model/app-config";
import { KrsService } from "app/services/krs.service";
import { PresensiService } from "app/services/presensi.service";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { PrintService } from "../print.service";

@Component({
  selector: "app-viewkuas",
  templateUrl: "./viewkuas.component.html",
  styleUrls: ["./viewkuas.component.css"],
})
export class ViewKuasComponent extends AppComponentBase implements OnInit {
  data;
  nim;
  semester;
  current_date = Date.now();
  header;
  totalSks;
  tahun_akademik;
  dataKrs;
  loading = false;

  constructor(
    private printService: PrintService,
    private krsService: KrsService,
    private presensiService: PresensiService,
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
    this.loading = true;
    this.krsService
      .getKrsBody(this.appConfig.jenisAplikasiString, this.nim, this.semester)
      .pipe(
        finalize(() => {
          this.krsService
            .getKrsHeader(this.nim)
            .pipe(
              finalize(() => {
                this.presensiService
                  .getLaporanPresensi(
                    this.appConfig.jenisAplikasiString,
                    this.nim,
                    this.semester
                  )
                  .pipe(
                    finalize(() => {
                      this.loading = false;
                      // this.printService.onDataReady();
                    })
                  )
                  .subscribe(
                    (data) => {
                      data.result.map((list) => {
                        let hadir = list.data_presensi.Hadir;
                        let alpha = list.data_presensi.Alpha;
                        console.log(alpha, hadir);
                        let persen = ((hadir - alpha) / hadir) * 100;
                        console.log(persen, typeof persen);
                        persen = isNaN(persen) ? 0 : persen;
                        // console.log(persen);
                        let cekal = false;
                        if (persen < 64) {
                          cekal = true;
                        }
                        let resultpersen = isFinite(persen) ? persen : 0;
                        list["cekal"] = cekal;
                        list["persen"] = resultpersen;
                      });
                      this.data = data.result;
                      console.log(data.result);
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
          this.dataKrs = data.result;
          if (data.result.length > 0)
            this.tahun_akademik = data.result[0].tahun_akademik;
          this.totalSks = this.dataKrs.reduce((total, num) => {
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
