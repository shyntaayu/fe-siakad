import { Component, Injector, OnInit } from "@angular/core";
import { MainService } from "app/main/main.service";
import { RoleModel } from "app/model/role-model";
import { RoleResult } from "app/model/role-result";
import { RoleService } from "app/services/role.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { AppComponentBase } from "shared/app-component-base";
import Swal from "sweetalert2";

@Component({
  selector: "app-role",
  templateUrl: "./role.component.html",
  styles: [
    `
      :host ::ng-deep .p-dialog .role-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ["./role.component.scss"],
})
export class RoleComponent extends AppComponentBase implements OnInit {
  roleDialog: boolean;
  role: RoleResult;
  selectedRoles: RoleResult[];
  submitted: boolean;
  roles: RoleResult[];

  constructor(
    // private roleService: MainService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private roleService: RoleService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.getRoles();
  }

  openNew() {
    this.role = {};
    this.submitted = false;
    this.roleDialog = true;
  }

  deleteSelectedRoles() {
    console.log(this.selectedRoles);
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected roles?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.roleService
          .deleteRole(
            this.selectedRoles[this.selectedRoles.length - 1]
              .master_hak_akses_id
          )
          .subscribe(
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
        this.selectedRoles = null;
        this.getRoles();
      },
    });
  }

  editRole(role) {
    this.role = { ...role };
    this.roleDialog = true;
  }

  deleteRole(role) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + role.nama + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.role = {};
        this.roleService.deleteRole(role.master_hak_akses_id).subscribe(
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
        this.getRoles();
      },
    });
  }

  hideDialog() {
    this.roleDialog = false;
    this.submitted = false;
  }

  saveRole() {
    this.submitted = true;
    console.log(this.role);
    if (this.role.nama.trim()) {
      if (this.role.master_hak_akses_id) {
        const model = new RoleModel();
        model.nama = this.role.nama;
        model.jenis_aplikasi = 3;
        model.master_hak_akses_id = this.role.master_hak_akses_id;
        this.roleService.updateRole(model).subscribe(
          (res) => {
            console.log(res);
            if (res.status == 0) {
              this.showMessage("Eror!", res.msg, "error");
            } else {
              this.showMessage(
                "Sukses!",
                res.msg + " - Berhasil mengedit",
                "success"
              );
            }
          },
          (error) => {
            this.showMessage("Eror!", error.message, "error");
          }
        );
      } else {
        const model = new RoleModel();
        model.nama = this.role.nama;
        model.jenis_aplikasi = 3;
        this.roleService.addRole(model).subscribe(
          (res) => {
            console.log(res);
            if (res.status == 0) {
              this.showMessage("Eror!", res.msg, "error");
            } else {
              this.showMessage(
                "Sukses!",
                res.msg + " - Berhasil menambahkan",
                "success"
              );
            }
          },
          (error) => {
            this.showMessage("Eror!", error.message, "error");
          }
        );
      }
      this.roleDialog = false;
      this.role = {};
      this.getRoles();
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].master_hak_akses_id == +id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = "";
    var chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getRoles() {
    this.roleService.getRoles().subscribe(
      (data) => {
        this.roles = data.result;
        console.log(data);
      },
      (error) => {
        Swal.fire({
          title: "Eror!",
          text: error.message,
          icon: "error",
          allowOutsideClick: false,
        });
      }
    );
  }
}
