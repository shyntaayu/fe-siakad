import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { MainService } from "../main.service";
import { Product } from "../model/product";

@Component({
  selector: "app-salinan-nilai",
  templateUrl: "./salinan-nilai.component.html",
  styleUrls: ["./salinan-nilai.component.css"],
})
export class SalinanNilaiComponent implements OnInit {
  profileForm: FormGroup;
  options: string[] = ["One", "Two", "Three"];
  products: Product[];
  selectedProduct2;

  constructor(
    private fb: FormBuilder,
    private productService: MainService,
    private messageService: MessageService
  ) {
    this.profileForm = this.fb.group({
      nim: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.productService.getProductsSmall().then((data) => {
      this.products = data;
      console.log(data);
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
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
