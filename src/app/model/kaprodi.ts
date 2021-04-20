export interface KaprodiResult {
  kaprodi: string;
  nama: string;
}

export interface Kaprodi {
  status: number;
  msg: string;
  result: KaprodiResult[];
}
