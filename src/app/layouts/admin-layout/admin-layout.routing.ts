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
import { KartuUjianComponent } from "app/main/kartu-ujian/kartu-ujian.component";
import { TranskripNilaiComponent } from "app/main/transkrip-nilai/transkrip-nilai.component";
import { AddNilaiComponent } from "app/main/add-nilai/add-nilai.component";
import { PaketKrsComponent } from "app/main/paket-krs/paket-krs.component";

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
    data: { permission: [1, 8, 2, 3] },
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
  {
    path: "kartu-ujian",
    component: KartuUjianComponent,
    canActivate: [AuthGuard],
    data: { permission: [1] },
  },
  {
    path: "rekap-presensi",
    component: RekapPresensiComponent,
    canActivate: [AuthGuard],
    data: { permission: [1] },
  },
  {
    path: "input-nilai",
    component: InputNilaiComponent,
    canActivate: [AuthGuard],
    data: { permission: [1, 2, 3] },
  },
  {
    path: "salinan-nilai",
    component: SalinanNilaiComponent,
    canActivate: [AuthGuard],
    data: { permission: [1] },
  },
  {
    path: "khs",
    component: KhsComponent,
    canActivate: [AuthGuard],
    data: { permission: [1] },
  },
  {
    path: "krs",
    component: KrsComponent,
    canActivate: [AuthGuard],
    data: { permission: [1] },
  },
  {
    path: "presensi",
    component: PresensiComponent,
    canActivate: [AuthGuard],
    data: { permission: [1] },
  },
  {
    path: "transkrip-nilai",
    component: TranskripNilaiComponent,
    canActivate: [AuthGuard],
    data: { permission: [1] },
  },
  {
    path: "add-nilai",
    component: AddNilaiComponent,
    canActivate: [AuthGuard],
    data: { permission: [1, 8] },
  },
  {
    path: "paket-krs",
    component: PaketKrsComponent,
    canActivate: [AuthGuard],
    data: { permission: [1] },
  },
];
