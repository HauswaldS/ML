import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {DashboardRoutingModule} from "./dashboard-routing.module";

import {DashboardComponent} from './dashboard.component';
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";

import {UsersModule} from "./users/users.module";
import {DatasetsModule} from "./datasets/datasets.module";


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UsersModule,
    DatasetsModule,
    NgZorroAntdModule
  ]
})
export class DashboardModule {
}
