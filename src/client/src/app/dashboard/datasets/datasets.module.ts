import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {DashboardRoutingModule} from "../dashboard-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../shared/pipes/pipes.module";

import {DatasetsComponent} from "./datasets.component";
import {DatasetFormComponent} from "./dataset-form/dataset-form.component";


@NgModule({
  declarations: [
    DatasetsComponent,
    DatasetFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class DatasetsModule {
}
