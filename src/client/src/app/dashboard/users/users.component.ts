import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RouterReducerState} from "@ngrx/router-store";
import {Subscription} from "rxjs";
import {Actions, ofType} from "@ngrx/effects";

import * as fromApp from '../../store/app.reducers';
import * as fromUsers from './store/users.reducers';
import * as UsersActions from './store/users.actions';

import {Store} from "@ngrx/store";
import {User} from "./models/user.model";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private deletedUserSubscription: Subscription;

  private tableDataSet: { users: User[], totalCount: number };
  private tableConfig: {
    page: number,
    limit: number,
    searchProp: string,
    searchValue: string | number,
  };
  private tableIsLoading: boolean;
  private isModalVisible: boolean;

  constructor(private store: Store<fromApp.AppState>,
              private actions$: Actions,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.deletedUserSubscription = this.actions$
      .pipe(ofType(UsersActions.DELETE_USER))
      .subscribe(() => {
        this.updateUsersList(true)
      });

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
    this.store.select('users')
      .subscribe((usersState: fromUsers.State) => {
        this.tableDataSet = usersState.list;
        this.tableIsLoading = false;
      });

    this.tableIsLoading = true;
    this.tableConfig = {
      page: 1,
      limit: 20,
      searchProp: 'username',
      searchValue: ''
    };
    this.updateUsersList(false);
  }

  updateUsersList(isDelete: boolean) {
    if (isDelete
      && this.tableDataSet.users.length === 1
      && this.tableConfig.page > 1) {
      this.tableConfig.page = this.tableConfig.page - 1
    }
    this.tableIsLoading = true;
    this.store.dispatch(new UsersActions.TryToGetUsers(this.tableConfig))
  }

  onEditUser(id: string) {
    this.router.navigate([id, 'edit'], {relativeTo: this.route});
  }

  onDeleteUser(id: string) {
    this.store.dispatch(new UsersActions.TryToDeleteUser(id))
  }


  onPageChange(page: number) {
    this.tableConfig.page = page;
    this.updateUsersList(false);
  }

  handleModalCancel() {
    this.isModalVisible = false;
    this.router.navigate(['/dashboard/users'])
  }

  ngOnDestroy() {
    this.deletedUserSubscription.unsubscribe();
  }

}
