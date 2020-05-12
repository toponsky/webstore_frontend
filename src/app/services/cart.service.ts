import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cart, CartItem } from '../store/cart/cart.reducer';

@Injectable()
export class CartService {
  securedUrl: string = 'http://localhost:5500/v1/secured/cart';

  constructor(private httpClient: HttpClient) {}

  getCart() {
    return this.httpClient.get<Cart>(this.securedUrl);
  }

  postCart(productId: number, amount: string) {
    return this.httpClient.post<Cart>(this.securedUrl, {
      productId,
      amount,
    });
  }

  removeFromCart(id: string) {
    return this.httpClient.delete<Cart>(this.securedUrl, {
      params: new HttpParams().set('id', id),
    });
  }

  confirmCart(cart: Cart) {
    return this.httpClient.post(this.securedUrl + '/confirm', cart);
  }

  applyDiscount(code: string) {
    return this.httpClient.get<Cart>(this.securedUrl + '/discount', {
      params: new HttpParams().set('code', code),
    });
  }

  emptyCart() {
    return this.httpClient.delete(this.securedUrl);
  }

  updateCartItemAmount(id: string, amount: number) {
    return this.httpClient.post<CartItem>(
      this.securedUrl + '/cartitem/amount',
      {
        itemId: id,
        amount,
      }
    );
  }
}
