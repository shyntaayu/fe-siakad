export interface DataPresensi {
  Alpha: number;
  Hadir: number;
  Sakit: number;
  Izin: number;
  Telat: number;
}

export interface Presensi {
  data_presensi: DataPresensi;
}

export interface PresensiPerKrsResult {
  nim: string;
  nama: string;
  presensi: Presensi;
  list_presensi_2: number[];
}

export interface PresensiPerKrs {
  status: number;
  msg: string;
  result: PresensiPerKrsResult[];
}
