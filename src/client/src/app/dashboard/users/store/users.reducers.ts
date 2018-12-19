import * as UsersActions from './users.actions';

import {User} from "../models/user.model";
import {UserGroup} from "../models/user-group.model";

export interface State {
  list: {
    users: User[],
    totalCount: number
  },
  groups: UserGroup[]
}

const initialState = {
  list: {
    users: [],
    totalCount: 0
  },
  groups: []
};

export function usersReducer(state = initialState, action: UsersActions.UsersActions) {
  switch (action.type) {
    case(UsersActions.SET_USERS_LIST):
      return {
        ...state,
        list: {
          ...state.list,
          users: action.users,
          totalCount: action.totalCount
        }
      };
    case(UsersActions.ADD_USER):
      return {
        ...state,
        list: {
          ...state.list,
          users: [action.user, ...state.list.users],
          totalCount: state.list.totalCount + 1
        }
      };
    case(UsersActions.UPDATE_USER):
      return {
        ...state,
        list: {
          ...state.list,
          users: state.list.users.map(u => {
            if (u._id === action.user._id) return action.user;
            else return u
          })
        }
      };
    case(UsersActions.SET_USERS_GROUPS):
      return {
        ...state,
        groups: action.groups
      };
    default:
      return state;
  }
}
