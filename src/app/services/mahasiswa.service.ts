import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "app/model/app-config";
import { MahasiswaByNim } from "app/model/mahasiswa-by-nim";
import { MahasiswaResponse } from "app/model/mahasiswa-response";
import { SemesterByNim } from "app/model/semester-by-nim";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MahasiswaService {
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient, private appConfig: AppConfig) {}

  getMahasiswas(
    jenis_aplikasi,
    id_master_jenjang,
    kode_prodi
  ): Observable<MahasiswaResponse> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("id_master_jenjang", id_master_jenjang);
    params = params.append("kode_prodi", kode_prodi);
    return this.http.get<MahasiswaResponse>(
      `${this.appConfig.apiUrlMahasiswa}/mahasiswa`,
      { params: params }
    );
  }

  getMahasiswas2(
    jenis_aplikasi,
    id_master_jenjang,
    kode_prodi,
    semester,
    id_master_kelas
  ): Observable<MahasiswaResponse> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("id_master_jenjang", id_master_jenjang);
    params = params.append("kode_prodi", kode_prodi);
    params = params.append("semester", semester);
    params = params.append("id_master_kelas", id_master_kelas);
    return this.http.get<MahasiswaResponse>(
      `${this.appConfig.apiUrlMahasiswa}/mahasiswa2`,
      { params: params }
    );
  }

  // http://localhost:1001/mahasiswa/nim?jenis_aplikasi=web&nim=17.51.001
  getMahasiswaByNim(jenis_aplikasi, nim): Observable<MahasiswaByNim> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("nim", nim);
    return this.http.get<MahasiswaByNim>(
      `${this.appConfig.apiUrlMahasiswa}/mahasiswa/nim`,
      { params: params }
    );
  }

  // http://localhost:1001/mahasiswa/semester?jenis_aplikasi=web&nim=17.51.0018
  getSemesterByNim(jenis_aplikasi, nim): Observable<SemesterByNim> {
    let params = new HttpParams();
    params = params.append("jenis_aplikasi", jenis_aplikasi);
    params = params.append("nim", nim);
    return this.http.get<SemesterByNim>(
      `${this.appConfig.apiUrlMahasiswa}/mahasiswa/semester`,
      { params: params }
    );
  }
}
