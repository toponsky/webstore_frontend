import {Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {ProductComponent} from './product/product.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import { CategoryListComponent } from './category/category-list/category-list.component';

export const AdminhRoutes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: 'admin/product', component: ProductListComponent },
  {path: 'admin/category', component: CategoryListComponent }
];
