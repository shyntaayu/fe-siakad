import { Injectable, Injector } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "environments/environment";
import { CookieService } from "ngx-cookie-service";
import { LoginResponse } from "app/model/login-response";
import { AppComponentBase } from "shared/app-component-base";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService extends AppComponentBase {
  private userSubject: BehaviorSubject<LoginResponse>;
  public user: Observable<LoginResponse>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService,
    private injector: Injector
  ) {
    super(injector);
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
    return this.userSubject.getValue();
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrlUser}/login`, { username, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('userMe', JSON.stringify(user));

          if (user.status == 0) {
            // this.showNotification("top", "right", user.msg, "danger");
            Swal.fire({
              title: "Eror!",
              text: user.msg,
              icon: "error",
              allowOutsideClick: false,
            });
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
}
