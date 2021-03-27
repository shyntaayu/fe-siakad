import { Component, OnInit } from "@angular/core";

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
    path: "/presensi",
    title: "Presensi",
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
    title: "Input Nilai",
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
    parent: "dashboard",
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
    path: "/master/karyawan",
    title: "Karyawan",
    icon: "groups",
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

  constructor() {}

  ngOnInit() {
    this.menuDashboard = ROUTES.filter(
      (menuItem) => menuItem.icon == "dashboard"
    );
    this.menuItems = ROUTES.filter((menuItem) => menuItem.parent == "master");
    this.menuNone = ROUTES.filter((menuItem) => menuItem.parent == "none");
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
