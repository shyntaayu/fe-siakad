import { MahasiswaResult } from "./mahasiswa-result";

export interface MahasiswaResponse {
  status: number;
  msg: string;
  result: MahasiswaResult[];
}
