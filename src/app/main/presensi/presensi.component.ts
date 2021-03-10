import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";
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
export class PresensiComponent implements OnInit {
  profileForm: FormGroup;

  animalControl = new FormControl("", Validators.required);
  selectFormControl = new FormControl("", Validators.required);
  animals: Animal[] = [
    { name: "Dog", sound: "Woof!" },
    { name: "Cat", sound: "Meow!" },
    { name: "Cow", sound: "Moo!" },
    { name: "Fox", sound: "Wa-pa-pa-pa-pa-pa-pow!" },
  ];

  products: Product[];
  first = 0;

  rows = 10;
  dosen;
  semester = 8;
  selectedProduct2: Product;
  constructor(
    private productService: MainService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      dosen: ["", Validators.required],
      semester: ["", Validators.required],
      jam: ["", Validators.required],
      tahun: ["", Validators.required],
      jurusan: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.productService.getProductsSmall().then((data) => {
      this.products = data;
      console.log(data);
    });
  }

  selectProduct(product: Product) {
    this.messageService.add({
      severity: "info",
      summary: "Product Selected",
      detail: product.name,
    });
  }

  onRowSelect(event) {
    this.messageService.add({
      severity: "info",
      summary: "Product Selected",
      detail: event.data.name,
    });
  }

  onRowUnselect(event) {
    this.messageService.add({
      severity: "info",
      summary: "Product Unselected",
      detail: event.data.name,
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.products
      ? this.first === this.products.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.products ? this.first === 0 : true;
  }
  getDosen(event) {
    console.log(event);
  }
  exe_selectedTermCodeChange(a) {
    console.log(a);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  get f() {
    return this.profileForm.controls;
  }

  options: string[] = ["One", "Two", "Three"];

  selectedValue: string;
  selectedCar: string;

  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" },
  ];
}
