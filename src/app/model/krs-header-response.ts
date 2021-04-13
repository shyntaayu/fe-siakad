import { KrsHeaderResult } from "./krs-header-result";

export interface KrsHeaderResponse {
  status: number;
  msg: number;
  result: KrsHeaderResult[];
}
