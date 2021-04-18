export interface KelasResult {
  id_master_kelas: number;
  nama: string;
}

export interface Kelas {
  status: number;
  msg: string;
  result: KelasResult[];
}
