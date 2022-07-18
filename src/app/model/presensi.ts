export interface DataPresensi {
  Alpha: number;
  Hadir: number;
  Sakit: number;
  Izin: number;
}

export interface PresensiResult {
  matakuliah: string;
  kodematkul: string;
  sks: number;
  status_matkul: number;
  data_presensi: DataPresensi;
}

export interface PresensiResponse {
  status: number;
  msg: string;
  result: PresensiResult[];
}
