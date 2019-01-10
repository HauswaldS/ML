import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from "../dashboard-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../shared/pipes/pipes.module";

import {UsersComponent} from './users.component';
import {UserFormComponent} from './user-form/user-form.component';
import {CroppieComponent} from "../../shared/croppie/croppie.component";

@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    CroppieComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class UsersModule {
}
