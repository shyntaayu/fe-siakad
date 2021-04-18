import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "app/model/app-config";
import { MahasiswaResponse } from "app/model/mahasiswa-response";
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
}
