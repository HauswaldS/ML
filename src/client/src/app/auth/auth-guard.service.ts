import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {map, take} from "rxjs/operators";

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .pipe(take(1))
      .pipe(map((authState: fromAuth.State) => {
        if (!authState.token.access_token) {
          return false;
        } else {
          return Date.now() < authState.token.expires_at;
        }
      }))
      .pipe(map((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
        return isAuthenticated;
      }))
  }

}
