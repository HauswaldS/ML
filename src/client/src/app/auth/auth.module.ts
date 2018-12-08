import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from "./auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgZorroAntdModule} from "ng-zorro-antd";

import {AuthComponent} from "./auth.component";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NgZorroAntdModule
  ]
})
export class AuthModule {
}
