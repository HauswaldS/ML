import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import * as fromAuth from './store/auth.reducers';
import * as AuthActions from './store/auth.actions';

import {Store} from "@ngrx/store";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isSigningUp: boolean = false;
  authForm: FormGroup;

  constructor(private store: Store<fromAuth.FeatureState>) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    if (this.authForm.valid) {
      const payload = {
        email: this.authForm.value.email,
        password: this.authForm.value.password
      };

      if (this.isSigningUp) {
        this.store.dispatch(new AuthActions.TrySignup(payload));
      } else {
        this.store.dispatch(new AuthActions.TrySignin(payload));
      }
    }
  }
}
