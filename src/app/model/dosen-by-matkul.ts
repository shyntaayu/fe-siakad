export interface DosenByMatkulResult {
  krs_id: number;
  nip: string;
  kode_matkul: string;
  status_semester: string;
  tahun_akademik: string;
  id_master_jenjang: number;
  kode_prodi: string;
  id_master_kelas: number;
  toleransi_keterlambatan: string;
  kaprodi: string;
  ketua_kelas?: any;
  nama: string;
}

export interface DosenByMatkul {
  status: number;
  msg: string;
  result: DosenByMatkulResult[];
}
