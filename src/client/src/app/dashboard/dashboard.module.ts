import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {DashboardRoutingModule} from "./dashboard-routing.module";

import {DashboardComponent} from './dashboard.component';
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";

import {UsersModule} from "./users/users.module";
import {DatasetsModule} from "./datasets/datasets.module";
import {PipesModule} from "../shared/pipes/pipes.module";

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
    NgZorroAntdModule,
    PipesModule
  ]
})
export class DashboardModule {
}
