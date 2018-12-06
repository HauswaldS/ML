import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions} from "@ngrx/effects";
import * as AuthActions from './store/auth.actions';

import * as fromAuth from './store/auth.reducers';
import {map, switchMap, take} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAuth.FeatureState>,
              private actions$: Actions) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .pipe(take(1))
      .pipe(map((authState: fromAuth.State) => {
        return authState && !!authState.token.access_token;
      }));
    // .pipe(switchMap((authState: fromAuth.State) => {
    //   console.log(authState)
    //   console.log('IS AUTHENTICATED: ', authState.token.access_token);
    //   if (!authState.token.access_token) {
    //     return Observable.create((observer) => observer.next(true))
    //   } else {
    //     const isValid = new Date().getTime() < (authState.token.expires_in * 1000);
    //     console.log(isValid)
    //     console.log(new Date().getTime())
    //     console.log(authState.token.expires_in * 1000)
    //     if (isValid) {
    //       return Observable.create((observer) => observer.next(true))
    //     } else {
    //
    //       return this.actions$.ofType(AuthActions.SET_REFRESH_TOKEN)
    //     }
    //   }
    // }))
    // .pipe(map((isAuthenticated: boolean | AuthActions.TrySignup) => {
    //   console.log('IS AUTHENTICATED BIS: ', isAuthenticated);
    //   return !!isAuthenticated;
    // }))
  }
}
