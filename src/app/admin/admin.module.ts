import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';


import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MaterialModule} from './material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AdminhRoutes } from './admin.routes';

import { AdminComponent } from './admin.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';


import { ConfirmDialogComponent } from './shared/ui/confirm-dialog/confirm-dialog.component';
import { aCategoryReduecer } from './store/aCategory/aCategory.reducer';
import { aProductReduecer } from './store/aProduct/aProduct.reducer';
import { aAuthReduecer } from './store/aAuth/aAuth.reducer';
import { LoginComponent } from './login/login.component';

import { ProductService } from './services/product.service';
import { AuthService } from './services/auth.service';

import { ATokenInterceptor } from './services/atoken.interceptor';


@NgModule({
  declarations: [
    AdminComponent,
    ProductComponent,
    ProductListComponent,
    CategoryComponent,
    CategoryListComponent,
    ConfirmDialogComponent,
    LoginComponent
  ],
  imports: [
    MatNativeDateModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(
      'aCategory', aCategoryReduecer
    ),
    StoreModule.forFeature(
      'aProduct', aProductReduecer
    ),
    StoreModule.forFeature(
      'aAuth', aAuthReduecer
    ),
    RouterModule.forChild(AdminhRoutes)
  ],
  providers: [
    ProductService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ATokenInterceptor,
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {
        appearance: 'fill'
      }
    },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,  useValue: {
        color: 'accent'
      }
    }
  ],
  entryComponents: [
    ProductComponent,
    CategoryComponent,
    ConfirmDialogComponent
  ]
})
export class AdminModule { }
