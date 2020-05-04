import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AdminhRoutes } from "./admin.routes";


import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MatNativeDateModule} from '@angular/material/core';
import {MaterialModule} from './material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {HttpClientModule} from "@angular/common/http";


import { AdminComponent } from './admin.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';

import { StoreModule } from '@ngrx/store';
import { ConfirmDialogComponent } from './shared/ui/confirm-dialog/confirm-dialog.component';
import { aCategoryReduecer } from './store/aCategory/aCategory.reducer';
import { aProductReduecer } from './store/aProduct/aProduct.reducer';



@NgModule({
  declarations: [
    AdminComponent,
    ProductComponent,
    ProductListComponent,
    CategoryComponent,
    CategoryListComponent,
    ConfirmDialogComponent
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
    RouterModule.forChild(AdminhRoutes)
  ],
  providers: [ProductService,
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
