import {Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import { CategoryListComponent } from './category/category-list/category-list.component';

export const AdminhRoutes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: 'admin/category', component: CategoryListComponent }
];
