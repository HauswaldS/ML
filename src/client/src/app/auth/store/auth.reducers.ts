import * as AuthActions from './auth.actions';

export interface State {
  token: {
    refresh_token: string
    access_token: string,
    expires_at: number,
  };
  isAuthenticated: boolean;
}

const initialState = {
  token: {
    refresh_token: '',
    access_token: '',
    expires_at: 0
  },
  isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.SIGNUP):
    case (AuthActions.SIGNIN):
      return {...state, isAuthenticated: true};
    case (AuthActions.LOGOUT):
      return {...state, isAuthenticated: false};
    case (AuthActions.SET_ACCESS_TOKEN):
      return {
        ...state,
        token: {...state.token, access_token: action.access_token, expires_at: (Date.now() + action.expires_at)}
      };
    case (AuthActions.SET_REFRESH_TOKEN):
      return {...state, token: {...state.token, refresh_token: action.refresh_token}};
    default:
      return state
  }
}


