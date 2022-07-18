export interface TahunAkademikResult {
  tahun_akademik: string;
}

export interface TahunAkademik {
  status: number;
  msg: string;
  result: TahunAkademikResult[];
}
