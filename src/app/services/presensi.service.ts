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
import { PresensiPerKrs } from "app/model/presensi-per-krs";
@Injectable({
  providedIn: "root",
})
export class PresensiService {
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient, private appConfig: AppConfig) {}

  // http://localhost:1008/presensi/laporan/absen?jenis_aplikasi=web&nim=17.51.0018&semester=8
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

  // http://localhost:1008/presensi/laporan/absen/krs?jenis_aplikasi=web&krs_id=7&list_presensi=0
  getPresensiMahasiswaPerMatkul(
    jenis_aplikasi,
    krs_id,
    list_presensi
  ): Observable<PresensiPerKrs> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("krs_id", krs_id);
    params = params.append("list_presensi", list_presensi);
    return this.http.get<PresensiPerKrs>(
      `${this.appConfig.apiUrlPresensi}/presensi/laporan/absen/krs`,
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
