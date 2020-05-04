import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationService } from '../../services/notification.service';
import { CategoryComponent } from '../category.component';
import { LoadCategoryAction, DeleteCategoryAction } from '../../store/aCategory/aCategory.actions';
import { aCategory, aCategoryState } from '../../store/aCategory/aCategory.model';
import { DialogService } from '../../services/dialog.service';

import { getCategories } from '../../store/aCategory/aCategory.selector';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dialogConfig: MatDialogConfig;

  // categoryItems: Observable<aCategory[]>;
  loading: Observable<boolean>;
  error: Observable<Error>;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'actions'];
  searchKey: string;

  constructor(
        private service: CategoryService,
        private notificationService: NotificationService,
        private dialog: MatDialog,
        private store: Store<aCategoryState>,
        private dialogService: DialogService
  ) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = '60%';
  }

  ngOnInit() {
    this.store.select(store => store.aCategory.list).subscribe(
      items => {
        this.listData = new MatTableDataSource(items);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );
    // this.store.select(getCategories).subscribe(
    // ()=>{

    // }      
    // );
    this.loading = this.store.select(store => store.aCategory.loading);
    this.error = this.store.select(store => store.aCategory.error);
    this.store.dispatch(new LoadCategoryAction());
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.dialog.open(CategoryComponent, this.dialogConfig);
  }

  onEdit(row: aCategory) {
    this.service.populateForm(row);
    this.dialog.open(CategoryComponent, this.dialogConfig);
  }

  onDelete(_id: string) {
    this.dialogService.openConfirmDialog('Are you sure to delete this category?')
      .afterClosed().subscribe(res => {
        if(res) {
          this.store.dispatch(new DeleteCategoryAction(
            _id,
            () => {
              this.notificationService.showSuccessMsg('Category Deleted');
            }
          ));
        }
      });
  }
}
