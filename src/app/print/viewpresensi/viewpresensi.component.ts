import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppConfig } from "app/model/app-config";
import { KrsService } from "app/services/krs.service";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { PrintService } from "../print.service";

@Component({
  selector: "app-viewpresensi",
  templateUrl: "./viewpresensi.component.html",
  styleUrls: ["./viewpresensi.component.css"],
})
export class ViewPresensiKelasComponent
  extends AppComponentBase
  implements OnInit
{
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
  jenis;
  title;
  tipe;
  sesi;
  listMahasiswa;
  listFixMahasiswa;

  constructor(
    private printService: PrintService,
    private krsService: KrsService,
    private appConfig: AppConfig,
    injector: Injector,
    route: ActivatedRoute
  ) {
    super(injector);
    // this.nim = localStorage.getItem("sinim");
    this.matkul = JSON.parse(localStorage.getItem("simatkul"));
    this.key = JSON.parse(localStorage.getItem("sikey"));
    this.listMahasiswa = JSON.parse(localStorage.getItem("simahasiswa"));
    this.sesi = +localStorage.getItem("sisesi");
    this.getJenjang();
    this.getJurusan();
    this.tahun_akademik = this.key.tahun;
    this.getKelas();
    this.getSemester();
    this.getMatkul();
    this.jenis = this.key.jenis;
    switch (this.jenis) {
      case "Kelas":
        this.title = "KELAS";
        this.tipe = 1;
        break;
      case "Ujian Praktikum":
        this.tipe = 2;
        this.title = "UJIAN PRAKTIKUM";
        break;
      case "UTS":
        this.title = "UJIAN TENGAH SEMESTER";
        this.tipe = 3;
        break;
      case "UAS":
        this.title = "UJIAN AKHIR SEMESTER";
        this.tipe = 4;
        break;
      case "Praktikum":
        this.title = "KELAS";
        this.tipe = 5;
        break;
    }
  }

  ngOnInit() {
    // JSON.parse(localStorage.getItem('UploadSchedulerPrice'));
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
              },
              (error) => {
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
        },
        (error) => {
          this.showMessage("Eror!", error.message, "error");
        }
      );

    this.listMahasiswa.map((m) => {
      // let hadir=m.list_presensi_2.reduce((a, b) => a + b, 0)
      let obj = m.list_presensi_2.reduce(function (acc, cur, i) {
        acc["minggu" + (i + 1)] = cur;
        return acc;
      }, {});
      let persen =
        ((m.presensi.data_presensi.Hadir - m.presensi.data_presensi.Alpha) /
          m.presensi.data_presensi.Hadir) *
        100;
      persen = isNaN(persen) ? 0 : persen;
      let cekal = false;
      if (persen < 64) {
        cekal = true;
      }
      m["cekal"] = cekal;
      Object.assign(m, obj);
    });
    this.listFixMahasiswa = this.listMahasiswa;
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
}
