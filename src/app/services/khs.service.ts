import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AppConfig } from "app/model/app-config";
import { Khs } from "app/model/khs";
import { SalinanNilai } from "app/model/salinan-nilai";
@Injectable({
  providedIn: "root",
})
export class KhsService {
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient, private appConfig: AppConfig) {}

  // http://localhost:1007/khs?jenis_aplikasi=web&nim=17.51.0018&semester=8
  getKhs(jenis_aplikasi, nim, semester): Observable<Khs> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("nim", nim);
    params = params.append("semester", semester);
    return this.http.get<Khs>(`${this.appConfig.apiUrlKhs}/khs`, {
      params: params,
    });
  }

  // http://localhost:1007/khs/salinannilai?jenis_aplikasi=web&nim=17.51.0018
  getSalinanNilai(jenis_aplikasi, nim): Observable<SalinanNilai> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("nim", nim);
    return this.http.get<SalinanNilai>(
      `${this.appConfig.apiUrlKhs}/khs/salinannilai`,
      {
        params: params,
      }
    );
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
