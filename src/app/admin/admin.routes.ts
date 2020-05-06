import {Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import { CategoryListComponent } from './category/category-list/category-list.component';

export const AdminhRoutes: Routes = [
  {path: 'admin', component: LoginComponent},
  {path: 'admin/product', component: ProductListComponent },
  {path: 'admin/category', component: CategoryListComponent }
];
