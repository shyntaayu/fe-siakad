export interface IPKResult {
  IPK: number;
  totalSKS: number;
  sampai_semester: number;
}

export interface IPK {
  status: number;
  msg: string;
  result: IPKResult;
}
