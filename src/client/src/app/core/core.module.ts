import {NgModule} from '@angular/core';

import {AppRoutingModule} from "../app-routing.module";

import {HomeComponent} from "./home/home.component";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule
  ]
})
export class CoreModule {
}
