import { RoleResult } from "./role-result";

export interface RoleResponse {
  status: number;
  msg: string;
  result: RoleResult[];
}
