import { Component, OnInit } from "@angular/core";
import { PrintService } from "./print.service";

@Component({
  selector: "app-main-print",
  templateUrl: "./print.component.html",
  styleUrls: ["./print.component.css"],
})
export class PrintComponent implements OnInit {
  constructor(public printService: PrintService) {}

  ngOnInit(): void {}
  onPrintInvoice() {
    const invoiceIds = ["101", "102"];
    this.printService.printDocument("invoice", invoiceIds);
  }
}
