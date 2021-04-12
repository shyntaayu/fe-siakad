import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { APP_INITIALIZER, Injector, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from "./app.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { TableListComponent } from "./table-list/table-list.component";
import { TypographyComponent } from "./typography/typography.component";
import { IconsComponent } from "./icons/icons.component";
import { MapsComponent } from "./maps/maps.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { UpgradeComponent } from "./upgrade/upgrade.component";
import { AgmCoreModule } from "@agm/core";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./account/login/login.component";
import { RegisterComponent } from "./account/register/register.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { UtilsModule } from "shared/utils/utils.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppConfigService } from "shared/appconfig.service";
import { AppConfig } from "./model/app-config";

export function initializerFn(jsonAppConfigService: AppConfigService) {
  return () => {
    return jsonAppConfigService.loadConfig();
  };
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    }),
    MatCheckboxModule,
    SweetAlert2Module.forRoot({ dismissOnDestroy: false }),
    UtilsModule,
    NgbModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    {
      provide: AppConfig,
      deps: [HttpClient],
      useExisting: AppConfigService,
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: initializerFn,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
