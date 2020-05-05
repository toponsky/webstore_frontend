import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryService } from '../services/category.service';
import { NotificationService } from '../services/notification.service';
import { MatDialogRef } from '@angular/material';
import { aCategoryState } from '../store/aCategory/aCategory.model';
import { UpdateCategoryAction, AddCategoryAction } from '../store/aCategory/aCategory.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  constructor(public service: CategoryService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<CategoryComponent>,
              private store: Store<aCategoryState>
          ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (this.service.form.get('_id').value) {
        this.store.dispatch(new UpdateCategoryAction(
          this.service.form.value,
          () => {
            this.notificationService.showSuccessMsg('Category Updated');
            this.onClose('success');
          },
          () => {
            this.onClose('fail');
          }));
      } else {
        this.store.dispatch(new AddCategoryAction(
          this.service.form.value,
          () => {
            this.notificationService.showSuccessMsg('Category Saved');
            this.onClose('success');
          },
          () => {
            this.onClose('fail');
          }));
      }
    }
  }

  onClear() {
    this.service.form.reset();
    this.service.initialzeFormGroup();
  }

  onClose(result: string) {
    this.service.form.reset();
    this.service.initialzeFormGroup();
    this.dialogRef.close(result);
  }

}
