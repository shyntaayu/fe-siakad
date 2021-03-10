import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { PresensiComponent } from "app/main/presensi/presensi.component";
import { RekapPresensiComponent } from "app/main/rekap-presensi/rekap-presensi.component";
import { InputNilaiComponent } from "app/main/input-nilai/input-nilai.component";
import { SalinanNilaiComponent } from "app/main/salinan-nilai/salinan-nilai.component";
import { KhsComponent } from "app/main/khs/khs.component";
import { ShareModule } from "app/main/share/share.module";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { HttpClientModule } from "@angular/common/http";
import { MainService } from "app/main/main.service";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MessageService } from "primeng/api";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ShareModule,
    TableModule,
    ButtonModule,
    ToastModule,
    HttpClientModule,
    MatAutocompleteModule,
    DropdownModule,
    InputTextModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    PresensiComponent,
    RekapPresensiComponent,
    InputNilaiComponent,
    SalinanNilaiComponent,
    KhsComponent,
  ],
  providers: [MainService, MessageService],
})
export class AdminLayoutModule {}
