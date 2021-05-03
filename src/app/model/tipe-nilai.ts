export interface TipeNilaiResult {
  idmaster_tipe_nilai: number;
  nama: string;
  bobot: number;
  wajib: string;
}

export interface TipeNilai {
  status: number;
  msg: string;
  result: TipeNilaiResult[];
}
