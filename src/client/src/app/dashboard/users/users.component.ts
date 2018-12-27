import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RouterReducerState} from "@ngrx/router-store";
import {Subscription, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";

import * as fromApp from '../../store/app.reducers';
import * as fromUsers from './store/users.reducers';
import * as UsersActions from './store/users.actions';

import {User} from "./models/user.model";
import {UserGroup} from "./models/user-group.model";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private deletedUser$: Subscription;
  private searchValue$: Subscription;
  private searchValue = new Subject<string>();

  private usersGroups: UserGroup[];
  private tableDataSet: { users: User[], totalCount: number };
  private tableConfig: {
    page: number,
    limit: number,
    searchProp: string,
    searchValue: string | number,
    sortProp: string,
    sortValue: string | number
  };

  private searchProps = [
    {value: 'username', label: 'Username'},
    {value: 'email', label: 'Email'},
  ];

  private tableIsLoading: boolean;
  private isModalVisible: boolean;

  constructor(private store: Store<fromApp.AppState>,
              private actions$: Actions,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.deletedUser$ = this.actions$
      .pipe(ofType(UsersActions.DELETE_USER))
      .subscribe(() => {
        this.updateUsersList(true)
      });

    this.searchValue.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    this.searchValue$ = this.searchValue.subscribe((term) => {
      this.updateUsersList(false)
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

  search(term: string): void {
    this.tableConfig.searchValue = term;
    this.searchValue.next(term);
  }

  sort(sort: { key: string, value: string }): void {
    console.log(sort)
    this.tableConfig.sortProp = sort.key;
    this.tableConfig.sortValue = sort.value;
    this.updateUsersList(false);
  }

  initTable() {
    this.store.select('users')
      .subscribe((usersState: fromUsers.State) => {
        this.tableDataSet = usersState.list;
        this.usersGroups = usersState.groups;
        this.tableIsLoading = false;
      });

    this.tableIsLoading = true;
    this.tableConfig = {
      page: 1,
      limit: 20,
      searchProp: 'username',
      searchValue: '',
      sortProp: 'username',
      sortValue: 'descend'
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
    this.deletedUser$.unsubscribe();
    this.searchValue$.unsubscribe();
  }

}
