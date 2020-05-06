import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProductComponent } from '../product.component';
import { aProduct, aProductState } from '../../store/aProduct/aProduct.model';
import { LoadProductAction, DeleteProductAction } from '../../store/aProduct/aProduct.actions';
import { DialogService } from '../../services/dialog.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  dialogConfig = new MatDialogConfig();
  loading: Observable<boolean>;
  error: Observable<Error>;
  listData: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'cartDesc', 'price', 'cargoPrice', 'category', 'actions'];
  searchKey: string;

  constructor(private service: ProductService,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private dialog: MatDialog,
              private store: Store<aProductState>) {
                this.dialogConfig.disableClose = true;
                this.dialogConfig.autoFocus = true;
                this.dialogConfig.width = '60%';
              }

  ngOnInit() {
    this.store.select(store => store.aProduct.list).subscribe(
      items => {
        this.listData.data = items;
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );
    this.loading = this.store.select(store => store.aProduct.loading);
    this.error = this.store.select(store => store.aProduct.error);
    this.store.dispatch(new LoadProductAction());
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  onCreateProduct() {
    this.dialog.open(ProductComponent, this.dialogConfig);
  }

  onEdit(row: aProduct) {
    this.service.populateForm(row);
    this.dialog.open(ProductComponent, this.dialogConfig);
  }

  onDelete(_id: string) {
    this.dialogService.openConfirmDialog('Are you sure to delete this product?')
      .afterClosed().subscribe(res => {
        if(res) {
          this.store.dispatch(new DeleteProductAction(
            _id,
            () => {
              this.notificationService.showSuccessMsg('Product Deleted');
            }
          ));
        }
      });
  }
}
