import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription, throwError} from "rxjs";
import {ProductDisplay} from "../store/cart/cart.reducer";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  querySubscribe: Subscription;
  noProducts: Boolean = false;
  page: number = 1;
  pageSize:number = 0;
  collectionSize: number = 0;
  keyword: string;
  canFetch: boolean = false;

  products: ProductDisplay[] = [];

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.pageSize = this.productService.searchPageSize;
  }

  ngOnInit() {
    this.querySubscribe = this.route.params.subscribe((params: Params) => {
      this.keyword = params['keyword'];
      this.productService.searchProductAll(this.keyword)
        .pipe(take(1), catchError(
          error => {
            alert('An error occurred loading products, Please refresh your page.')
            this.canFetch = false;
            return throwError(error);
          }
        ))
        .subscribe(data => {
          if(data === 0) {
            this.noProducts = true;
          }
          this.collectionSize = data;
          this.pageNavigation();
        });
    });
  }

  // @HostListener('window:scroll', ['$event'])
  // onScroll($event: Event): void {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //     console.log(this.canFetch);
  //     if (this.canFetch) {
  //       this.productService.searchProduct(this.page, this.keyword)
  //         .pipe(take(1), catchError(
  //           error => {
  //             this.canFetch = false;
  //             return throwError(error);
  //           }
  //         ))
  //         .subscribe(data => {
  //           this.products.push(...data);
  //           this.page++;
  //           if (data.length == 0) {
  //             this.canFetch = false;
  //           }
  //         });
  //     }
  //   }
  // }

  pageNavigation() {
    this.products = [];
    this.querySubscribe = this.route.params.subscribe((params: Params) => {
      this.keyword = params['keyword'];
      this.productService.searchProduct(this.page - 1, this.keyword)
        .pipe(take(1), catchError(
          error => {
            this.canFetch = false;
            return throwError(error);
          }
        ))
        .subscribe(data => {
          this.products = data;
          if (data.length !== 0) {
            this.canFetch = true;
          }
        });
    });
  }
}
