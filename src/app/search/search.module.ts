import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search.component';
import {RouterModule} from "@angular/router";
import {SearchRoutes} from "./search.routes";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(SearchRoutes)
  ],
  declarations: [SearchComponent]
})
export class SearchModule {
}
