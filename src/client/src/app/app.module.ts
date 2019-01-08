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

import {reducers} from "./store/app.reducers";

import {AuthEffects} from "./auth/store/auth.effects";
import {UsersEffects} from "./dashboard/users/store/users.effects";
import {DatasetsEffects} from "./dashboard/datasets/store/datasets.effects";

import {environment} from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, UsersEffects, DatasetsEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {provide: "BASE_URL", useValue: environment.baseUrl},
    {provide: "AUTH0_APP_DOMAIN", useValue: environment.auth0appDomain},
    {provide: "AUTH0_AUDIENCE", useValue: environment.auth0audience},
    {provide: "AUTH0_CLIENT_ID", useValue: environment.auth0ClientId},
    {provide: "AUTH0_CLIENT_SECRET", useValue: environment.auth0ClientSecret},
    {provide: "AUTH0_CONNECTION", useValue: environment.auth0Connection}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
