import {Inject, Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";

import {map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as AuthActions from './auth.actions';

import * as fromAuth from './auth.reducers'

import {Router} from "@angular/router";
import {User} from "../../dashboard/users/models/user.model";


@Injectable()
export class AuthEffects {

  userEmail: string;

  @Effect()
  authSignup =
    this.actions$
      .pipe(ofType(AuthActions.TRY_SIGNUP))
      .pipe(map((action: AuthActions.TrySignup) => {
        return action.payload;
      }))
      .pipe(switchMap((userCredentials: { email: string, password: string }) => {
        const userPayload = {
          username: userCredentials.email.split('@')[0],
          email: userCredentials.email,
          password: userCredentials.password,
          groups: ['16993']
        };

        return this.http.post(`${this.baseUrl}/api/users`, userPayload)
      }))
      .pipe(mergeMap((user: {
        email: string,
        password: string
      }) => {
        return [
          {
            type: AuthActions.SIGNUP
          },
          {
            type: AuthActions.TRY_SIGNIN,
            payload: {
              email: user.email,
              password: user.password,
            }
          }
        ]
      }));


  @Effect()
  authSignIn = this.actions$
    .pipe(ofType(AuthActions.TRY_SIGNIN))
    .pipe(map((action: AuthActions.TrySignin) => {
      return action.payload;
    }))
    .pipe(switchMap((userCredentials: { email: string, password: string }) => {
      const payload = {
        grant_type: 'password',
        client_id: this.auth0ClientId,
        client_secret: this.auth0ClientSecret,
        username: userCredentials.email,
        password: userCredentials.password,
        auth0Audience: this.auth0Audience,
        scope: 'offline_access'
      };
      this.userEmail = userCredentials.email;
      return this.http.post(`${this.auth0AppDomain}/oauth/token`, payload)
    }))
    .pipe(
      mergeMap((
        result: {
          access_token: string,
          token_type: string,
          expires_in: number,
          refresh_token: string
        }) => {

        this.router.navigate(['/dashboard']);
        return [
          {
            type: AuthActions.TRY_TO_GET_LOGGED_IN_USER,
            userEmail: this.userEmail
          },
          {
            type: AuthActions.SET_REFRESH_TOKEN,
            refresh_token: result.refresh_token,
          },
          {
            type: AuthActions.SET_ACCESS_TOKEN,
            access_token: result.access_token,
            expires_at: result.expires_in
          },
        ]
      }));



  @Effect()
  tryToGetLoggedInUser = this.actions$
    .pipe(
      ofType(AuthActions.TRY_TO_GET_LOGGED_IN_USER),
      switchMap((action: AuthActions.TryToGetLoggedInUser) => this.http.get(`${this.baseUrl}/api/users/email/${action.userEmail}`)),
      mergeMap((user: User) => {
        return [
          {
            type: AuthActions.SET_LOGGED_IN_USER,
            user
          },
          {
            type: AuthActions.SIGNIN
          }
        ]
      })
    )

  //TODO: Implement refresh token flow
  // @Effect()
  // refreshToken = this.actions$
  //   .pipe(
  //     ofType(AuthActions.TRY_REFRESH_ACCESS_TOKEN),
  //     take(1)
  //   )
  //   .pipe(switchMap(() => this.store.select('auth')))
  //   .pipe(switchMap((authState: { token: { refresh_token: string } }) => {
  //     console.log(authState)
  //     const payload = {
  //       grant_type: "refresh_token",
  //       auth0ClientId: this.auth0ClientId,
  //       auth0ClientSecret: this.auth0ClientSecret,
  //       refresh_token: authState.token.refresh_token
  //     };
  //     return this.http.post(`${this.auth0AppDomain}/oauth/token`, payload)
  //   }))
  //   .pipe(mergeMap((result: {
  //     access_token: string,
  //     expires_in: number,
  //     scope: string,
  //     id_token: string,
  //     token_type: string
  //   }) => {
  //     return [
  //       {
  //         type: AuthActions.SET_ACCESS_TOKEN,
  //         access_token: result.access_token,
  //         expires_at: result.expires_in
  //       }
  //     ]
  //   }))
  //   .pipe(catchError(err => of(err)));

  constructor(
    @Inject('BASE_URL') private baseUrl,
    @Inject('AUTH0_APP_DOMAIN') private auth0AppDomain,
    @Inject('AUTH0_AUDIENCE') private auth0Audience,
    @Inject('AUTH0_CLIENT_ID') private auth0ClientId,
    @Inject('AUTH0_CLIENT_SECRET') private auth0ClientSecret,
    @Inject('AUTH0_CONNECTION') private auth0Connection,
    private actions$: Actions,
    private store: Store<fromAuth.State>,
    private router: Router,
    private http: HttpClient) {
  }
}
