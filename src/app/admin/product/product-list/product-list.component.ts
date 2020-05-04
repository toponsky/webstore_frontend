import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProductComponent } from '../product.component';
import { aProduct, aProductState } from '../../store/aProduct/aProduct.model';
import { LoadProductAction } from '../../store/aProduct/aProduct.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  loading: Observable<boolean>;
  error: Observable<Error>;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'cartDesc', 'price', 'cargoPrice', 'category', 'actions'];
  searchKey: string;

  constructor(private productService: ProductService,
              private dialog: MatDialog,
              private store: Store<aProductState>) { }

  ngOnInit() {
    this.store.select(store => store.aProduct.list).subscribe(
      items => {
        this.listData = new MatTableDataSource(items);
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ProductComponent, dialogConfig);
  }

  onEditProduct(row: aProduct) {
  }
}
