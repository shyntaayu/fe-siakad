import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "app/model/app-config";
import { RegisterModel } from "app/model/register-model";
import { RegisterResponse } from "app/model/register-response";
import { RoleResponse } from "app/model/role-response";
import { environment } from "environments/environment";
import { throwError } from "rxjs";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient, private appConfig: AppConfig) {}

  getAllRole(): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(`${this.appConfig.apiUrlUser}/role`);
  }

  getUsers(): Observable<RegisterResponse> {
    return this.http.get<RegisterResponse>(
      `${this.appConfig.apiUrlUser}/register`
    );
  }

  // Add user
  register(data: RegisterModel): Observable<any> {
    let API_URL = `${this.appConfig.apiUrlUser}/register`;
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }

  // Update user
  updateUser(data: RegisterModel): Observable<any> {
    let API_URL = `${this.appConfig.apiUrlUser}/register`;
    return this.http.put(API_URL, data).pipe(catchError(this.errorMgmt));
  }

  // Delete user
  deleteUser(id): Observable<any> {
    let API_URL = `${this.appConfig.apiUrlUser}/register`;
    const options = {
      body: { login_id: id },
    };
    return this.http
      .request("DELETE", API_URL, options)
      .pipe(catchError(this.errorMgmt));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
