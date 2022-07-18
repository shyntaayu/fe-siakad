export interface ListKh {
  detail_krs_id: number;
  krs_id: number;
  nim: string;
  status_matkul: number;
  semester: number;
  nama: string;
  nama_matkul: string;
  kode_matkul: string;
  sks: number;
  bobot: number;
  bobot_nilai_id: number;
  BatasNilaiAtas: number;
  batasNilaiBawah: number;
  nilai: string;
  indeks: number;
  predikat: string;
  nama_kaprodi: string;
}

export interface Khs {
  total_bobot: number;
  total_sks: number;
  ip: number;
  totalTempuhSKS: string;
  ipk: number;
  list_khs: ListKh[];
}
