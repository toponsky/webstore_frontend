import {Component, OnInit} from '@angular/core';
import * as AuthActions from "./store/auth/auth.actions";
import {Store} from "@ngrx/store";
import * as fromApp from "./store/app.reducers";
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean;
  constructor(private store: Store<fromApp.AppState>, public oktaAuth: OktaAuthService) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    this.store.dispatch(new AuthActions.CheckIfLoggedIn());
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  onActivate($event) {
    window.scroll(0, 0);
  }
}
