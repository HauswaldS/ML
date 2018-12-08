import {NgModule} from '@angular/core';

import {AppRoutingModule} from "../app-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";

import {HomeComponent} from "./home/home.component";

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
  ]
})
export class CoreModule {
}
