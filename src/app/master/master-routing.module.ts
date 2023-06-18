import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "app/helpers/auth.guard";
import { MahasiswaComponent } from "app/master/mahasiswa/mahasiswa.component";
import { RoleComponent } from "./role/role.component";
import { UserComponent } from "./user/user.component";

const routes: Routes = [
  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { permission: [1] },
  },
  {
    path: "role",
    component: RoleComponent,
    canActivate: [AuthGuard],
    data: { permission: [1] },
  },
  {
    path: "mahasiswa",
    component: MahasiswaComponent,
    canActivate: [AuthGuard],
    data: { permission: [1] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
