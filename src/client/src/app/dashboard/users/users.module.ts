import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from "../dashboard-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";

import {UsersComponent} from './users.component';
import {UserFormComponent} from './user-form/user-form.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgZorroAntdModule
  ]
})
export class UsersModule {
}
