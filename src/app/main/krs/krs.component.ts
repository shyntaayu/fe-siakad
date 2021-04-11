import { Component, Injector, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { KrsService } from "app/services/krs.service";
import { MessageService, SelectItem } from "primeng/api";
import { AppComponentBase } from "shared/app-component-base";
import { MainService } from "../main.service";
import { Product } from "../model/product";

@Component({
  selector: "app-krs",
  templateUrl: "./krs.component.html",
})
export class KrsComponent extends AppComponentBase implements OnInit {
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
  constructor(
    private krsService: KrsService,
    private fb: FormBuilder,
    private productService: MainService,
    private messageService: MessageService,
    injector: Injector
  ) {
    super(injector);
    this.profileForm = this.fb.group({
      jenjang: ["", Validators.required],
      semester: ["", Validators.required],
      tahun: ["", Validators.required],
      jurusan: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    // this.getTahun();
    // this.getSemester();
    // this.getProdi();
    // this.getJenjang();
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
    // TODO: Use EventEmitter with form value
    this.loading = true;
    console.warn(this.profileForm.value);
  }
}
