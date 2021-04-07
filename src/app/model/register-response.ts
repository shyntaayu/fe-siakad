import { RegisterResult } from "./register-result";

export interface RegisterResponse {
  status: number;
  msg: string;
  result: RegisterResult[];
}
