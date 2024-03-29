import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "environments/environment";
import { TahunAkademik } from "app/model/tahun_akademik";
import { Semester } from "app/model/semester";
import { Prodi } from "app/model/prodi";
import { Jenjang } from "app/model/jenjang";
import { AppConfig } from "app/model/app-config";
import { KrsResponse } from "app/model/krs-response";
import { KrsPrintResponse } from "app/model/krs-print-response";
import { KrsHeaderResponse } from "app/model/krs-header-response";
import { Kelas } from "app/model/kelas";
import { KrsDetail } from "app/model/krs-detail";
import { PesertaByMatkul } from "app/model/pesertabymatkul";
import { DosenByMatkul } from "app/model/dosen-by-matkul";
import { Ruangan } from "app/model/ruangan";
import { Kaprodi } from "app/model/kaprodi";
import { ModelAddKRS } from "app/model/add-krs";
@Injectable({
  providedIn: "root",
})
export class KrsService {
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient, private appConfig: AppConfig) {}

  // Add sanitasi
  //   addSanitasi(data: Sanitasi): Observable<any> {
  //     let API_URL = `${AppConsts.apiUrlKrs}/master/sanitasi`;
  //     return this.http.post(API_URL, data)
  //       .pipe(
  //         catchError(this.errorMgmt)
  //       )
  //   }

  //   // Get all sanitasi
  //   getAllSanitasi(): Observable<Sanitasiresponse> {
  //     return this.http.get<Sanitasiresponse>(`${AppConsts.apiUrlKrs}/master/sanitasi`);
  //   }

  // Get sanitasi
  getSanitasi(id): Observable<any> {
    let API_URL = `${this.appConfig.apiUrlKrs}/master/sanitasi/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update sanitasi
  updateSanitasi(id, data): Observable<any> {
    let API_URL = `${this.appConfig.apiUrlKrs}/master/sanitasi/${id}`;
    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete sanitasi
  deleteSanitasi(id): Observable<any> {
    var API_URL = `${this.appConfig.apiUrlKrs}/master/sanitasi/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.errorMgmt));
  }

  getAllTahun(): Observable<TahunAkademik> {
    return this.http.get<TahunAkademik>(
      `${this.appConfig.apiUrlKrs}/dropdown/tahun`
    );
  }

  getAllSemester(): Observable<Semester> {
    return this.http.get<Semester>(
      `${this.appConfig.apiUrlKrs}/dropdown/semester`
    );
  }
  getAllProdi(): Observable<Prodi> {
    return this.http.get<Prodi>(`${this.appConfig.apiUrlKrs}/dropdown/prodi`);
  }
  getAllJenjang(): Observable<Jenjang> {
    return this.http.get<Jenjang>(
      `${this.appConfig.apiUrlKrs}/dropdown/jenjang`
    );
  }

  getKrs(
    jenis_aplikasi,
    nim,
    tahun_akademik,
    status_semester,
    id_master_jenjang,
    kode_prodi,
    id_master_kelas?
  ): Observable<KrsResponse> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("nim", nim);
    params = params.append("tahun_akademik", tahun_akademik);
    params = params.append("status_semester", status_semester);
    params = params.append("id_master_jenjang", id_master_jenjang);
    params = params.append("kode_prodi", kode_prodi);
    // params = params.append("id_master_kelas", id_master_kelas);
    return this.http.get<KrsResponse>(
      `${this.appConfig.apiUrlKrs}/krs/mahasiswa`,
      {
        params: params,
      }
    );
  }

  getKrs2(jenis_aplikasi, nim, semester): Observable<KrsResponse> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("nim", nim);
    params = params.append("semester", semester);
    return this.http.get<KrsResponse>(
      `${this.appConfig.apiUrlKrs}/krs/mahasiswa`,
      {
        params: params,
      }
    );
  }

  getKrsBody(jenis_aplikasi, nim, semester): Observable<KrsPrintResponse> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("nim", nim);
    params = params.append("semester", semester);
    return this.http.get<KrsPrintResponse>(
      `${this.appConfig.apiUrlKrs}/krs/mahasiswa/body`,
      {
        params: params,
      }
    );
  }

  getKrsHeader(nim): Observable<KrsHeaderResponse> {
    let params = new HttpParams();
    params = params.append("nim", nim);
    return this.http.get<KrsHeaderResponse>(
      `${this.appConfig.apiUrlKrs}/krs/mahasiswa/header`,
      {
        params: params,
      }
    );
  }

  getAllKelas(): Observable<Kelas> {
    return this.http.get<Kelas>(`${this.appConfig.apiUrlKrs}/dropdown/kelas`);
  }

  // http://localhost:1003/krs/detail?jenis_aplikasi=web&tahun_akademik=2020-2021&status_semester=2&id_master_jenjang=1&kode_prodi=K51&id_master_kelas=2
  getKrsDetail(
    jenis_aplikasi,
    tahun_akademik,
    status_semester,
    id_master_jenjang,
    kode_prodi,
    id_master_kelas
  ): Observable<KrsDetail> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("tahun_akademik", tahun_akademik);
    params = params.append("status_semester", status_semester);
    params = params.append("id_master_jenjang", id_master_jenjang);
    params = params.append("kode_prodi", kode_prodi);
    params = params.append("id_master_kelas", id_master_kelas);
    return this.http.get<KrsDetail>(`${this.appConfig.apiUrlKrs}/krs/detail`, {
      params: params,
    });
  }

  // http://localhost:1003/krs/peserta?jenis_aplikasi=web&krs_id=7&tahun_akademik=2020-2021&status_semester=2&id_master_jenjang=1&kode_prodi=K51&id_master_kelas=2

  getPesertaByMatkul(
    jenis_aplikasi,
    krs_id,
    tahun_akademik,
    status_semester,
    id_master_jenjang,
    kode_prodi,
    id_master_kelas
  ): Observable<PesertaByMatkul> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("krs_id", krs_id);
    params = params.append("tahun_akademik", tahun_akademik);
    params = params.append("status_semester", status_semester);
    params = params.append("id_master_jenjang", id_master_jenjang);
    params = params.append("kode_prodi", kode_prodi);
    params = params.append("id_master_kelas", id_master_kelas);
    return this.http.get<PesertaByMatkul>(
      `${this.appConfig.apiUrlKrs}/krs/peserta`,
      {
        params: params,
      }
    );
  }

  // http://localhost:1003/krs/dosen/matkul?jenis_aplikasi=web&kode_matkul=Mkb0-3101
  getDosenByMatkul(jenis_aplikasi, kode_matkul): Observable<DosenByMatkul> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("kode_matkul", kode_matkul);
    return this.http.get<DosenByMatkul>(
      `${this.appConfig.apiUrlKrs}/krs/dosen/matkul`,
      {
        params: params,
      }
    );
  }

  getAllRuangan(): Observable<Ruangan> {
    return this.http.get<Ruangan>(
      `${this.appConfig.apiUrlKrs}/dropdown/ruangan`
    );
  }

  getAllKaprodi(): Observable<Kaprodi> {
    return this.http.get<Kaprodi>(
      `${this.appConfig.apiUrlKrs}/dropdown/kaprodi`
    );
  }

  addKrs(data: ModelAddKRS): Observable<any> {
    let API_URL = `${this.appConfig.apiUrlKrs}/krs/mahasiswa`;
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
    return throwError(errorMessage);
  }
}
