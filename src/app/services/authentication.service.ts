import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "environments/environment";
import { CookieService } from "ngx-cookie-service";
import { LoginResponse } from "app/model/login-response";
declare var $: any;

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<LoginResponse>;
  public user: Observable<LoginResponse>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    // this.userSubject = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('userMe')));
    console.log(this.cookieService.check("userMe"));
    if (this.cookieService.check("userMe")) {
      this.cookieService.get("userMe");
      this.userSubject = new BehaviorSubject<LoginResponse>(
        JSON.parse(this.cookieService.get("userMe"))
      );
      this.user = this.userSubject.asObservable();
    } else {
      this.userSubject = new BehaviorSubject<LoginResponse>(null);
    }
  }

  public get userValue(): LoginResponse {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrlUser}/login`, { username, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('userMe', JSON.stringify(user));

          if (user.status == 0) {
            this.showNotification("top", "right", user.msg, "danger");
          } else {
            this.userSubject.next(user.result);
            this.cookieService.set(
              "userMe",
              JSON.stringify(user.result),
              new Date(new Date().getTime() + 1 * 86400000) // 1 day
            );
            this.showNotification("top", "right", "Login sukses", "success");
          }
          return user.result;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('userMe');
    this.cookieService.delete("userMe");
    this.userSubject.next(null);
    this.router.navigate(["/login"]);
  }

  showNotification(from, align, message, type) {
    // const type = ["", "info", "success", "warning", "danger"];

    const color = Math.floor(Math.random() * 4 + 1);

    $.notify(
      {
        icon: "notifications",
        message: message,
      },
      {
        type: type,
        timer: 4000,
        placement: {
          from: from,
          align: align,
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
      }
    );
  }
}
