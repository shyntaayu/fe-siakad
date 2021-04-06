import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { PrintService } from "./print.service";

@Component({
  selector: "app-main-print",
  templateUrl: "./print.component.html",
  styleUrls: ["./print.component.css"],
})
export class PrintComponent implements OnInit {
  title;
  constructor(
    public printService: PrintService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRouter();
  }
  onPrintInvoice() {
    // const invoiceIds = ["101", "102"];
    // this.printService.printDocument("presensi", invoiceIds);
    this.printService.onDataReady();
  }

  getRouter() {
    console.log(this._router.url);
    let urlArray = this._router.url.split("/");
    let a = urlArray[urlArray.length - 2];
    this.title = a.replace("-", " ");
    console.log(this.title);
  }
}
