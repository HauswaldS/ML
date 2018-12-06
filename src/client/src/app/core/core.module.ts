import {NgModule} from '@angular/core';

import {AppRoutingModule} from "../app-routing.module";

import {HomeComponent} from "./home/home.component";
import {HeaderComponent} from './header/header.component';
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    ButtonModule
  ],
  exports: [
    AppRoutingModule
  ]
})
export class CoreModule {
}
