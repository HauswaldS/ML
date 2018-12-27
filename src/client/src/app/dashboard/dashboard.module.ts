import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";

import {DashboardComponent} from './dashboard.component';
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {UsersModule} from "./users/users.module";
import {DatasetsComponent} from './datasets/datasets.component';
import {DatasetsFormComponent} from './datasets/datasets-form/datasets-form.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DatasetsComponent,
    DatasetsFormComponent,
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
