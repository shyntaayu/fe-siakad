import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "environments/environment";
import { TahunAkademik } from "app/model/tahun_akademik";
import { Semester } from "app/model/semester";
import { Prodi } from "app/model/prodi";
import { Jenjang } from "app/model/jenjang";
@Injectable({
  providedIn: "root",
})
export class KrsService {
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  // Add sanitasi
  //   addSanitasi(data: Sanitasi): Observable<any> {
  //     let API_URL = `${environment.apiUrlKrs}/master/sanitasi`;
  //     return this.http.post(API_URL, data)
  //       .pipe(
  //         catchError(this.errorMgmt)
  //       )
  //   }

  //   // Get all sanitasi
  //   getAllSanitasi(): Observable<Sanitasiresponse> {
  //     return this.http.get<Sanitasiresponse>(`${environment.apiUrlKrs}/master/sanitasi`);
  //   }

  // Get sanitasi
  getSanitasi(id): Observable<any> {
    let API_URL = `${environment.apiUrlKrs}/master/sanitasi/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update sanitasi
  updateSanitasi(id, data): Observable<any> {
    let API_URL = `${environment.apiUrlKrs}/master/sanitasi/${id}`;
    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete sanitasi
  deleteSanitasi(id): Observable<any> {
    var API_URL = `${environment.apiUrlKrs}/master/sanitasi/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.errorMgmt));
  }

  getAllTahun(): Observable<TahunAkademik> {
    return this.http.get<TahunAkademik>(
      `${environment.apiUrlKrs}/dropdown/tahun`
    );
  }

  getAllSemester(): Observable<Semester> {
    return this.http.get<Semester>(
      `${environment.apiUrlKrs}/dropdown/semester`
    );
  }
  getAllProdi(): Observable<Prodi> {
    return this.http.get<Prodi>(`${environment.apiUrlKrs}/dropdown/prodi`);
  }
  getAllJenjang(): Observable<Jenjang> {
    return this.http.get<Jenjang>(`${environment.apiUrlKrs}/dropdown/jenjang`);
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
