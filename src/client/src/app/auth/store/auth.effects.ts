import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";

import {catchError, map, mergeMap, switchMap, take} from 'rxjs/operators';
import {of} from "rxjs";

import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.reducers'
import {Router} from "@angular/router";


@Injectable()
export class AuthEffects {
  appDomain = 'https://mlfordummies.eu.auth0.com';
  audience = 'https://mlfordummies.eu.auth0.com/api/v2/';

  connection = 'Username-Password-Authentication';

  userSignedUp = {
    email: '',
    password: ''
  };

  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .pipe(map((action: AuthActions.TrySignup) => {
      return action.payload;
    }))
    .pipe(switchMap((userCredentials: { email: string, password: string }) => {
      const payload = {
        client_id: this.client_id,
        connection: this.connection,
        email: userCredentials.email,
        password: userCredentials.password
      };

      this.userSignedUp.email = userCredentials.email;
      this.userSignedUp.password = userCredentials.password;

      return this.http.post(`${this.appDomain}/dbconnections/signup`, payload);
    }))
    .pipe(switchMap((user: { email: string, email_verified: boolean, _id: string }) => {
      const payload = {
        grant_type: 'password',
        client_id: this.client_id,
        client_secret: this.client_secret,
        username: this.userSignedUp.email,
        password: this.userSignedUp.password,
        audience: this.audience,
        scope: 'offline_access'
      };
      return this.http.post(`${this.appDomain}/oauth/token`, payload)
    }))
    .pipe(mergeMap((result: {
      access_token: string,
      token_type: string,
      expires_in: number,
      refresh_token: string
    }) => {
      this.router.navigate(['/dashboard'])
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_REFRESH_TOKEN,
          refresh_token: result.refresh_token
        },
        {
          type: AuthActions.SET_ACCESS_TOKEN,
          access_token: result.access_token,
          expires_in: result.expires_in
        },
      ]
    }));

  @Effect()
  authSignIn = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .pipe(map((action: AuthActions.TrySignin) => {
      return action.payload;
    }))
    .pipe(switchMap((userCredentials: { email: string, password: string }) => {
      const payload = {
        grant_type: 'password',
        client_id: this.client_id,
        client_secret: this.client_secret,
        username: userCredentials.email,
        password: userCredentials.password,
        audience: this.audience,
        scope: 'offline_access'
      };

      return this.http.post(`${this.appDomain}/oauth/token`, payload)
    }))
    .pipe(mergeMap((
      result: {
        access_token: string,
        token_type: string,
        expires_in: number,
        refresh_token: string
      }) => {
      this.router.navigate(['/dashboard'])
      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_REFRESH_TOKEN,
          refresh_token: result.refresh_token,
        },
        {
          type: AuthActions.SET_ACCESS_TOKEN,
          access_token: result.access_token,
          expires_in: result.expires_in
        },
      ]
    }));

  @Effect()
  refreshToken = this.actions$
    .ofType(null)
    .pipe(switchMap(() => this.store.select('auth')))
    .pipe(switchMap((authState: { token: { refresh_token: string } }) => {
      const payload = {
        grant_type: "refresh_token",
        client_id: this.client_id,
        client_secret: this.client_secret,
        refresh_token: authState.token.refresh_token
      };
      return this.http.post(`${this.appDomain}/oauth/token`, payload)
    }))
    .pipe(switchMap((result: {
      access_token: string,
      expires_in: number,
      scope: string,
      id_token: string,
      token_type: string
    }) => {
      return [
        {
          type: AuthActions.SET_ACCESS_TOKEN,
          access_token: result.access_token,
          expires_in: result.expires_in
        }
      ]
    }))
    .pipe(catchError(err => of(err)));

  constructor(private actions$: Actions,
              private store: Store<fromAuth.FeatureState>,
              private router: Router,
              private http: HttpClient) {
  }
}
