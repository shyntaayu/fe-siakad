export interface ListNilai {
  idnilai_mhs: number;
  detail_krs_id: number;
  idmaster_tipe_nilai: number;
  nilai: string;
  nilai_abjad: string;
  predikat: string;
  indeks: number;
}

export interface NilaiResult {
  detail_krs_id: number;
  krs_id: number;
  nim: string;
  semester: number;
  status_matkul: number;
  nama: string;
  totalKRS: string;
  ket_status_matkul: string;
  list_nilai: ListNilai[];
}

export interface NilaiList {
  status: number;
  msg: string;
  result: NilaiResult[];
}
