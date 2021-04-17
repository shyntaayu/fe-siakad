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
      // semester: ["", Validators.required],
      // jenis: ["", Validators.required],
      // jurusan: ["", Validators.required],
      // tahun: ["", Validators.required],
      // kelas: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  onRowSelect(event) {
    console.log(event);
    this.messageService.add({
      severity: "info",
      summary: "Mata Kuliah Selected",
      detail: event.data.nama_matkul,
    });
    this.krsid = event.data.krs_id;
    this.kode_matkul = event.data.kode_matkul;
    this.nip = event.data.nip;
    this.getMhsByMatkul();
  }

  getMhsByMatkul() {
    this.loading1 = true;
    this.krsService
      .getPesertaByMatkul(
        this.appConfig.jenisAplikasiString,
        this.krsid,
        this.model.tahun,
        this.model.semester,
        this.model.jenjang,
        this.model.jurusan,
        this.model.kelas
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
          console.log(data);
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
      summary: "Product Unselected",
      detail: event.data.nama,
    });
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

  print(type) {
    console.log("type----", type);
    // localStorage.setItem("sinim", this.nim);
    // localStorage.setItem("sismt", this.model.semester);
    if (type == 1) {
      let link = "/print/krs/" + this.nim + "/" + this.semester;
      this.router.navigate([]).then((result) => {
        window.open(link, "_blank");
      });
    }
  }
  getDosen(a) {
    console.log("m111111", a);
  }
}
