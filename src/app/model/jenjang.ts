export interface JenjangResult {
  id_master_jenjang: number;
  nama: string;
}

export interface Jenjang {
  status: number;
  msg: string;
  result: JenjangResult[];
}
