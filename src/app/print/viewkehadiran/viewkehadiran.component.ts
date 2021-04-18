import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppConfig } from "app/model/app-config";
import { KrsService } from "app/services/krs.service";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { PrintService } from "../print.service";

@Component({
  selector: "app-viewkehadiran",
  templateUrl: "./viewkehadiran.component.html",
  styleUrls: ["./viewkehadiran.component.css"],
})
export class ViewKehadiranComponent extends AppComponentBase implements OnInit {
  data;
  nim;
  semester;
  current_date = Date.now();
  header;
  totalSks;
  jenjang;
  jurusan;
  kelas;
  key;
  tahun_akademik;
  matkul;
  dosen;
  dosenNew;
  nama_matkul;
  sks;
  kode_matkul;
  sesi;
  jammulai;
  jamselesai;
  ruangan;
  listTime = [];

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
    this.sesi = +localStorage.getItem("sisesi");
    this.jammulai = localStorage.getItem("sijammulai");
    this.jamselesai = localStorage.getItem("sijamselesai");
    this.ruangan = localStorage.getItem("siruangan");
    this.getMatkul();
    this.getJenjang();
    this.getJurusan();
    this.tahun_akademik = this.key.tahun;
    this.getKelas();
    this.getSemester();
  }

  ngOnInit() {
    if (this.sesi == 1) {
      this.listTime = ["I", "II", "III", "IV", "V", "VI", "VII"];
    } else {
      this.listTime = ["VIII", "IX", "X", "XI", "XII", "XIII", "XIV"];
    }
  }

  getMatkul() {
    this.dosen = this.matkul.dosen_pengampu;
    this.dosenNew = localStorage.getItem("sidosennew");
    if (this.dosenNew != "undefined" && this.dosenNew != undefined) {
      this.dosen = this.dosenNew;
    }
    this.nama_matkul = this.matkul.nama_matkul;
    this.kode_matkul = this.matkul.kode_matkul;
    this.sks = this.matkul.sks;
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
  getSemester() {
    this.krsService.getAllSemester().subscribe(
      (result) => {
        this.semester = result.result.find(
          (_) => _.value == this.key.semester
        ).nama;
      },
      (err) => {
        this.showMessage("Eror!", err.message, "error");
      }
    );
  }
}
