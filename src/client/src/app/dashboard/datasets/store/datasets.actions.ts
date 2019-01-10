import {Action} from "@ngrx/store";
import {Dataset} from "../models/dataset.model";
import {Data} from "@angular/router";

export const TRY_TO_GET_DATASETS = 'TRY_TO_GET_DATASETS';
export const SET_DATASETS_LIST = 'SET_DATASETS_LIST';
export const TRY_TO_CREATE_DATASET = 'TRY_TO_CREATE_DATASET';
export const ADD_DATASET = 'ADD_DATASET';
export const TRY_TO_UPDATE_DATASET = 'TRY_TO_UPDATE_DATASET';
export const UPDATE_DATASET = 'UPDATE_DATASET';
export const TRY_TO_DELETE_DATASET = 'TRY_TO_DELETE_DATASET';
export const DELETE_DATASET = 'DELETE_DATASET';


export class TryToGetDatasets implements Action {
  readonly type = TRY_TO_GET_DATASETS;

  constructor(public params: {
    page: number,
    limit: number,
    searchProp: string,
    searchValue: string | number,
    sortProp: string,
    sortValue: string | number
  }) {
  }
}

export class SetDatasets implements Action {
  readonly type = SET_DATASETS_LIST;

  constructor(public datasets: Dataset[], public totalCount: number) {
  }
}

export class TryToCreateDataset implements Action {
  readonly type = TRY_TO_CREATE_DATASET;

  constructor(public payload: {
    fileName: string,
    title: string,
  }) {
  }
}


export class AddDataset implements Action {
  readonly type = ADD_DATASET;

  constructor(public dataset: Dataset) {
  }
}

export class TryToUpdateDataset implements Action {
  readonly type = TRY_TO_UPDATE_DATASET;

  constructor(public id: string, public dataset: {
    fileName: string,
    title: string,
  }) {
  }
}

export class UpdateDataset implements Action {
  readonly type = UPDATE_DATASET;

  constructor(public dataset: Dataset) {
  }
}

export class TryToDeleteDataset implements Action {
  readonly type = TRY_TO_DELETE_DATASET;

  constructor(public id: string) {
  }
}

export class DeleteDataset implements Action {
  readonly type = DELETE_DATASET;

  constructor(public id: string) {
  }
}


export type DatasetsActions =
  TryToGetDatasets |
  SetDatasets |
  TryToCreateDataset |
  AddDataset |
  TryToUpdateDataset |
  UpdateDataset |
  TryToDeleteDataset |
  DeleteDataset
