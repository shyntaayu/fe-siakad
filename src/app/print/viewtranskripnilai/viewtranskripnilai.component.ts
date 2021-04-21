import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppConfig } from "app/model/app-config";
import { KhsService } from "app/services/khs.service";
import { KrsService } from "app/services/krs.service";
import { MahasiswaService } from "app/services/mahasiswa.service";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { PrintService } from "../print.service";

@Component({
  selector: "app-viewtranskripnilai",
  templateUrl: "./viewtranskripnilai.component.html",
  styleUrls: ["./viewtranskripnilai.component.css"],
})
export class ViewTranskripNilaiComponent
  extends AppComponentBase
  implements OnInit {
  dataRight;
  dataLeft;
  nim;
  semester;
  current_date = Date.now();
  header;
  totalSks;
  footer;
  half;
  mahasiswa;

  constructor(
    private printService: PrintService,
    private krsService: KrsService,
    private khsService: KhsService,
    private mahasiswaService: MahasiswaService,
    private appConfig: AppConfig,
    injector: Injector,
    route: ActivatedRoute
  ) {
    super(injector);
    this.nim = route.snapshot.params["nim"];
  }

  // this.printService.onDataReady();
  ngOnInit() {
    //get semester
    this.mahasiswaService
      .getSemesterByNim(this.appConfig.jenisAplikasiString, this.nim)
      .pipe(
        finalize(() => {
          //get footer
          this.krsService
            .getKrs2(
              this.appConfig.jenisAplikasiString,
              this.nim,
              this.semester
            )
            .pipe(
              finalize(() => {
                //get transkrip nilai
                this.khsService
                  .getSalinanNilai(this.appConfig.jenisAplikasiString, this.nim)
                  .pipe(
                    finalize(() => {
                      //get data mahasiswa
                      this.mahasiswaService
                        .getDetailMahasiswa(
                          this.appConfig.jenisAplikasiString,
                          this.nim
                        )
                        .pipe(finalize(() => {}))
                        .subscribe(
                          (data) => {
                            this.mahasiswa = data.result[0];
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
                      let all = data.result.filter((l) => l.nilai != "");
                      let count = all.length;
                      this.half = Math.round(count / 2);
                      this.dataLeft = all.slice(0, this.half);
                      this.dataRight = all.slice(this.half + 1, count);

                      console.log(data.result.length);
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
                this.footer = data.result[0];
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
          this.semester = data.result;
          console.log(data);
        },
        (error) => {
          console.log(error);
          this.showMessage("Eror!", error.message, "error");
        }
      );
  }
}