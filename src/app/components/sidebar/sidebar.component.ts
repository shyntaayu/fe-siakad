import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "app/services/authentication.service";
import { AppMenuItem } from "./app-menu-item";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  hidden: boolean;
  parent: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "dashboard",
    class: "",
    hidden: false,
    parent: "dashboard",
  },
  {
    path: "/kartu-ujian",
    title: "Kartu Ujian",
    icon: "list_alt",
    class: "",
    hidden: false,
    parent: "none",
  },
  {
    path: "/rekap-presensi",
    title: "Rekap Presensi",
    icon: "folder_open",
    class: "",
    hidden: false,
    parent: "none",
  },
  {
    path: "/input-nilai",
    title: "Revisi Nilai",
    icon: "create",
    class: "",
    hidden: false,
    parent: "none",
  },
  {
    path: "/salinan-nilai",
    title: "Salinan Nilai",
    icon: "content_paste",
    class: "",
    hidden: false,
    parent: "none",
  },
  {
    path: "/khs",
    title: "KHS",
    icon: "file_copy",
    class: "",
    hidden: false,
    parent: "none",
  },
  {
    path: "/krs",
    title: "KRS",
    icon: "task_alt",
    class: "",
    hidden: false,
    parent: "none",
  },
  {
    path: "/user-profile",
    title: "User Profile",
    icon: "person",
    class: "",
    hidden: false,
    parent: "dashboard",
  },
  {
    path: "/table-list",
    title: "Table List",
    icon: "content_paste",
    class: "",
    hidden: true,
    parent: "dashboard",
  },
  {
    path: "/typography",
    title: "Typography",
    icon: "library_books",
    class: "",
    hidden: true,
    parent: "dashboard",
  },
  {
    path: "/icons",
    title: "Icons",
    icon: "bubble_chart",
    class: "",
    hidden: true,
    parent: "dashboard",
  },
  {
    path: "/maps",
    title: "Maps",
    icon: "location_on",
    class: "",
    hidden: true,
    parent: "dashboard",
  },
  {
    path: "/notifications",
    title: "Notifications",
    icon: "notifications",
    class: "",
    hidden: true,
    parent: "none",
  },
  {
    path: "/upgrade",
    title: "Upgrade to PRO",
    icon: "unarchive",
    class: "active-pro",
    hidden: true,
    parent: "dashboard",
  },
  {
    path: "/master/user",
    title: "User",
    icon: "badge",
    class: "",
    hidden: false,
    parent: "master",
  },
  {
    path: "/master/role",
    title: "Role",
    icon: "lock",
    class: "",
    hidden: false,
    parent: "master",
  },
  {
    path: "/master/dosen",
    title: "Dosen",
    icon: "group",
    class: "",
    hidden: false,
    parent: "master",
  },
  {
    path: "/presensi",
    title: "Presensi",
    icon: "fact_check",
    class: "",
    hidden: false,
    parent: "none",
  },
];

export const menu: AppMenuItem[] = [
  new AppMenuItem("Dashboard", "1", "dashboard", "/dashboard"),
  new AppMenuItem("KRS", "1", "task_alt", "/krs"),
  new AppMenuItem("Kartu Ujian", "1", "list_alt", "/kartu-ujian"),
  new AppMenuItem("KHS", "1", "file_copy", "/khs"),
  new AppMenuItem("Presensi", "1", "fact_check", "/presensi"),
  new AppMenuItem("Rekap Presensi", "1", "folder_open", "/rekap-presensi"),
  new AppMenuItem("Revisi Nilai", "1", "create", "/input-nilai"),
  new AppMenuItem("Salinan Nilai", "1", "content_paste", "/salinan-nilai"),
  new AppMenuItem("Master", "1", "apps", "", [
    new AppMenuItem("User", "1", "badge", "/master/user"),
    new AppMenuItem("Role", "1", "lock", "/master/role"),
  ]),
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuDashboard;
  menuNone;
  menuNew: any[];

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    // this.menuDashboard = ROUTES.filter(
    //   (menuItem) => menuItem.icon == "dashboard"
    // );
    // this.menuItems = ROUTES.filter((menuItem) => menuItem.parent == "master");
    // this.menuNone = ROUTES.filter((menuItem) => menuItem.parent == "none");
    console.log(menu);
    this.menuNew = menu;
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  showMenuItem(menuItem): boolean {
    if (menuItem.permissionName) {
      return (
        this.authenticationService.userValue["master_hak_akses_id"] ==
        menuItem.permissionName
      );
    }
    return true;
  }
}
