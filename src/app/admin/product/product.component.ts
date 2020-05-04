import { Component, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { NotificationService } from '../services/notification.service';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  departments = [];
  constructor(public productService: ProductService,
              private categoryService: CategoryService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<ProductComponent>) { }

  ngOnInit() {
    this.categoryService.list().subscribe(
      categoryList => {
        this.departments = categoryList;
      }
    );
  }

  onClear() {
    this.productService.form.reset();
    this.productService.initialzeFormGroup();
    //this.notificationService.success(":: success");
  }

  onSubmit() {
    if(this.productService.form.valid) {
      //this.productService.insertProduct(this.productService.form.value);
      this.productService.form.reset();
      this.productService.initialzeFormGroup();
      this.onClear
    }
  }

  onClose() {
    this.productService.form.reset();
    this.productService.initialzeFormGroup();
    this.dialogRef.close();
  }
}
