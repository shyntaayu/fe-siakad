import { Component, Injector, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AppConfig } from "app/model/app-config";
import { KrsService } from "app/services/krs.service";
import { MahasiswaService } from "app/services/mahasiswa.service";
import { PresensiService } from "app/services/presensi.service";
import { MessageService, SelectItem } from "primeng/api";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { MainService } from "../main.service";
import { Product } from "../model/product";
interface Animal {
  name: string;
  sound: string;
}
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-presensi",
  templateUrl: "./presensi.component.html",
  styleUrls: ["./presensi.component.css"],
})
export class PresensiComponent extends AppComponentBase implements OnInit {
  profileForm: FormGroup;
  secondForm: FormGroup;
  options: string[] = ["One", "Two", "Three"];
  products: Product[];
  selectedProduct2: Product;
  products2: Product[];
  clonedProducts: { [s: string]: Product } = {};
  statuses: SelectItem[];
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
  sesi;
  ruangan;
  jammulai;
  jamselesai;
  selectedMatkul;
  selectedDosenNew;

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
      jenis: ["", Validators.required],
      jurusan: ["", Validators.required],
      tahun: ["", Validators.required],
      kelas: ["", Validators.required],
    });
    this.secondForm = this.fb.group({
      dosen: ["", Validators.required],
      sesi: [""],
      ruangan: [""],
      jammulai: [""],
      jamselesai: [""],
      // kelas: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  onRowSelect(event) {
    this.messageService.add({
      severity: "info",
      summary: "Mata Kuliah Selected",
      detail: event.data.nama_matkul,
    });
    this.krsid = event.data.krs_id;
    this.kode_matkul = event.data.kode_matkul;
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
    //   summary: "Product Unselected",
    //   detail: event.data.nama,
    // });
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id] = { ...product };
  }

  onRowEditSave(product: Product) {
    if (product.price > 0) {
      delete this.clonedProducts[product.id];
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Product is updated",
      });
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Invalid Price",
      });
    }
  }

  onRowEditCancel(product: Product, index: number) {
    this.products2[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
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

  print(type) {
    localStorage.setItem("simatkul", JSON.stringify(this.selectedMatkul));
    localStorage.setItem("sikey", JSON.stringify(this.model));
    localStorage.setItem("sidosennew", this.selectedDosenNew);
    localStorage.setItem("sisesi", this.sesi);
    localStorage.setItem("siruangan", this.ruangan);
    localStorage.setItem("sijammulai", this.jamselesai);
    localStorage.setItem("sijamselesai", this.jammulai);
    localStorage.setItem("simahasiswa", JSON.stringify(this.listMahasiswa));

    if (type == 1) {
      if (this.model.jenis == "Kelas") {
        if (this.sesi) {
          this.goPresensi();
        } else {
          this.showMessage("Info", "Silahkan pilih sesi", "info");
        }
      } else {
        this.goPresensi();
      }
    }
    if (type == 2) {
      let link = "/print/kehadiran";
      this.router.navigate([]).then((result) => {
        window.open(link, "_blank");
      });
    }
    if (type == 3) {
      let link = "/print/berita-acara";
      this.router.navigate([]).then((result) => {
        window.open(link, "_blank");
      });
    }
  }

  goPresensi() {
    let link = "/print/absensi";
    this.router.navigate([]).then((result) => {
      window.open(link, "_blank");
    });
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
}
