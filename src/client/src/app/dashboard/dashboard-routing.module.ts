import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {DashboardComponent} from "./dashboard.component";
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {UsersComponent} from "./users/users.component";
import {AuthGuard} from "../auth/auth-guard.service";
import {UserFormComponent} from "./users/user-form/user-form.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardHomeComponent},
      {
        path: 'users', component: UsersComponent, children: [
          {path: 'create', component: UserFormComponent},
          {path: ':id/edit', component: UserFormComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class DashboardRoutingModule {
}
