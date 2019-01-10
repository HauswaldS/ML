import * as DatasetsActions from "./datasets.actions";

import {Dataset} from "../models/dataset.model";

export interface State {
  list: {
    datasets: Dataset[],
    totalCount: number
  }
}

const initialState = {
  list: {
    datasets: [],
    totalCount: 0
  }
};

export function datasetsReducer(state = initialState, action: DatasetsActions.DatasetsActions) {
  switch (action.type) {
    case(DatasetsActions.SET_DATASETS_LIST):
      return {
        ...state,
        list: {
          datasets: action.datasets,
          totalCount: action.totalCount
        }
      };
    case(DatasetsActions.ADD_DATASET):
      console.log(action.dataset);
      return {
        ...state,
        list: {
          datasets: [action.dataset, ...state.list.datasets],
          totalCount: state.list.totalCount++
        }
      };
    case(DatasetsActions.UPDATE_DATASET):
      return {
        ...state,
        list: {
          ...state.list,
          datasets: state.list.datasets
            .map(d => d._key === action.dataset._key ? action.dataset : d)
        }
      };
    // case(DatasetsActions.DELETE_DATASET):
    //   return {
    //     ...state,
    //     list: {
    //       ...state.list,
    //       datasets: state.list.datasets
    //         .filter(d => d._key !== action.id),
    //       totalCount: state.list.totalCount--
    //     }
    //   };
    default:
      return state;
  }
}
