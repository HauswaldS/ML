import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";

import {DashboardComponent} from './dashboard.component';
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {UsersModule} from "./users/users.module";


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UsersModule,
    NgZorroAntdModule
  ]
})
export class DashboardModule {
}
