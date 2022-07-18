import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "app/services/authentication.service";

@Component({
  selector: "app-notfound",
  templateUrl: "./notfound.component.html",
  styleUrls: ["./notfound.component.css"],
})
export class NotfoundComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
  }
}
