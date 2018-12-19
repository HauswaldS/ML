import {Action} from "@ngrx/store";

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const TRY_REFRESH_ACCESS_TOKEN = 'TRY_REFRESH_ACCESS_TOKEN';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class SignUp implements Action {
  readonly type = SIGNUP;

  constructor() {
  }
}

export class SignIn implements Action {
  readonly type = SIGNIN;

  constructor() {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor() {
  }
}

export class SetAccessToken implements Action {
  readonly type = SET_ACCESS_TOKEN;

  constructor(public access_token: string, public expires_at: number) {
  }
}


export class SetRefreshToken implements Action {
  readonly type = SET_REFRESH_TOKEN;

  constructor(public refresh_token: string) {
  }
}

//TODO: Implement refresh token flow
// export class TryRefreshAccessToken implements Action {
//   readonly type = TRY_REFRESH_ACCESS_TOKEN;
//
//   constructor() {
//   }
// }


export type AuthActions =
  TrySignup
  | TrySignin
  | SignUp
  | SignIn
  | Logout
  | SetAccessToken
  | SetRefreshToken

