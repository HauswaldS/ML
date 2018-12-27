import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from "../dashboard-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";

import {UsersComponent} from './users.component';
import {UserFormComponent} from './user-form/user-form.component';
import {CroppieComponent} from "../../shared/croppie/croppie.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArrayOfObjectsToStringPipe} from "../../shared/array-of-objects-to-string.pipe";
import {FormatImageUrlPipe} from "../../shared/format-image-url.pipe";

@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    CroppieComponent,
    ArrayOfObjectsToStringPipe,
    FormatImageUrlPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule {
}
