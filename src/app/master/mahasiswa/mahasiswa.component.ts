import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { AppConfig } from "app/model/app-config";
import { RegisterModel } from "app/model/register-model";
import { AuthenticationService } from "app/services/authentication.service";
import { ListMahasiswaService } from "app/services/listmahasiswa.service";
import { UserService } from "app/services/user.service";
import { ConfirmationService } from "primeng/api";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "shared/app-component-base";
import Swal from "sweetalert2";
import { DynamicFormBuilderComponent } from "../dynamic-form-builder/dynamic-form-builder.component";

export class DDR {
  key: string;
  label: string;
}

@Component({
  selector: "app-mahasiswa",
  templateUrl: "./mahasiswa.component.html",
  styleUrls: ["./mahasiswa.component.css"],
})
export class MahasiswaComponent extends AppComponentBase implements OnInit {
  listRole = [];
  loading = false;
  //option 2
  public form: FormGroup;
  unsubcribe: any;
  @ViewChild("dynamicformbuilder") child: DynamicFormBuilderComponent;
  isAdd = false;
  users;
  selectedProduct2;
  modalReference: any;
  type;
  user;
  loading2 = false;

  public fields: any[] = [
    {
      type: "text",
      name: "nim",
      label: "NIM",
      value: "",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      value: "",
      required: true,
    },
    {
      type: "dropdown",
      name: "role",
      label: "Role",
      required: true,
      options: this.getRole(),
    },
    {
      type: "dropdown",
      name: "status",
      label: "Status",
      value: "1",
      required: true,
      options: [
        { key: "1", label: "Aktif" },
        { key: "2", label: "Cekal" },
      ],
    },
  ];
  //end option 2
  profileForm: FormGroup;
  jenjang;
  prodi;
  model;

  constructor(
    private userService: UserService,
    private listMahasiswaService: ListMahasiswaService,
    private authenticationService: AuthenticationService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    injector: Injector,
    private confirmationService: ConfirmationService,
    private appConfig: AppConfig,
    private fb: FormBuilder
  ) {
    super(injector);
    //option2
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields)),
    });
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      console.log(update);
      this.fields = JSON.parse(update.fields);
    });

    config.backdrop = "static";
    config.keyboard = false;
    this.profileForm = this.fb.group({
      jenjang: ["", Validators.required],
      jurusan: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getMahasiswas();
  }

  onUpload(e) {
    console.log(e);
  }

  getFields() {
    return this.fields;
  }

  ngDistroy() {
    this.unsubcribe();
  }

  getValueForm(q) {
    this.loading = true;
    let model = new RegisterModel();
    model.jenis_aplikasi = this.appConfig.jenisAplikasi;
    model.password = q.password;
    model.penginput = this.authenticationService.userValue["username"];
    model.role = q.role;
    model.statusLogin = q.status;
    model.username = q.username;
    model.login_id = this.user.login_id;
    if (this.type == 1) {
      this.userService
        .register(model)
        .pipe(
          finalize(() => {
            this.loading = false;
            this.getMahasiswas();
          })
        )
        .subscribe(
          (res) => {
            console.log(res);
            if (res.status == 0) {
              this.showMessage("Eror!", res.msg, "error");
            } else {
              Swal.fire({
                title: "Sukses!",
                text: res.msg + " - Berhasil menambahkan",
                icon: "success",
                allowOutsideClick: false,
              }).then(() => {
                this.modalReference.close();
              });
            }
          },
          (error) => {
            this.showMessage("Eror!", error.message, "error");
          }
        );
    } else {
      this.userService
        .updateUser(model)
        .pipe(
          finalize(() => {
            this.loading = false;
            this.getMahasiswas();
          })
        )
        .subscribe(
          (res) => {
            console.log(res);
            if (res.status == 0) {
              this.showMessage("Eror!", res.msg, "error");
            } else {
              Swal.fire({
                title: "Sukses!",
                text: res.msg + " - Berhasil mengedit",
                icon: "success",
                allowOutsideClick: false,
              }).then(() => {
                this.modalReference.close();
              });
            }
          },
          (error) => {
            this.showMessage("Eror!", error.message, "error");
          }
        );
    }
  }

  getRole() {
    this.userService.getAllRole().subscribe(
      (data) => {
        data.result.map((x) => {
          let a = new DDR();
          a.key = x.master_hak_akses_id.toString();
          a.label = x.nama;
          this.listRole.push(a);
        });
      },
      (error) => {
        this.showMessage("Eror!", error.message, "error");
      }
    );
    return this.listRole;
  }

  getMahasiswas() {
    if (this.jenjang && this.prodi) {
      this.loading2 = true;
      this.listMahasiswaService
        .getListMahasiswa(
          this.appConfig.jenisAplikasi,
          this.jenjang,
          this.prodi
        )
        .pipe(
          finalize(() => {
            this.loading2 = false;
          })
        )
        .subscribe(
          (data) => {
            this.users = data.result;
            console.log(data);
          },
          (error) => {
            this.showMessage("Eror!", error.message, "error");
          }
        );
    }
  }

  open(content, type?, user?) {
    console.log(type, user);
    this.setFieldsEdit(user);
    this.type = type;
    this.modalReference = this.modalService.open(content, { size: "lg" });
  }
  close() {
    this.modalReference.close();
  }

  onRowUnselect(a) {}
  onRowSelect(a) {}

  setStatus(a) {
    let status = [
      { id: 1, label: "Aktif" },
      { id: 2, label: "Cekal" },
    ];
    return status.find((x) => x.id == a).label;
  }

  deleteUser(user) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + user.username + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.userService.deleteUser(user.login_id).subscribe(
          (res) => {
            console.log(res);
            if (res.status == 0) {
              this.showMessage("Eror!", res.msg, "error");
            } else {
              this.showMessage(
                "Sukses!",
                res.msg + " - Berhasil menghapus",
                "success"
              );
            }
          },
          (error) => {
            this.showMessage("Eror!", error.message, "error");
          }
        );
        this.getMahasiswas();
      },
    });
  }

  setFieldsEdit(user) {
    if (user) {
      this.user = user;
      this.fields[0].value = user.username;
      this.fields[1].value = user.password;
      this.fields[2].value = user.master_hak_akses_id.toString();
      this.fields[3].value = user.statusLogin.toString();
    } else {
      this.user = {};
      this.fields[0].value = undefined;
      this.fields[1].value = undefined;
      this.fields[2].value = undefined;
      this.fields[3].value = undefined;
    }
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    this.model = this.profileForm.value;
    this.getMahasiswas();
  }
}
