import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from "./auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule, MessageModule, PasswordModule} from "primeng/primeng";

import {AuthComponent} from "./auth.component";
import {StoreModule} from "@ngrx/store";
import {authReducer} from "./store/auth.reducers";
import {AuthEffects} from "./store/auth.effects";
import {EffectsModule} from "@ngrx/effects";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    MessageModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule {
}
