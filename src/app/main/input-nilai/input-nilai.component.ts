import { Component, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppConfig } from "app/model/app-config";
import { NilaiModel } from "app/model/nilai-model";
import { AuthenticationService } from "app/services/authentication.service";
import { KhsService } from "app/services/khs.service";
import { MahasiswaService } from "app/services/mahasiswa.service";
import { MessageService, SelectItem } from "primeng/api";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import { MainService } from "../main.service";
import { Product } from "../model/product";

@Component({
  selector: "app-input-nilai",
  templateUrl: "./input-nilai.component.html",
  styleUrls: ["./input-nilai.component.css"],
})
export class InputNilaiComponent extends AppComponentBase implements OnInit {
  profileForm: FormGroup;
  options: string[] = ["One", "Two", "Three"];
  products: Product[];
  selectedProduct2: Product;
  products2: Product[];
  clonedProducts: { [s: string]: Product } = {};
  nilaies: SelectItem[];

  nim;
  loading = false;
  loading2 = false;
  listMahasiswa = [];
  listNilai = [];
  mahasiswa;
  kaprodi;

  constructor(
    private messageService: MessageService,
    private mahasiswaService: MahasiswaService,
    private khsService: KhsService,
    injector: Injector,
    private appConfig: AppConfig,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.nilaies = [
      { label: "A", value: "A" },
      { label: "A-", value: "A-" },
      { label: "B+", value: "B+" },
      { label: "B", value: "B" },
      { label: "B-", value: "B-" },
      { label: "C+", value: "C+" },
      { label: "C", value: "C" },
      { label: "C-", value: "C-" },
      { label: "D", value: "D" },
      { label: "E", value: "E" },
    ];
  }

  onRowSelect(event) {
    this.messageService.add({
      severity: "info",
      summary: "Mahasiswa Selected",
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

  onRowEditInit(product: Product) {
    console.log(product);
    // this.clonedProducts[product.id] = { ...product };
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
    console.log(row);
    this.loading2 = true;
    let model = new NilaiModel();
    model.detail_krs_id = row.last_detail_krs_id;
    model.jenis_aplikasi = this.appConfig.jenisAplikasiString;
    model.keterangan = "update nilai dari kaprodi";
    model.nilai = row.nilai;
    model.nip_kaprodi = this.kaprodi;
    model.nip_puskordat = this.authenticationService.userValue["username"];
    console.log(model);
    this.khsService
      .addNilaiKaprodi(model)
      .pipe(
        finalize(() => {
          this.loading2 = false;
          this.getNilai(this.nim);
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
          if (res.status == 0) {
            this.showMessage("Eror!", res.message, "error");
          } else {
            this.showMessage(
              "Sukses!",
              res.msg + " - Berhasil mengganti nilai",
              "success"
            );
          }
        },
        (error) => {
          this.showMessage("Eror!", error, "error");
        }
      );
  }

  onRowEditCancel() {
    this.getNilai(this.nim);
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  applyFilter(a) {
    // TODO: Use EventEmitter with form value
    console.log(a);
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
          console.log(data);
        },
        (error) => {
          console.log(error);
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
          console.log(data);
        },
        (error) => {
          console.log(error);
          this.showMessage("Eror!", error.message, "error");
        }
      );
  }
}
