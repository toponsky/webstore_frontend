import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {NgbDropdownMenu} from '@ng-bootstrap/ng-bootstrap';
import * as fromApp from '../store/app.reducers';
import {HttpError} from '../store/app.reducers';
import * as CartActions from '../store/cart/cart.actions';
import * as AuthActions from '../store/auth/auth.actions';
import {Observable, Subscription} from 'rxjs';
import {Cart} from '../store/cart/cart.reducer';
import {Router} from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild(NgbDropdownMenu, {static: true}) caseCodeDropdown: NgbDropdownMenu;
  private isOpen = '';
  cartState: Observable<{ cart: Cart, errors: HttpError[], loading: boolean }>;
  cartItemCountSubscription: Subscription;
  cartItemCount: number = 0;
  isCollapsed: boolean = true;

  authState: Observable<{ authenticated: boolean, isActive: boolean }>;
  authStateSubscription: Subscription;
  innerAuthState: boolean = false;

  constructor(private store: Store<fromApp.AppState>, private router: Router, public dropdownConfig: NgbDropdownConfig) {
    dropdownConfig.placement = 'bottom-right';
  }

  ngOnInit() {

    this.authState = this.store.select('auth');
    this.cartState = this.store.select('cart');

    this.authStateSubscription = this.authState
      .subscribe(
        (data) => {
          if (data.authenticated && !this.innerAuthState) {
            this.innerAuthState = true;
            this.store.dispatch(new CartActions.FetchCart());
            this.cartItemCountSubscription = this.cartState.subscribe(resData => {
              let totalCount = 0;
              resData.cart.cartItemList.forEach(cartItem => {
                totalCount += cartItem.amount;
              });
              this.cartItemCount = totalCount;
            });
          } else if (!data.authenticated) {
            this.innerAuthState = false;
            this.cartItemCount = 0;
            if (this.cartItemCountSubscription != null) {
              this.cartItemCountSubscription.unsubscribe();
            }
          }
        }
      );

  }

  ngOnDestroy() {
    if (this.authStateSubscription != null) {
      this.authStateSubscription.unsubscribe();
    }
    if (this.cartItemCountSubscription != null) {
      this.cartItemCountSubscription.unsubscribe();
    }
  }


  userSignOut() {
    this.store.dispatch(new AuthActions.SignOut());
    this.router.navigate(['/']);
  }


  searchProduct(search: HTMLInputElement) {
    if (search.value.trim().length === 0) {
      return;
    }
    let url = '/search/' + search.value;

    this.router.navigate([url]);
  }

  toggled(event) {
    if (event) {
        console.log('is open');
        this.isOpen = 'is open';
    } else {
      console.log('is closed');
      this.isOpen = 'is closed';
    }
  }
}
