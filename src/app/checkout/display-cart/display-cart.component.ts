import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Cart} from '../../store/cart/cart.reducer';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import {HttpError} from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import * as CartActions from '../../store/cart/cart.actions';
import * as OrderActions from '../../store/order/order.actions';
import * as AuthActions from '../../store/auth/auth.actions';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-display-cart',
  templateUrl: './display-cart.component.html',
  styleUrls: ['./display-cart.component.css']
})
export class DisplayCartComponent implements OnInit, OnDestroy {

  cartState: Observable<{ cart: Cart, errors: HttpError[], loading: boolean }>;

  cartPriceSubscription: Subscription;
  cartPrice: number;

  applyCodeShow: boolean = false;


  constructor(private store: Store<fromApp.AppState>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.cartState = this.store.select('cart');
    this.cartPriceSubscription = this.cartState.subscribe(
      (data) => {
        let cp = 0;
        data.cart.cartItemList.forEach(cartItem => {
          const product = cartItem.cartProduct;
          cp += (product.price * cartItem.amount);
          this.cartPrice = cp;
        });
      });
  }

  ngOnDestroy() {
    if (this.cartPriceSubscription != null) {
      this.cartPriceSubscription.unsubscribe();
    }
  }

  applyCode(discountCodeField: HTMLInputElement) {
    const discountCode = discountCodeField.value;
    this.store.dispatch(new CartActions.ApplyDiscount(discountCode));

  }

  goToItem(id) {
    this.router.navigate(['/detail/', id], {relativeTo: this.route});
  }

  UpdateCartItemAmount(id, amount: number) {
    if(amount <= 0) {
      this.store.dispatch(new CartActions.RemoveFromCart(id));
    } else {
      this.store.dispatch(new CartActions.UpdateCartItemAmount({ id, amount }));
    }
  }

  removeFromCart(id) {
    this.store.dispatch(new CartActions.RemoveFromCart(id));
  }

  activatePurchase() {
    this.store.select('auth')
      .pipe(take(1))
      .subscribe(data => {
        if (data.isActive) {
          this.store.dispatch(new OrderActions.IsPurchaseActive(true));
          this.router.navigate(['form'], {relativeTo: this.route});
        } else {
          this.store.dispatch(new AuthActions.FetchVerificationStatus());
          alert('Your account is inactive. You must activate your account in order to purchase.\nPlease check your email.');
        }
      });

  }
}
