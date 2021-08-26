import { Component, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ListKrs, ModelAddKRS } from "app/model/add-krs";
import { AppConfig } from "app/model/app-config";
import { KhsService } from "app/services/khs.service";
import { KrsService } from "app/services/krs.service";
import { KurikulumService } from "app/services/kurikulum.service";
import { MahasiswaService } from "app/services/mahasiswa.service";
import { MessageService } from "primeng/api";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";

@Component({
  selector: "app-paket-krs",
  templateUrl: "./paket-krs.component.html",
  styleUrls: ["./paket-krs.component.css"],
})
export class PaketKrsComponent extends AppComponentBase implements OnInit {
  selectedNim = [];
  selectedMatkul = [];
  nim;
  loading = false;
  loading2 = false;
  listMahasiswa = [];
  mahasiswa;
  profileForm: FormGroup;
  model;
  listMatkul = [];
  semesterAngka;
  semesterBanyak = [
    {
      value: "X",
      label: "X",
    },
    {
      value: 1,
      label: 1,
    },
    {
      value: 2,
      label: 2,
    },
    {
      value: 3,
      label: 3,
    },
    {
      value: 4,
      label: 4,
    },
    {
      value: 5,
      label: 5,
    },
    {
      value: 6,
      label: 6,
    },
    {
      value: 7,
      label: 7,
    },
    {
      value: 8,
      label: 8,
    },
    {
      value: 9,
      label: 9,
    },
    {
      value: 10,
      label: 10,
    },
  ];

  prodi;

  constructor(
    private messageService: MessageService,
    private mahasiswaService: MahasiswaService,
    private kurikulumService: KurikulumService,
    private krsService: KrsService,
    injector: Injector,
    private appConfig: AppConfig,
    private router: Router,
    private fb: FormBuilder
  ) {
    super(injector);
    this.profileForm = this.fb.group({
      semester: ["", Validators.required],
      tahun: ["", Validators.required],
      jurusan: [""],
    });
  }

  ngOnInit(): void {
    this.getAllProdi();
  }

  onRowUnselect(event) {
    // this.messageService.add({
    //   severity: "info",
    //   summary: "Mahasiswa Unselected",
    //   detail: event.data.nama,
    // });
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

  isNumber(n) {
    return Number(n) === n;
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    this.model = this.profileForm.value;
    let smtAngka = this.semesterBanyak.filter((n) => this.isNumber(n.value));
    let smtFix = [];
    if (this.model.semester == 1) {
      smtFix = smtAngka.filter((n) => +n.value % 2 == 1);
    } else {
      smtFix = smtAngka.filter((n) => +n.value % 2 == 0);
    }
    this.semesterBanyak = smtFix;
    this.getMatkul();
  }

  getMatkul() {
    this.loading = true;
    this.loading2 = true;
    this.kurikulumService
      .getMatkulKRS(
        this.appConfig.jenisAplikasiString,
        this.model.semester,
        this.model.tahun
      )
      .pipe(
        finalize(() => {
          this.loading = false;
          this.loading2 = false;
        })
      )
      .subscribe(
        (data) => {
          let matkul = data.result;
          console.log(this.model.jurusan);
          let kode = this.model.jurusan;
          let me = matkul.filter((e) => {
            let kd = e.kode_matkul.substring(5, 7);
            console.log("kd", kd, typeof kd);
            console.log("kode", kode, typeof kode);
            console.log(kd == kode);
            if (kd == kode) return e;
          });
          this.listMatkul = me;
          console.log(me);
        },
        (error) => {
          console.log(error);
          console.log(error.status);
          this.showMessage("Eror!", error.message, "error");
        }
      );
  }

  save() {
    console.log("this.selectedNim", this.selectedNim);
    console.log("this.selectedMatkul", this.selectedMatkul);

    this.loading = true;
    this.loading2 = true;
    let temp: ListKrs[] = [];
    this.selectedMatkul.map((m) => {
      let krs = new ListKrs();
      krs.kode_matkul = m.kode_matkul;
      krs.krs_id = m.krs_id;
      temp.push(krs);
    });
    this.selectedNim.map((e) => {
      let model = new ModelAddKRS();
      model.jenis_aplikasi = this.appConfig.jenisAplikasiString;
      model.nim = e.nim;
      model.semester = this.semesterAngka;
      model.list_krs = temp;
      console.log(model);
      this.krsService
        .addKrs(model)
        .pipe(
          finalize(() => {
            this.loading = false;
            this.loading2 = false;
          })
        )
        .subscribe(
          (res) => {
            if (res.status == 0) {
              this.showMessage("Eror!", res.msg, "error");
            } else {
              this.showNotification(
                "top",
                "right",
                "Sukses! " +
                  res.msg +
                  " - Berhasil menambah KRS nim = " +
                  e.nim,
                "success"
              );
            }
            console.log(res);
          },
          (error) => {
            console.log(error);
            console.log(error.status);
            this.showMessage("Eror!", error.message, "error");
          }
        );
    });
  }

  getAllProdi() {
    this.krsService.getAllProdi().subscribe(
      (result) => {
        this.prodi = result.result;
      },
      (err) => {
        console.error(err);
        this.showMessage("Eror!", err.message, "error");
      }
    );
  }

  getProdi(a) {
    let prodi = this.prodi.filter((obj) => {
      return obj.kode_prodi == a;
    });
    return prodi[0].nama;
  }
}
