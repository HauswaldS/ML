import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {DashboardComponent} from "./dashboard.component";
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {UsersComponent} from "./users/users.component";
import {UserFormComponent} from "./users/user-form/user-form.component";
import {DatasetsComponent} from "./datasets/datasets.component";
import {DatasetFormComponent} from "./datasets/dataset-form/dataset-form.component";

import {AuthGuard} from "../auth/auth-guard.service";

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardHomeComponent},
      {
        path: 'users', component: UsersComponent, children: [
          {path: 'create', component: UserFormComponent},
          {path: ':id/edit', component: UserFormComponent}
        ]
      },
      {
        path: 'datasets', component: DatasetsComponent, children: [
          {path: 'create', component: DatasetFormComponent},
          {path: ':id/edit', component: DatasetFormComponent}
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
