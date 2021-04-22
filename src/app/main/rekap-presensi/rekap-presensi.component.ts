import { Component, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppConfig } from "app/model/app-config";
import { KrsService } from "app/services/krs.service";
import { PresensiService } from "app/services/presensi.service";
import { MessageService, SelectItem } from "primeng/api";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { MainService } from "../main.service";
import { Product } from "../model/product";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import autoTable from "jspdf-autotable";
import * as xlsx from "xlsx";
import { PresensiCekal } from "app/model/presensi-cekal";

@Component({
  selector: "app-rekap-presensi",
  templateUrl: "./rekap-presensi.component.html",
  styleUrls: ["./rekap-presensi.component.css"],
})
export class RekapPresensiComponent extends AppComponentBase implements OnInit {
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
  model;
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
  jspdf = new jsPDF();
  matkul;
  jmlMahasiswa;

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
    private presensiService: PresensiService,
    private router: Router
  ) {
    super(injector);
    this.profileForm = this.fb.group({
      jenjang: ["", Validators.required],
      semester: ["", Validators.required],
      jurusan: ["", Validators.required],
      tahun: ["", Validators.required],
      kelas: ["", Validators.required],
    });
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
    console.log(event);
    this.messageService.add({
      severity: "info",
      summary: "Mata Kuliah Selected",
      detail: event.data.nama_matkul,
    });
    this.krsid = event.data.krs_id;
    this.kode_matkul = event.data.kode_matkul;
    this.matkul = event.data.nama_matkul;
    this.nip = event.data.nip;
    this.selectedMatkul = event.data;
    this.getMhsByMatkul();
  }

  getMhsByMatkul() {
    this.loading1 = true;
    this.presensiService
      .getPresensiMahasiswaPerMatkul(
        this.appConfig.jenisAplikasiString,
        this.krsid,
        1
      )
      .pipe(
        finalize(() => {
          this.loading = false;
          this.loading1 = false;
        })
      )
      .subscribe(
        (data) => {
          data.result.map((m) => {
            // let hadir=m.list_presensi_2.reduce((a, b) => a + b, 0)
            let obj = m.list_presensi_2.reduce(function (acc, cur, i) {
              acc["minggu" + (i + 1)] = cur;
              return acc;
            }, {});
            let persen =
              ((m.presensi.data_presensi.Hadir -
                m.presensi.data_presensi.Alpha) /
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
          this.listMahasiswa = data.result;
          console.log("mee----", data.result);
        },
        (error) => {
          console.log(error);
          console.log(error.status);
          this.showMessage("Eror!", error.message, "error");
        }
      );
  }

  onRowUnselect(event) {
    this.messageService.add({
      severity: "info",
      summary: "Matakuliah Unselected",
      detail: event.data.nama_matkul,
    });
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
          console.log(data);
        },
        (error) => {
          console.log(error);
          console.log(error.status);
          this.showMessage("Eror!", error.message, "error");
        }
      );
  }

  getNew(param) {
    console.log(param);
    if (this.model) this.model.semester = param;
    if (this.nim) this.getMhsByMatkul();
  }

  getDosen(a) {
    console.log("m111111", a);
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
  getSemester(a) {
    console.log("------", a);
  }

  exportExcel() {
    let cekalaja = this.listMahasiswa.filter((a) => a.cekal == true);
    const worksheet = xlsx.utils.json_to_sheet(cekalaja);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer: any = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    this.saveAsExcelFile(
      excelBuffer,
      "cekal_" + this.kode_matkul + "_" + this.matkul
    );
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  onRowEditInit(a) {
    console.log(a);
    console.log("dataEdit----", a);
  }

  onRowEditSave(row) {
    // if (product.price > 0) {
    //   delete this.clonedProducts[product.id];
    //   this.messageService.add({
    //     severity: "success",
    //     summary: "Success",
    //     detail: "Product is updated",
    //   });
    // } else {
    //   this.messageService.add({
    //     severity: "error",
    //     summary: "Error",
    //     detail: "Invalid Price",
    //   });
    // }
    let dataBaru = row;
    console.log("------dataBaru", dataBaru);
    let edited = [];
    let a;
    if (dataBaru.minggu1 == 1) {
      a = 1;
      edited.push(a);
    }
    if (dataBaru.minggu2 == 1) {
      a = 2;
      edited.push(a);
    }
    if (dataBaru.minggu3 == 1) {
      a = 3;
      edited.push(a);
    }
    if (dataBaru.minggu4 == 1) {
      a = 4;
      edited.push(a);
    }
    if (dataBaru.minggu5 == 1) {
      a = 5;
      edited.push(a);
    }
    if (dataBaru.minggu6 == 1) {
      a = 6;
      edited.push(a);
    }
    if (dataBaru.minggu7 == 1) {
      a = 7;
      edited.push(a);
    }
    if (dataBaru.minggu8 == 1) {
      a = 8;
      edited.push(a);
    }
    if (dataBaru.minggu9 == 1) {
      a = 9;
      edited.push(a);
    }
    if (dataBaru.minggu10 == 1) {
      a = 10;
      edited.push(a);
    }
    if (dataBaru.minggu11 == 1) {
      a = 11;
      edited.push(a);
    }
    if (dataBaru.minggu12 == 1) {
      a = 12;
      edited.push(a);
    }
    if (dataBaru.minggu13 == 1) {
      a = 13;
      edited.push(a);
    }
    if (dataBaru.minggu14 == 1) {
      a = 14;
      edited.push(a);
    }

    console.log("------edited", edited);
    edited.map((e) => {
      this.loading1 = true;
      let model = new PresensiCekal();
      model.jenis_aplikasi = this.appConfig.jenisAplikasi;
      model.id_master_waktu_presensi = e;
      model.master_tipe_presensi_id = 2;
      model.nim = row.nim;
      model.krs_id = this.krsid;
      console.log(model);
      this.presensiService
        .addPresensi(model)
        .pipe(
          finalize(() => {
            this.loading1 = false;
            this.getMhsByMatkul();
          })
        )
        .subscribe(
          (res) => {
            console.log(res);
            if (res.status == 0) {
              this.showMessage("Eror!", res.message, "error");
            } else {
              // this.showMessage(
              //   "Sukses!",
              //   res.msg + " - Berhasil mengganti nilai",
              //   "success"
              // );
              this.showNotification(
                "top",
                "right",
                "Sukses! " +
                  res.msg +
                  " - Berhasil mengganti presensi minggu" +
                  e,
                "success"
              );
            }
          },
          (error) => {
            this.showMessage("Eror!", error, "error");
          }
        );
    });
  }

  onRowEditCancel() {
    this.getMhsByMatkul();
  }
}
