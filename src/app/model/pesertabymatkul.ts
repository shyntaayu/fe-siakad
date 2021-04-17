export interface PesertaByMatkulResult {
  detail_krs_id: number;
  krs_id: number;
  nim: string;
  nama: string;
}

export interface PesertaByMatkul {
  status: number;
  msg: string;
  result: PesertaByMatkulResult[];
}
