import {Action} from "@ngrx/store";

import {User} from "../models/user.model";
import {UserGroup} from "../models/user-group.model";

export const TRY_TO_GET_USERS = 'TRY_TO_GET_USERS';
export const SET_USERS_LIST = 'SET_USERS_LIST';
export const TRY_TO_CREATE_USER = 'TRY_TO_CREATE_USER';
export const ADD_USER = 'ADD_USER';
export const TRY_TO_UPDATE_USER = 'TRY_TO_UPDATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const TRY_TO_DELETE_USER = 'TRY_TO_DELETE_USER';
export const DELETE_USER = 'DELETE_USER';
export const TRY_TO_GET_USERS_GROUPS = 'TRY_TO_GET_USERS_GROUPS';
export const SET_USERS_GROUPS = 'SET_USERS_GROUPS';

export class TryToGetUsers implements Action {
  readonly type = TRY_TO_GET_USERS;

  constructor(public params: {
    page: number,
    limit: number,
    searchProp: string,
    searchValue: string | number
  }) {
  }
}

export class SetUsers implements Action {
  readonly type = SET_USERS_LIST;

  constructor(public users: User[], public totalCount: number) {
  }
}

export class TryToCreateUser implements Action {
  readonly type = TRY_TO_CREATE_USER;

  constructor(public payload: {
    avatar: string,
    username: string,
    email: string,
    password: string
  }) {
  }
}

export class AddUser implements Action {
  readonly type = ADD_USER;

  constructor(public user: User) {
  }
}

export class TryToUpdateUser implements Action {
  readonly type = TRY_TO_UPDATE_USER;

  constructor(public id: string,
              public payload: {
                avatar:string,
                username: string,
                email: string,
                password: string
              }) {
  }
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public user: User) {
  }
}

export class TryToDeleteUser implements Action {
  readonly type = TRY_TO_DELETE_USER;

  constructor(public id: string) {
  }
}

export class DeleteUser implements Action {
  readonly type = DELETE_USER;

  constructor() {
  }
}

export class TryToGetUsersGroups implements Action {
  readonly type = TRY_TO_GET_USERS_GROUPS;

  constructor(public search: string) {
  }
}

export class SetUsersGroups implements Action {
  readonly type = SET_USERS_GROUPS;

  constructor(public groups: UserGroup[]) {
  }
}

export type UsersActions =
  TryToGetUsers
  | SetUsers
  | TryToCreateUser
  | AddUser
  | TryToUpdateUser
  | UpdateUser
  | TryToGetUsersGroups
  | SetUsersGroups
