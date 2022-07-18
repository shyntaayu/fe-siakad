export interface SalinanNilaiResult {
  kode_matkul: string;
  nama: string;
  sks: number;
  nilai: string;
  nilaiAsli: any;
}

export interface SalinanNilai {
  status: number;
  msg: string;
  result: SalinanNilaiResult[];
}
