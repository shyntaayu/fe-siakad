import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PrintService } from "../print.service";

@Component({
  selector: "app-viewpresensi",
  templateUrl: "./viewpresensi.component.html",
  styleUrls: ["./viewpresensi.component.css"],
})
export class ViewpresensiComponent implements OnInit {
  invoiceIds: string[];
  invoiceDetails: Promise<any>[];

  constructor(route: ActivatedRoute, private printService: PrintService) {
    this.invoiceIds = route.snapshot.params["invoiceIds"].split(",");
  }

  ngOnInit() {
    this.invoiceDetails = this.invoiceIds.map((id) =>
      this.getInvoiceDetails(id)
    );
    Promise.all(this.invoiceDetails).then(() =>
      this.printService.onDataReady()
    );
  }

  getInvoiceDetails(invoiceId) {
    const amount = Math.floor(Math.random() * 100);
    return new Promise((resolve) =>
      setTimeout(() => resolve({ amount }), 1000)
    );
  }
}
