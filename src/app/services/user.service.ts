import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterModel } from "app/model/register-model";
import { RoleResponse } from "app/model/role-response";
import { environment } from "environments/environment";
import { throwError } from "rxjs";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  getAllRole(): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(`${environment.apiUrlUser}/role`);
  }

  // Add user
  register(data: RegisterModel): Observable<any> {
    let API_URL = `${environment.apiUrlUser}/register`;
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
