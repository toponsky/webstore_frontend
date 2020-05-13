import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


import { ReviewService } from '../services/review.service';
import { aProductReview } from '../store/aProduct/aProduct.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  paramSubscription: Subscription;

  id: string;
  fetchError: HttpErrorResponse = null;
  inlineLoading = true;
  listData: MatTableDataSource<any> = new MatTableDataSource();

  // public form: FormGroup = new FormGroup({
  //   _id: new FormControl(null),
  //   user: new FormControl(null),
  //   prodId: new FormControl(null),
  //   comment: new FormControl('', [Validators.required]),
  //   rating: new FormControl('', Validators.required),
  // });
  displayedColumns: string[] = ['customer', 'comment', 'rating'];
  searchKey: string;
  constructor(private route: ActivatedRoute,
              private reviewService: ReviewService) { }

  ngOnInit() {

    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.reviewService
        .getProductReviews(this.id)
        .pipe(
          take(1),
          catchError((error) => {
            this.fetchError = error;
            this.inlineLoading = false;
            return throwError(error);
          })
        )
        .subscribe((data: aProductReview[]) => {
          this.listData.data = data;
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.inlineLoading = false;
        });
    });
  }

  ngOnDestroy() {
    if (this.paramSubscription != null) {
      this.paramSubscription.unsubscribe();
    }
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
