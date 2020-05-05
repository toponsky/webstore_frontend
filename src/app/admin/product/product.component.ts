import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { AddProductAction, UpdateProductAction } from '../store/aProduct/aProduct.actions';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { NotificationService } from '../services/notification.service';
import { aProductState } from '../store/aProduct/aProduct.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  categories = [];
  constructor(public service: ProductService,
              private categoryService: CategoryService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<ProductComponent>,
              private store: Store<aProductState>
              ) { }

  ngOnInit() {
    this.categoryService.list().subscribe(
      categories => {
        this.categories = categories;
      }
    );
  }

  onClear() {
    this.service.form.reset();
    this.service.initialzeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (this.service.form.get('_id').value) {
        this.store.dispatch(new UpdateProductAction(
          this.service.form.value,
          () => {
            this.notificationService.showSuccessMsg('Category Updated');
            this.onClose('success');
          }));
      } else {
        this.store.dispatch(new AddProductAction(
          this.service.form.value,
          () => {
            this.notificationService.showSuccessMsg('Category Saved');
            this.onClose('success');
          }));
      }
    }
  }

  onClose(msg: string) {
    this.service.form.reset();
    this.service.initialzeFormGroup();
    this.dialogRef.close(msg);
  }
}
