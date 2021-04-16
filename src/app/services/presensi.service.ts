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
import { KrsResponse } from "app/model/krs-response";
import { KrsPrintResponse } from "app/model/krs-print-response";
import { KrsHeaderResponse } from "app/model/krs-header-response";
import { PresensiResponse } from "app/model/presensi";
@Injectable({
  providedIn: "root",
})
export class PresensiService {
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient, private appConfig: AppConfig) {}

  getLaporanPresensi(
    jenis_aplikasi,
    nim,
    semester
  ): Observable<PresensiResponse> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("nim", nim);
    params = params.append("semester", semester);
    return this.http.get<PresensiResponse>(
      `${this.appConfig.apiUrlPresensi}/presensi/laporan/absen`,
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
