import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {AppRoutingModule} from "../app-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";

import {HomeComponent} from "./home/home.component";

import {AuthInterceptor} from "../shared/interceptors/auth.interceptor";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    NgZorroAntdModule
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ]
})
export class CoreModule {
}
