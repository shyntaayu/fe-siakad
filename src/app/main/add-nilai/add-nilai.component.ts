import { Component, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AddNilai, ListNilai } from "app/model/add-nilai";
import { AppConfig } from "app/model/app-config";
import { NilaiModel } from "app/model/nilai-model";
import { PresensiCekal } from "app/model/presensi-cekal";
import { AuthenticationService } from "app/services/authentication.service";
import { KhsService } from "app/services/khs.service";
import { KrsService } from "app/services/krs.service";
import { MahasiswaService } from "app/services/mahasiswa.service";
import { PresensiService } from "app/services/presensi.service";
import { MessageService, SelectItem } from "primeng/api";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { MainService } from "../main.service";
import { Product } from "../model/product";

class model {
  jenjang: string;
  tipenilai: number;
  tahun: number;
  semester: number;
  jurusan: string;
  kelas: string;
}

@Component({
  selector: "app-add-nilai",
  templateUrl: "./add-nilai.component.html",
  styleUrls: ["./add-nilai.component.css"],
})
export class AddNilaiComponent extends AppComponentBase implements OnInit {
  profileForm: FormGroup;
  secondForm: FormGroup;
  options: string[] = ["One", "Two", "Three"];
  products: Product[];
  selectedProduct2: Product;
  products2: Product[];
  clonedProducts: { [s: string]: Product } = {};
  presies: SelectItem[];
  loading = false;
  tahun;
  semester;
  prodi;
  jenjang;
  loading1 = false;
  loading2 = false;
  model = new model();
  nim;
  listMahasiswa = [];
  listMatkul = [];
  jenis;
  kelas;
  krsid;
  kode_matkul;
  nip;
  listDosen = [];
  dosen;
  selectedMatkul;
  selectedDosenNew;
  matkul;
  jmlMahasiswa;
  tipeNilai;
  isPraktikum = false;

  cols: any[];
  frozenCols = [
    { field: "nim", header: "NIM" },
    { field: "nama", header: "Nama" },
  ];

  exportColumns: any[];

  constructor(
    private krsService: KrsService,
    private fb: FormBuilder,
    private productService: MainService,
    private messageService: MessageService,
    injector: Injector,
    private appConfig: AppConfig,
    private khsService: KhsService,
    private router: Router
  ) {
    super(injector);
    this.profileForm = this.fb.group({
      jenjang: ["", Validators.required],
      semester: ["", Validators.required],
      jurusan: ["", Validators.required],
      tahun: ["", Validators.required],
      kelas: ["", Validators.required],
      // tipenilai: ["", Validators.required],
    });
    this.getTipeNilai();
  }

  ngOnInit(): void {
    this.cols = [
      { field: "code", header: "Code" },
      { field: "name", header: "Name" },
      { field: "category", header: "Category" },
      { field: "quantity", header: "Quantity" },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));

