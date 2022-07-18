export interface ProdiResult {
  kode_prodi: string;
  nama: string;
}

export interface Prodi {
  status: number;
  msg: string;
  result: ProdiResult[];
}
