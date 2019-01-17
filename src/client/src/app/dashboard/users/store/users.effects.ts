import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, switchMap} from "rxjs/operators";

import * as UsersActions from './users.actions';

import {ErrorHandlerService} from "../../../shared/services/errorHandler.service";

import {User} from "../models/user.model";
import {UserGroup} from "../models/user-group.model";


@Injectable()
export class UsersEffects {

  @Effect()
  tryToGetUsers = this.actions$
    .pipe(ofType(UsersActions.TRY_TO_GET_USERS),
      switchMap((action: UsersActions.TryToGetUsers) => {
        return this.http.get(`${this.baseUrl}/api/users`, {
          params: new HttpParams()
            .set('page', String(action.params.page))
            .set('limit', String(action.params.limit))
            .set('searchProp', String(action.params.searchProp))
            .set('searchValue', String(action.params.searchValue))
            .set('sortProp', String(action.params.sortProp))
            .set('sortValue', String(action.params.sortValue))
        }).pipe(
          map(res => res),
          catchError(this.errorHandler.handle(UsersActions.TRY_TO_GET_USERS, 'An error occurred while trying to get the users list.'))
        );
      }),
      map((payload: { users: User[], totalCount: number }) => {
        return {
          type: UsersActions.SET_USERS_LIST,
          users: payload.users,
          totalCount: payload.totalCount
        }
      }));


  @Effect()
  tryToCreateUser = this.actions$
    .pipe(ofType(UsersActions.TRY_TO_CREATE_USER),
      switchMap((action: UsersActions.TryToCreateUser) => {
        return this.http.post(`${this.baseUrl}/api/users`, {...action.payload})
          .pipe(
            map(res => res),
            catchError(this.errorHandler.handle(UsersActions.TRY_TO_CREATE_USER, 'An error occurred while trying to create a user.'))
          );
      }),
      mergeMap((user: User) => {
        return [
          {
            type: UsersActions.ADD_USER,
            user
          }
        ]
      }));

  @Effect()
  tryToUpdateUser = this.actions$
    .pipe(ofType(UsersActions.TRY_TO_UPDATE_USER),
      switchMap((action: UsersActions.TryToUpdateUser) => {
        return this.http.put(`${this.baseUrl}/api/users/${action.id}`, {...action.payload})
          .pipe(
            map(res => res),
            catchError(this.errorHandler.handle(UsersActions.TRY_TO_UPDATE_USER, 'An error occurred while trying to update a user.'))
          );
      }),
      mergeMap((user: User) => {
        return [
          {
            type: UsersActions.UPDATE_USER,
            user
          }
        ]
      }));

  @Effect()
  tryToDeleteUser = this.actions$
    .pipe(
      ofType(UsersActions.TRY_TO_DELETE_USER),
      switchMap((action: UsersActions.TryToDeleteUser) => {
        return this.http.delete(`${this.baseUrl}/api/users/${action.id}`)
          .pipe(
            map(res => res),
            catchError(this.errorHandler.handle(UsersActions.TRY_TO_DELETE_USER, 'An error occurred while trying to delete a user.'))
          );
      }),
      map(() => {
        return {
          type: UsersActions.DELETE_USER
        }
      }));

  @Effect()
  tryToGetUsersGroups = this.actions$
    .pipe(ofType(UsersActions.TRY_TO_GET_USERS_GROUPS),
      switchMap((action: UsersActions.TryToGetUsersGroups) => {
        return this.http.get(`${this.baseUrl}/api/users-groups`, {
          params: new HttpParams()
            .set('search', action.search)
        }).pipe(
          map(res => res),
          catchError(this.errorHandler.handle(UsersActions.TRY_TO_GET_USERS_GROUPS, 'An error occurred while trying to get the users group.'))
        )
      }),
      map((groups: UserGroup[]) => {
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
    private errorHandler: ErrorHandlerService,
    private actions$: Actions,
    private http: HttpClient) {
  }
}
