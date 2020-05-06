import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { aAuthState } from '../store/aAuth/aAuth.model';
import { AuthAction } from '../store/aAuth/aAuth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';

  loading: Observable<boolean>;
  error: Observable<Error>;

  constructor(private store: Store<aAuthState>) {
  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      'password': new FormControl(null, Validators.required),
    });

    this.loading = this.store.select(store => store.aAuth.loading);
    this.error = this.store.select(store => store.aAuth.error);

  }


  onSubmit() {
    debugger
    this.store.dispatch(new AuthAction({
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    }));
  }

}
