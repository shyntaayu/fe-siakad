import { Component, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppConfig } from "app/model/app-config";
import { KhsService } from "app/services/khs.service";
import { MahasiswaService } from "app/services/mahasiswa.service";
import { MessageService } from "primeng/api";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { MainService } from "../main.service";
import { Product } from "../model/product";

@Component({
  selector: "app-transkrip-nilai",
  templateUrl: "./transkrip-nilai.component.html",
})
export class TranskripNilaiComponent
  extends AppComponentBase
  implements OnInit
{
  selectedProduct2;
  nim;
  loading = false;
  loading2 = false;
  listMahasiswa = [];
  listNilai = [];
  mahasiswa;

  constructor(
    private messageService: MessageService,
    private mahasiswaService: MahasiswaService,
    private khsService: KhsService,
    injector: Injector,
    private appConfig: AppConfig,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  onRowSelect(event) {
    this.messageService.add({
      severity: "info",
      summary: "Mahasiwa Selected",
      detail: event.data.nama,
    });
    this.mahasiswa = event.data;
    this.nim = event.data.nim;
    this.getNilai(this.nim);
  }

  onRowUnselect(event) {
    // this.messageService.add({
    //   severity: "info",
    //   summary: "Mahasiswa Unselected",
    //   detail: event.data.nama,
    // });
  }
  applyFilter(a) {
    // TODO: Use EventEmitter with form value
    this.getMahasiswa();
  }

  getMahasiswa() {
    this.loading = true;
    this.listMahasiswa = [];
    this.mahasiswaService
      .getMahasiswaByNim(this.appConfig.jenisAplikasiString, this.nim)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (data) => {
          this.listMahasiswa = data.result;
        },
        (error) => {
          this.showMessage("Eror!", error.message, "error");
        }
      );
  }

  getNilai(a) {
    this.loading2 = true;
    this.khsService
      .getSalinanNilai(this.appConfig.jenisAplikasiString, a)
      .pipe(
        finalize(() => {
          this.loading2 = false;
        })
      )
      .subscribe(
        (data) => {
          this.listNilai = data.result;
        },
        (error) => {
          this.showMessage("Eror!", error.message, "error");
        }
      );
  }

  print() {
    let link = "/print/transkrip-nilai/" + this.nim;
    this.router.navigate([]).then((result) => {
      window.open(link, "_blank");
    });
  }
}
