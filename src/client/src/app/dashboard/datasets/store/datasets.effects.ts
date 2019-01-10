import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs/operators";


import * as DatasetActions from './datasets.actions';
import {Dataset} from "../models/dataset.model";

@Injectable()
export class DatasetsEffects {

  @Effect()
  tryToGetDatasets = this.actions$
    .pipe(
      ofType(DatasetActions.TRY_TO_GET_DATASETS),
      switchMap((action: DatasetActions.TryToGetDatasets) => {
        return this.http.get(`${this.baseUrl}/api/datasets`, {
          params: new HttpParams()
            .set('page', String(action.params.page))
            .set('limit', String(action.params.limit))
            .set('searchProp', String(action.params.searchProp))
            .set('searchValue', String(action.params.searchValue))
            .set('sortProp', String(action.params.sortProp))
            .set('sortValue', String(action.params.sortValue))
        })
      }),
      map((payload: { datasets: Dataset[], totalCount: number }) => {
        return {
          type: DatasetActions.SET_DATASETS_LIST,
          datasets: payload.datasets,
          totalCount: payload.totalCount
        }
      })
    );

  @Effect()
  tryToCreateDataset = this.actions$
    .pipe(
      ofType(DatasetActions.TRY_TO_CREATE_DATASET),
      switchMap((action: DatasetActions.TryToCreateDataset) => {
        return this.http.post(`${this.baseUrl}/api/datasets`, {...action.payload})
      }),
      map((dataset: Dataset) => {
        return {
          type: DatasetActions.ADD_DATASET,
          dataset
        }
      })
    );


  @Effect()
  tryToUpdateDataset = this.actions$
    .pipe(
      ofType(DatasetActions.TRY_TO_UPDATE_DATASET),
      switchMap((action: DatasetActions.TryToUpdateDataset) => {
        return this.http.put(`${this.baseUrl}/api/datasets/${action.id}`, {...action.dataset})
      }),
      map((dataset: Dataset) => {

        return {
          type: DatasetActions.UPDATE_DATASET,
          dataset
        }
      })
    );


  @Effect()
  tryToDeleteDataset = this.actions$
    .pipe(
      ofType(DatasetActions.TRY_TO_DELETE_DATASET),
      switchMap((action: DatasetActions.TryToDeleteDataset) => {
        return this.http.delete(`${this.baseUrl}/api/datasets/${action.id}`)
      }),
      map(() => {
        console.log('1')
        return {
          type: DatasetActions.DELETE_DATASET
        }
      })
    );

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private actions$: Actions,
    private http: HttpClient) {
  }
}
