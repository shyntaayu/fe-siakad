import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { KhsComponent } from "app/main/khs/khs.component";
import { SalinanNilaiComponent } from "app/main/salinan-nilai/salinan-nilai.component";
import { InputNilaiComponent } from "app/main/input-nilai/input-nilai.component";
import { RekapPresensiComponent } from "app/main/rekap-presensi/rekap-presensi.component";
import { PresensiComponent } from "app/main/presensi/presensi.component";
import { AuthGuard } from "app/helpers/auth.guard";
import { KrsComponent } from "app/main/krs/krs.component";

export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "table-list",
    component: TableListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "typography",
    component: TypographyComponent,
    canActivate: [AuthGuard],
  },
  { path: "icons", component: IconsComponent, canActivate: [AuthGuard] },
  { path: "maps", component: MapsComponent, canActivate: [AuthGuard] },
  {
    path: "notifications",
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  { path: "upgrade", component: UpgradeComponent, canActivate: [AuthGuard] },
  { path: "presensi", component: PresensiComponent, canActivate: [AuthGuard] },
  {
    path: "rekap-presensi",
    component: RekapPresensiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "input-nilai",
    component: InputNilaiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "salinan-nilai",
    component: SalinanNilaiComponent,
    canActivate: [AuthGuard],
  },
  { path: "khs", component: KhsComponent, canActivate: [AuthGuard] },
  { path: "krs", component: KrsComponent, canActivate: [AuthGuard] },
];
