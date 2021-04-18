export interface RuanganResult {
  ruangan_id: number;
  nama: string;
}

export interface Ruangan {
  status: number;
  msg: string;
  result: RuanganResult[];
}
