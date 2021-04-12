import { KrsResult } from "./krs-result";

export interface KrsResponse {
  status: number;
  msg: string;
  result: KrsResult[];
}