    this.presies = [
      { label: "1", value: 1 },
      { label: "0", value: 0 },
    ];
  }

  onRowSelect(event) {
    this.messageService.add({
      severity: "info",
      summary: "Mata Kuliah Selected",
      detail: event.data.nama_matkul,
    });
    this.krsid = event.data.krs_id;
    this.kode_matkul = event.data.kode_matkul;
    this.matkul = event.data.nama_matkul;
    if (this.matkul.toLowerCase().includes("praktikum")) {
      this.isPraktikum = true;
    } else {
      this.isPraktikum = false;
    }
    this.nip = event.data.nip;
    this.selectedMatkul = event.data;
    this.getMhsByMatkul();
  }

  getMhsByMatkul() {
    this.loading1 = true;
    this.khsService
      .getListNilai(this.appConfig.jenisAplikasiString, this.krsid)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.loading1 = false;
        })
      )
      .subscribe(
        (data) => {
          let tipe = this.tipeNilai;
          data.result.map((m) => {
            // let hadir=m.list_presensi_2.reduce((a, b) => a + b, 0)
            let total = 0;
            let obj = m.list_nilai.reduce(function (acc, cur, i) {
              let indTipeNilai = tipe.find(
                (_) => _.idmaster_tipe_nilai == cur.idmaster_tipe_nilai
              );
              let index = tipe.find(
                (_) => _.idmaster_tipe_nilai == cur.idmaster_tipe_nilai
              ).nama; // get nama tipe nilai= tugas1
              acc[index] = cur.nilai; // ngisi nama tipe nilai = tugas1:100
              total += +cur.nilai * (indTipeNilai["bobot"] / 100);
              acc["total"] = total;
              return acc;
            }, {});
            // m["cekal"] = cekal;
            //obj = {"tugas1": "0","uts": "0","tugas2": "0","uas": "0"}
            //m = row asli
            Object.assign(m, obj);
          });
          this.listMahasiswa = data.result;
        },
        (error) => {
          this.showMessage("Eror!", error.message, "error");
        }
      );
  }

  onRowUnselect(event) {
    // this.messageService.add({
    //   severity: "info",
    //   summary: "Matakuliah Unselected",
    //   detail: event.data.nama_matkul,
    // });
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    this.model = this.profileForm.value;
    this.getMatkul();
  }

  getMatkul() {
    this.loading = true;
    this.loading2 = true;
    this.listMahasiswa = [];
    this.krsService
      .getKrsDetail(
        this.appConfig.jenisAplikasiString,
        this.model.tahun,
        this.model.semester,
        this.model.jenjang,
        this.model.jurusan,
        this.model.kelas
      )
      .pipe(
        finalize(() => {
          this.loading = false;
          this.loading2 = false;
        })
      )
      .subscribe(
        (data) => {
          this.listMatkul = data.result;
        },
        (error) => {
          this.showMessage("Eror!", error.message, "error");
        }
      );
  }

  getNew(param) {
    if (this.model) this.model.semester = param;
    if (this.nim) this.getMhsByMatkul();
  }

  getDosen(a) {
    this.krsService
      .getDosenByMatkul(this.appConfig.jenisAplikasiString, this.kode_matkul)
      .subscribe(
        (data) => {
          this.listDosen = data.result;
          this.selectedDosenNew = this.listDosen.find((_) => _.nip === a).nama;
        },
        (err) => {
          console.error(err);
          this.showMessage("Eror!", err.message, "error");
        }
      );
  }

  modelChangeFn(value, field) {
    // localStorage.setItem("si" + field, value);
  }
  getSemester(a) {}

  onRowEditInit(a) {}

  onRowEditSave(row) {
    let dataBaru = row;

    this.loading1 = true;
    let model = new AddNilai();
    model.jenis_aplikasi = this.appConfig.jenisAplikasi;
    model.krs_id = dataBaru.krs_id;
    //ide = tipenilai dikasih flag, trus dibandingno sing onok fag e
    let teori = [1, 2, 3, 4];
    let praktek = [5, 6, 7];
    let listtipe = [];
    listtipe = this.isPraktikum ? praktek : teori;
    dataBaru.list_nilai.map((e) => {
      let i = this.tipeNilai.find((_) => _.nama == e.nama).nama;
      let listNilai = [];
      let nilaitermasuk = listtipe.includes(e.idmaster_tipe_nilai);
      if (e.nama === i && nilaitermasuk) {
        model.tipe_nilai = e.idmaster_tipe_nilai;
        let list = new ListNilai();
        list.nilai = dataBaru[e.nama];
        list.nim = dataBaru.nim;
        listNilai.push(list);
        model.list_nilai = listNilai;

        this.khsService
          .addNilai(model)
          .pipe(
            finalize(() => {
              this.loading1 = false;
              this.getMhsByMatkul();
            })
          )
          .subscribe(
            (res) => {
              if (res.status == 0) {
                this.showMessage("Eror!", res.message, "error");
              } else {
                this.showNotification(
                  "top",
                  "right",
                  "Sukses! " +
                    res.msg +
                    " - Berhasil mengganti nilai " +
                    e.nama +
                    " = " +
                    dataBaru[e.nama] +
                    ", mahasiswa " +
                    dataBaru.nama,
                  "success"
                );
              }
            },
            (error) => {
              this.showMessage("Eror!", error, "error");
            }
          );
      }
    });
  }

  onRowEditCancel() {
    this.getMhsByMatkul();
  }

  getTipeNilai() {
    this.khsService.getTipeNilai(this.appConfig.jenisAplikasiString).subscribe(
      (data) => {
        this.tipeNilai = data.result;
      },
      (err) => {
        console.error(err);
        this.showMessage("Eror!", err.message, "error");
      }
    );
  }

  getTipeNilaiDDL(param) {
    this.model.tipenilai = param;
  }
}
