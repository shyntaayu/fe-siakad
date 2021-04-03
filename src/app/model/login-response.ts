import { LoginResult } from "./login-resullt";

export interface LoginResponse {
  status: number;
  msg: string;
  result: LoginResult;
}
