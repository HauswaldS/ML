import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Store} from "@ngrx/store";

import * as fromUsers from './users.reducers';
import * as UsersActions from './users.actions';

import {Actions, Effect, ofType} from "@ngrx/effects";
import {map, mergeMap, switchMap} from "rxjs/operators";
import {User} from "../models/user.model";
import {UserGroup} from "../models/user-group.model";

@Injectable()
export class UsersEffects {

  @Effect()
  tryToGetUsers = this.actions$
    .pipe(ofType(UsersActions.TRY_TO_GET_USERS))
    .pipe(switchMap((action: UsersActions.TryToGetUsers) => {
      return this.http.get(`${this.baseUrl}/api/users`, {
        params: new HttpParams()
          .set('page', String(action.params.page))
          .set('limit', String(action.params.limit))
          .set('searchProp', String(action.params.searchProp))
          .set('searchValue', String(action.params.searchValue))
      });
    }))
    .pipe(map((payload: { users: User[], totalCount: number }) => {
      return {
        type: UsersActions.SET_USERS_LIST,
        users: payload.users,
        totalCount: payload.totalCount
      }
    }));


  @Effect()
  tryToCreateUser = this.actions$
    .pipe(ofType(UsersActions.TRY_TO_CREATE_USER))
    .pipe(switchMap((action: UsersActions.TryToCreateUser) => {
      return this.http.post(`${this.baseUrl}/api/users`, {...action.payload})
    }))
    .pipe(mergeMap((user: User) => {
      return [
        {
          type: UsersActions.ADD_USER,
          user
        }
      ]
    }));

  @Effect()
  tryToUpdateUser = this.actions$
    .pipe(ofType(UsersActions.TRY_TO_UPDATE_USER))
    .pipe(switchMap((action: UsersActions.TryToUpdateUser) => {
      return this.http.put(`${this.baseUrl}/api/users/${action.id}`, {...action.payload})
    }))
    .pipe(mergeMap((user: User) => {
      return [
        {
          type: UsersActions.UPDATE_USER,
          user
        }
      ]
    }));

  @Effect()
  tryToDeleteUser = this.actions$
    .pipe(ofType(UsersActions.TRY_TO_DELETE_USER))
    .pipe(switchMap((action: UsersActions.TryToDeleteUser) => {
      return this.http.delete(`${this.baseUrl}/api/users/${action.id}`)
    }))
    .pipe(map(() => {
      return {
        type: UsersActions.DELETE_USER
      }
    }));

  @Effect()
  tryToGetUsersGroups = this.actions$
    .pipe(ofType(UsersActions.TRY_TO_GET_USERS_GROUPS))
    .pipe(switchMap((action: UsersActions.TryToGetUsersGroups) => {
      return this.http.get(`${this.baseUrl}/api/users-groups`, {
        params: new HttpParams()
          .set('search', action.search)
      })
    }))
    .pipe(map((groups: UserGroup[]) => {
      return {
        type: UsersActions.SET_USERS_GROUPS,
        groups
      }
    }));



  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    @Inject('AUTH0_APP_DOMAIN') private auth0AppDomain,
    @Inject('AUTH0_AUDIENCE') private auth0Audience,
    @Inject('AUTH0_CLIENT_ID') private auth0ClientId,
    @Inject('AUTH0_CLIENT_SECRET') private auth0ClientSecret,
    @Inject('AUTH0_CONNECTION') private auth0Connection,
    private actions$: Actions,
    private http: HttpClient) {
  }
}
