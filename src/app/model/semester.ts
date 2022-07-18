export interface SemesterResult {
  nama: string;
  value: number;
}

export interface Semester {
  status: number;
  msg: string;
  result: SemesterResult[];
}
