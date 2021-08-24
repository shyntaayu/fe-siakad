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
    });
  }

  ngOnInit(): void {}

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

  onSubmit() {
    console.warn(this.profileForm.value);
    this.model = this.profileForm.value;
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
}
