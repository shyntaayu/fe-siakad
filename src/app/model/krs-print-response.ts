import { KrsPrintResult } from "./krs-print-result";

export interface KrsPrintResponse {
  status: number;
  msg: string;
  result: KrsPrintResult[];
}
