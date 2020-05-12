import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemDetailComponent} from './item-detail.component';
import {RouterModule} from '@angular/router';
import {ItemDetailRoutes} from './item-detail.routes';
import {RelatedComponent} from './related/related.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {JwPaginationComponent} from 'jw-angular-pagination';

import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import { InfoComponent } from './info/info.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ItemDetailRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxGalleryModule,
  ],
  declarations: [ItemDetailComponent, RelatedComponent, InfoComponent, JwPaginationComponent],
  providers: []
})
export class ItemDetailModule {
}
