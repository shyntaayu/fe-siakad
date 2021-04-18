import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppConfig } from "app/model/app-config";
import { KrsService } from "app/services/krs.service";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { PrintService } from "../print.service";

@Component({
  selector: "app-viewberitaacara",
  templateUrl: "./viewberitaacara.component.html",
  styleUrls: ["./viewberitaacara.component.css"],
})
export class ViewBeritaAcaraComponent
  extends AppComponentBase
  implements OnInit {
  data;
  nim;
  semester;
  current_date = Date.now();
  header;
  totalSks;
  matkul;
  key;
  jmlMahasiswa;
  nama_matkul;
  sks;
  kode_matkul;
  jenjang;
  jurusan;
  kelas;

  constructor(
    private printService: PrintService,
    private krsService: KrsService,
    private appConfig: AppConfig,
    injector: Injector,
    route: ActivatedRoute
  ) {
    super(injector);
    this.matkul = JSON.parse(localStorage.getItem("simatkul"));
    this.key = JSON.parse(localStorage.getItem("sikey"));
    this.jmlMahasiswa = JSON.parse(localStorage.getItem("simahasiswa")).length;
  }

  ngOnInit() {
    this.nama_matkul = this.matkul.nama_matkul;
    this.kode_matkul = this.matkul.kode_matkul;
    this.sks = this.matkul.sks;
    this.getJenjang();
    this.getJurusan();
    this.getKelas();
    // this.printService.onDataReady();
  }

  getJenjang() {
    this.krsService.getAllJenjang().subscribe(
      (result) => {
        this.jenjang = result.result.find(
          (_) => _.id_master_jenjang == this.key.jenjang
        ).nama;
      },
      (err) => {
        this.showMessage("Eror!", err.message, "error");
      }
    );
  }

  getJurusan() {
    this.krsService.getAllProdi().subscribe(
      (result) => {
        this.jurusan = result.result.find(
          (_) => _.kode_prodi == this.key.jurusan
        ).nama;
      },
      (err) => {
        this.showMessage("Eror!", err.message, "error");
      }
    );
  }

  getKelas() {
    this.krsService.getAllKelas().subscribe(
      (result) => {
        this.kelas = result.result.find(
          (_) => _.id_master_kelas == this.key.kelas
        ).nama;
      },
      (err) => {
        this.showMessage("Eror!", err.message, "error");
      }
    );
  }
}
