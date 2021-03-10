import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService, SelectItem } from "primeng/api";
import { MainService } from "../main.service";
import { Product } from "../model/product";

@Component({
  selector: "app-rekap-presensi",
  templateUrl: "./rekap-presensi.component.html",
  styleUrls: ["./rekap-presensi.component.css"],
})
export class RekapPresensiComponent implements OnInit {
  profileForm: FormGroup;
  options: string[] = ["One", "Two", "Three"];
  products: Product[];
  selectedProduct2: Product;
  products2: Product[];
  clonedProducts: { [s: string]: Product } = {};
  statuses: SelectItem[];

  constructor(
    private fb: FormBuilder,
    private productService: MainService,
    private messageService: MessageService
  ) {
    this.profileForm = this.fb.group({
      jenis: ["", Validators.required],
      semester: ["", Validators.required],
      tahun: ["", Validators.required],
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
}
