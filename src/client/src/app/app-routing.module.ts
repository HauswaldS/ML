import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {HomeComponent} from "./core/home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'}
  ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
