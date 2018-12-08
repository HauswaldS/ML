import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions} from "@ngrx/effects";

import {map, take, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

import * as AuthActions from './store/auth.actions';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private actions$: Actions) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .pipe(take(1))
      .pipe(map((authState: fromAuth.State) => {
        if (!authState.token.access_token) {
          return false;
        } else {
          const isValid = Date.now() < authState.token.expires_at;
          console.log('Expired token:', !isValid, '| ' + Date.now(), '| ' + authState.token.expires_at)
          if (isValid) {
            return true
          } else {
            return of(this.actions$.ofType(AuthActions.SET_REFRESH_TOKEN));
          }
        }
      }))
      .pipe(tap((data: any) => {
        if (data === AuthActions.TRY_REFRESH_ACCESS_TOKEN) {
          this.store.dispatch(new AuthActions.TryRefreshAccessToken())
        }
      }))
      .pipe(map((isAuthenticated: boolean | Observable<AuthActions.SetRefreshToken>) => {
        console.log('IS AUTHENTICATED BIS: ', isAuthenticated);
        if (!!isAuthenticated === false) {
          this.router.navigate(['/login']);
        }
        return !!isAuthenticated;
      }))
  }

}
