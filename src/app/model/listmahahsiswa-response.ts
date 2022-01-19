import { ListMahasiswaResult } from "./listmahahsiswa-model";

export interface ListMahasiswaResponse {
  status: number;
  msg: string;
  result: ListMahasiswaResult[];
}
