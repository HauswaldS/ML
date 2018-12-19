import {ActionReducerMap} from "@ngrx/store";

import * as fromAuth from "../auth/store/auth.reducers";
import * as fromUsers from "../dashboard/users/store/users.reducers";
import {routerReducer, RouterReducerState} from "@ngrx/router-store";

export interface AppState {
  auth: fromAuth.State,
  users: fromUsers.State,
  router: RouterReducerState
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  users: fromUsers.usersReducer,
  router: routerReducer,
}
