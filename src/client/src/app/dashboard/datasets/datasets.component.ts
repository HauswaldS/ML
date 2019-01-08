import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RouterReducerState} from "@ngrx/router-store";
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";
import {Subject, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

import * as fromApp from "../../store/app.reducers";
import * as fromDatasets from "../datasets/store/datasets.reducers";
import * as DatasetsActions from "../datasets/store/datasets.actions";

import {Dataset} from "./models/dataset.model";


@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit, OnDestroy {
  private deletedDataset$: Subscription;
  private searchValue$: Subscription;
  private searchValue = new Subject<string>();

  private tableDataSet: { datasets: Dataset[], totalCount: number };
  private tableConfig: {
    page: number,
    limit: number,
    searchProp: string,
    searchValue: string | number,
    sortProp: string,
    sortValue: string | number
  };

  private searchProps = [
    {value: 'title', label: 'Title'}
  ];

  private tableIsLoading: boolean;
  private isModalVisible: boolean;

  constructor(private store: Store<fromApp.AppState>,
              private actions$: Actions,
              private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit() {
    this.deletedDataset$ = this.actions$
      .pipe(ofType(DatasetsActions.DELETE_DATASET))
      .subscribe(() => {
        this.updateDatasetsList(true)
      });

    this.searchValue.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    this.searchValue$ = this.searchValue.subscribe((term) => {
      this.updateDatasetsList(false)
    })


    this.store.select('router')
      .subscribe((routerState: RouterReducerState) => {
        if (routerState.state.url.includes('create') ||
          routerState.state.url.includes('edit')) {
          this.isModalVisible = true;
        }
        else {
          this.isModalVisible = false;
        }
      });
    this.initTable()
  }

  initTable() {
    this.store.select('datasets')
      .subscribe((datasetsState: fromDatasets.State) => {
        this.tableDataSet = datasetsState.list;
        this.tableIsLoading = false;
      });

    this.tableIsLoading = true;
    this.tableConfig = {
      page: 1,
      limit: 20,
      searchProp: 'title',
      searchValue: '',
      sortProp: 'title',
      sortValue: 'descend'
    };
    this.updateDatasetsList(false);
  }

  updateDatasetsList(isDelete: boolean) {
    if (isDelete
      && this.tableDataSet.datasets.length === 1
      && this.tableConfig.page > 1) {
      this.tableConfig.page = this.tableConfig.page - 1
    }
    this.tableIsLoading = true;
    this.store.dispatch(new DatasetsActions.TryToGetDatasets(this.tableConfig))
  }

  onEditDataset(id: string) {
    this.router.navigate([id, 'edit'], {relativeTo: this.route});
  }

  onDeleteDataset(id: string) {
    this.store.dispatch(new DatasetsActions.TryToDeleteDataset(id))
  }

  onPageChange(page: number) {
    this.tableConfig.page = page;
    this.updateDatasetsList(false);
  }

  handleModalCancel() {
    this.isModalVisible = false;
    this.router.navigate(['/dashboard/datasets'])
  }


  ngOnDestroy() {
    this.deletedDataset$.unsubscribe();
    this.searchValue$.unsubscribe();
  }

}
