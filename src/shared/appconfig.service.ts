import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "app/model/app-config";

const SETTINGS_LOCATION = "assets/appconfig.json";

@Injectable({
  providedIn: "root",
})
export class AppConfigService extends AppConfig {
  constructor(private http: HttpClient) {
    super();
  }

  public loadConfig() {
    this.http
      .get<AppConfig>(SETTINGS_LOCATION)
      .toPromise()
      .then((result) => {
        this.apiUrlKrs = result.apiUrlKrs;
        this.apiUrlMahasiswa = result.apiUrlMahasiswa;
        this.apiUrlUser = result.apiUrlUser;
        this.jenisAplikasi = result.jenisAplikasi;
        this.jenisAplikasiString = result.jenisAplikasiString;
        this.apiUrlPresensi = result.apiUrlPresensi;
        this.apiUrlKhs = result.apiUrlKhs;
        this.apiUrlKurikulum = result.apiUrlKurikulum;
        return Promise.resolve(result);
      });
  }
}
