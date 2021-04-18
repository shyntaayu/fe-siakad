import { Component, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppConfig } from "app/model/app-config";
import { KrsService } from "app/services/krs.service";
import { MahasiswaService } from "app/services/mahasiswa.service";
import { MessageService, SelectItem } from "primeng/api";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { MainService } from "../main.service";
import { Product } from "../model/product";

@Component({
  selector: "app-khs",
  templateUrl: "./khs.component.html",
  styleUrls: ["./khs.component.css"],
})
export class KhsComponent extends AppComponentBase implements OnInit {
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
  listMatkul = [];

  constructor(
    private mahasiswaService: MahasiswaService,
    private fb: FormBuilder,
    private productService: MainService,
    private messageService: MessageService,
    injector: Injector,
    private appConfig: AppConfig,
    private krsService: KrsService,
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

  ngOnInit(): void {
    this.productService.getProductsSmall().then((data) => {
      this.products = data;
      console.log(data);
    });
    this.productService
      .getProductsSmall()
      .then((data) => (this.products2 = data));
    this.statuses = [
      { label: "In Stock", value: "INSTOCK" },
      { label: "Low Stock", value: "LOWSTOCK" },
      { label: "Out of Stock", value: "OUTOFSTOCK" },
    ];
  }

  onRowSelect(event) {
    console.log(event);
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
    this.krsService
      .getKrs2(this.appConfig.jenisAplikasiString, nim, this.model.semester)
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
    this.getMahasiswa2();
  }

  getMahasiswa2() {
    this.loading = true;
    this.loading1 = true;
    this.listMatkul = [];
    this.mahasiswaService
      .getMahasiswas2(
        this.appConfig.jenisAplikasiString,
        this.model.jenjang,
        this.model.jurusan,
        this.model.semester,
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

  getNew(param) {
    console.log(param);
    if (this.model) this.model.semester = param;
    if (this.nim) this.getMatkulByMhs(this.nim);
  }

  print(type) {
    console.log("type----", type);
    // localStorage.setItem("sinim", this.nim);
    // localStorage.setItem("sismt", this.model.semester);
    if (type == 1) {
      let link = "/print/khs/" + this.nim + "/" + this.semester;
      this.router.navigate([]).then((result) => {
        window.open(link, "_blank");
      });
    }
  }
}
