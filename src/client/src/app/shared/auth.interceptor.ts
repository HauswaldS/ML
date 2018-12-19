import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

import {Inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions} from "@ngrx/effects";
import {Observable} from "rxjs";
import {switchMap, take} from "rxjs/operators";

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject('BASE_URL') private baseUrl: string,
              private actions$: Actions,
              private store: Store<fromApp.AppState>) {
  }

// TODO: DRY and find a better pattern
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(this.baseUrl)) {
      return this.store.select('auth')
        .pipe(take(1))
        .pipe(switchMap((authState: fromAuth.State) => {
          if (authState.token.access_token) {
            const isValid = Date.now() < authState.token.expires_at;
            if (isValid) {
              const copiedReq = req.clone({headers: req.headers.append('Authorization', `Bearer ${authState.token.access_token}`)});
              return next.handle(copiedReq);
            } else {
              return next.handle(req);
            }
          } else {
            return next.handle(req)
          }
        }))
    } else {
      return next.handle(req);
    }
  }
}
