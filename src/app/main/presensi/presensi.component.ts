import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { MainService } from "../main.service";
import { Product } from "../model/product";
interface Animal {
  name: string;
  sound: string;
}
@Component({
  selector: "app-presensi",
  templateUrl: "./presensi.component.html",
  styleUrls: ["./presensi.component.css"],
  providers: [MessageService],
})
export class PresensiComponent implements OnInit {
  constructor(
    private productService: MainService,
    private messageService: MessageService
  ) {}

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

  selectedProduct1: Product;

  selectedProduct2: Product;

  selectedProduct3: Product;

  selectedProducts1: Product[];

  selectedProducts2: Product[];

  selectedProducts3: Product[];

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
}
