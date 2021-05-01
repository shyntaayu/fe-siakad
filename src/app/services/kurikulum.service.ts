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
import { NilaiModel } from "app/model/nilai-model";
import { IPK } from "app/model/ipk";
import { KrsMatkul } from "app/model/krs-matkul";
@Injectable({
  providedIn: "root",
})
export class KurikulumService {
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient, private appConfig: AppConfig) {}

  // http://api.stimata.ac.id/kurikulum/public/matkul?jenis_aplikasi=web&status_semester=2&tahun_akademik=2020-2021
  getMatkulKRS(
    jenis_aplikasi,
    status_semester,
    tahun_akademik
  ): Observable<KrsMatkul> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("status_semester", status_semester);
    params = params.append("tahun_akademik", tahun_akademik);
    return this.http.get<KrsMatkul>(
      `${this.appConfig.apiUrlKurikulum}/matkul`,
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
