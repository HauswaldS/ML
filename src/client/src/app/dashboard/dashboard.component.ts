import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

import {User} from "./users/models/user.model";
import * as AuthActions from "../auth/store/auth.actions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private menuItems: {}[];
  private loggedInUser: User;
  private isCollasped: boolean;
  private isDropdownVisible: boolean;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router) {
  }

  ngOnInit() {
    this.store.select('auth')
      .subscribe((authState: fromAuth.State) => {
        this.loggedInUser = authState.user;
      })
    this.isCollasped = false;
    this.menuItems = [
      {
        label: 'Users',
        value: 'users',
        routerLink: ['/dashboard/users'],
        icon: 'user'
      },
      {
        label: 'Datasets',
        value: 'users',
        routerLink: ['/dashboard/datasets'],
        icon: 'table'
      },
      {
        label: 'Algorithms',
        value: 'users',
        routerLink: ['/dashboard/datasets'],
        icon: 'robot'
      }
    ]
  }

  logout() {
    console.log('logout')
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/login'])
  }
}
