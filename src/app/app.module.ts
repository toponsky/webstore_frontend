import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {HeaderModule} from './header/header.module';
import {HomeModule} from './home/home.module';
import {AuthModule} from './auth/auth.module';
import {FooterModule} from './footer/footer.module';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {AppRoutes} from './app.routes';
import {GPageNotFoundComponent} from './g-page-not-found/g-page-not-found.component';
import {AdminModule} from './admin/admin.module';
import {BrowseModule} from './browse/browse.module';
import {ItemDetailModule} from './item-detail/item-detail.module';
import {CheckoutModule} from './checkout/checkout.module';
import {SearchModule} from './search/search.module';
import {ProductService} from './services/product.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/app.reducers';
import {CartEffects} from './store/cart/cart.effects';
import {OrderEffects} from './store/order/order.effects';
import {CartService} from './services/cart.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {OrderService} from './services/order.service';
import {TokenService} from './services/token.service';

import {AuthEffects} from './store/auth/auth.effects';
import {TokenInterceptor} from './services/token.interceptor';
import {AuthGuardService} from './services/auth-guard.service';
import {ShowcaseEffects} from './store/showcase/showcase.effects';
import {AccountService} from './services/account.service';
import {BrowseEffects} from './store/browse/browse.effects';
import {VerificationModule} from './verification/verification.module';
import {NonAuthGuardService} from './services/non-auth-guard.service';

import {
  OKTA_CONFIG,
  OktaAuthModule,
} from '@okta/okta-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { aCategoryEffects } from './admin/store/aCategory/aCategory.effects';
import { aProductEffects } from './admin/store/aProduct/aProduct.effects';

@NgModule({
  declarations: [
    AppComponent,
    GPageNotFoundComponent
  ],
  imports: [
    AdminModule,
    BrowserModule,
    HeaderModule,
    HomeModule,
    BrowseModule,
    ItemDetailModule,
    CheckoutModule,
    // AccountModule, lazy loaded module not imported here
    VerificationModule,
    SearchModule,
    AuthModule,
    // FaqModule, lazy loaded module not imported here
    FooterModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      CartEffects,
      OrderEffects,
      AuthEffects,
      ShowcaseEffects,
      BrowseEffects,
      aCategoryEffects,
      aProductEffects
    ]),
    RouterModule.forRoot(AppRoutes, {useHash: false, preloadingStrategy: PreloadAllModules}),
    OktaAuthModule,
    BrowserAnimationsModule
  ],
  providers: [ProductService, CartService, OrderService, TokenService, AuthGuardService, NonAuthGuardService, AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, {
      provide: OKTA_CONFIG, useValue: environment.oktaConfig
    }
  ],
  bootstrap: [AppComponent],schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule {
}
