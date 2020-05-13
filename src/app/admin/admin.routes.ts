import {Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './services/auth.guard';
import { ReviewsComponent } from './reviews/reviews.component';

export const AdminhRoutes: Routes = [
  { path: 'admin/login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      { path: 'product', component: ProductListComponent },
      { path: 'category', component: CategoryListComponent },
      { path: 'reviews/:id', component: ReviewsComponent }
    ]
  }
];
