import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {StoreModule} from "@ngrx/store";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";

// Ng-Zorro related
import {NZ_I18N, en_US} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

import {AppComponent} from './app.component';

import {environment} from "../environments/environment";
import {AuthEffects} from "./auth/store/auth.effects";
import {reducers} from "./store/app.reducers";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    CoreModule
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
