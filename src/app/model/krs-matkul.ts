export interface KrsMatkulResult {
  kode_matkul: string;
  nama: string;
  sks: number;
  syarat: string;
  semester: string;
  status: string;
  keterangan?: any;
  krs_id: number;
  nip: string;
  status_semester: string;
  tahun_akademik: string;
  id_master_jenjang: number;
  kode_prodi: string;
  id_master_kelas: number;
  toleransi_keterlambatan: string;
  kaprodi: string;
  ketua_kelas?: any;
}

export interface KrsMatkul {
  status: number;
  msg: string;
  result: KrsMatkulResult[];
}
