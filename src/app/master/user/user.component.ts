import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { RegisterModel } from "app/model/register-model";
import { AuthenticationService } from "app/services/authentication.service";
import { UserService } from "app/services/user.service";
import Swal from "sweetalert2";
import { DynamicFormBuilderComponent } from "../dynamic-form-builder/dynamic-form-builder.component";

export class DDR {
  key: string;
  label: string;
}

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
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

  public fields: any[] = [
    {
      type: "text",
      name: "username",
      label: "User Name",
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
    // {
    //   type: "text",
    //   name: "email",
    //   label: "Email",
    //   value: "",
    //   required: true,
    // },

    // {
    //   type: "file",
    //   name: "picture",
    //   label: "Picture",
    //   required: true,
    //   onUpload: this.onUpload.bind(this),
    // },
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
    // {
    //   type: "radio",
    //   name: "country",
    //   label: "Country",
    //   value: "in",
    //   required: true,
    //   options: [
    //     { key: "m", label: "Male" },
    //     { key: "f", label: "Female" },
    //   ],
    // },
    // {
    //   type: "checkbox",
    //   name: "hobby",
    //   label: "Hobby",
    //   required: true,
    //   options: [
    //     { key: "f", label: "Fishing" },
    //     { key: "c", label: "Cooking" },
    //   ],
    // },
  ];
  //end option 2

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
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
  }

  ngOnInit(): void {
    this.getUsers();
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
    model.jenis_aplikasi = 1;
    model.password = q.password;
    model.penginput = this.authenticationService.userValue["username"];
    model.role = q.role;
    model.status = q.status;
    model.username = q.username;
    this.userService.register(model).subscribe((res) => {
      console.log(res);
      if (res.status == 0) {
        Swal.fire({
          title: "Eror!",
          text: res.msg,
          icon: "error",
          allowOutsideClick: false,
        });
      } else {
        Swal.fire({
          title: "Sukses!",
          text: res.msg + " - Berhasil menambahkan",
          icon: "success",
          allowOutsideClick: false,
        }).then(() => {
          this.modalReference.close();
        });
        // this.child.reset();
      }
      this.loading = false;
    });
  }

  getRole() {
    this.userService.getAllRole().subscribe((data) => {
      data.result.map((x) => {
        let a = new DDR();
        a.key = x.master_hak_akses_id.toString();
        a.label = x.nama;
        this.listRole.push(a);
      });
    });
    return this.listRole;
  }

  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data.result;
      console.log(data);
    });
  }

  open(content) {
    this.modalReference = this.modalService.open(content, { size: "lg" });
  }
  close() {
    this.modalReference.close();
  }

  onRowUnselect(a) {}
  onRowSelect(a) {}
}
