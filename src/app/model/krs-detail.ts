export interface KrsDetailResult {
  detail_krs_id: number;
  krs_id: number;
  kode_matkul: string;
  nama_matkul: string;
  sks: number;
  dosen_pengampu: string;
  nip: string;
}

export interface KrsDetail {
  status: number;
  msg: string;
  result: KrsDetailResult[];
}
