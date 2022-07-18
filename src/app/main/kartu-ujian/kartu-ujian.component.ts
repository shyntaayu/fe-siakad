import { Component, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppConfig } from "app/model/app-config";
import { MahasiswaService } from "app/services/mahasiswa.service";
import { PresensiService } from "app/services/presensi.service";
import { MessageService, SelectItem } from "primeng/api";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { MainService } from "../main.service";
import { Product } from "../model/product";

@Component({
  selector: "app-kartu-ujian",
  templateUrl: "./kartu-ujian.component.html",
  styleUrls: ["./kartu-ujian.component.css"],
})
export class KartuUjianComponent extends AppComponentBase implements OnInit {
  profileForm: FormGroup;
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
  listMahasiswa;
  loading1 = false;
  loading2 = false;
  model;
  nim;
  listPresensi = [];
  kelas;

  constructor(
    private mahasiswaService: MahasiswaService,
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
      kelas: ["", Validators.required],
      jurusan: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  onRowSelect(event) {
    this.messageService.add({
      severity: "info",
      summary: "Mahasiswa Selected",
      detail: event.data.nama,
    });
    this.nim = event.data.nim;
    this.getMatkulByMhs(this.nim);
  }

  getMatkulByMhs(nim) {
    this.loading2 = true;
    this.presensiService
      .getLaporanPresensi(
        this.appConfig.jenisAplikasiString,
        nim,
        this.model.semester
      )
      .pipe(
        finalize(() => {
          this.loading = false;
          this.loading2 = false;
        })
      )
      .subscribe(
        (data) => {
          this.listPresensi = data.result;
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

  onSubmit() {
    console.warn(this.profileForm.value);
    this.model = this.profileForm.value;
    this.getMahasiswa2();
  }

  getMahasiswa2() {
    this.loading = true;
    this.loading1 = true;
    this.listPresensi = [];
    this.mahasiswaService
      .getMahasiswas(
        this.appConfig.jenisAplikasiString,
        this.model.jenjang,
        this.model.jurusan
        // this.model.semester,
        // this.model.kelas
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

  getNew(param) {
    if (this.model) this.model.semester = param;
    if (this.nim) this.getMatkulByMhs(this.nim);
  }

  print(type) {
    // localStorage.setItem("sinim", this.nim);
    // localStorage.setItem("sismt", this.model.semester);
    if (type == 1) {
      let link = "/print/kartu-uts/" + this.nim + "/" + this.semester;
      this.router.navigate([]).then((result) => {
        window.open(link, "_blank");
      });
    }
    if (type == 2) {
      let link = "/print/kartu-uas/" + this.nim + "/" + this.semester;
      this.router.navigate([]).then((result) => {
        window.open(link, "_blank");
      });
    }
  }
}
