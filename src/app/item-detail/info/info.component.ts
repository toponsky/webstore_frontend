import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducers';
import { ProductService } from '../../services/product.service';
import { ProductReview, FetchProductReview, AddProductView } from 'src/app/store/productreview/productreview.actions';
import { StarRating } from '../../store/productreview/productreview.actions';
import { Product } from 'src/app/store/cart/cart.reducer';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, OnDestroy {

  @Input() product: Product;
  starRate: StarRating;
  public form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    user: new FormControl(null),
    prodId: new FormControl(null),
    comment: new FormControl('', [Validators.required]),
    rating: new FormControl('', Validators.required),
  });
  starNumber = 5;
  id: string;
  isSubmitReivew = false;
  authenticated = false;
  reviewListSubscription: Subscription;
  paramSubscription: Subscription;
  reviewList: ProductReview[];
  pageOfItems: Array<any>;
  loading: Observable<boolean>;
  constructor(private productService: ProductService,
              private store: Store<fromApp.AppState>,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.reviewListSubscription = this.store.select(store => store.productreview.list).subscribe(
      data => {
        this.reviewList = data;
        this._updateRateData(data);
      }
    );
    this.loading = this.store.select(store => store.productreview.loading);
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.store.dispatch(new FetchProductReview(this.id));
      this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((data) => {
        this.authenticated = data.authenticated;
        this.isSubmitReivew = false;
      });
    });
  }

  ngOnDestroy() {
    if (this.paramSubscription != null) {
      this.paramSubscription.unsubscribe();
    }
    if (this.reviewListSubscription != null) {
      this.reviewListSubscription.unsubscribe();
    }
  }

  onSubmit() {
    const values = this.form.value;
    values.prodId = this.id;
    this.store.dispatch(new AddProductView(values));
    this.isSubmitReivew = true;
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  getStarNumber(startNumber, isEmpty): number[] {
    let sNumber = startNumber;
    if (isEmpty) {
      sNumber = this.starNumber - startNumber;
    }
    return [...Array(sNumber).keys()];
  }

  applyStarPer(starNumber) {
    const styles = { width : '0%'};
    switch (starNumber) {
      case 1:
        styles.width = this.starRate.OneStarPer + '%';
        break;
      case 2:
        styles.width = this.starRate.TwoStarPer + '%';
        break;
      case 3:
        styles.width = this.starRate.ThreeStarPer + '%';
        break;
      case 4:
        styles.width = this.starRate.FourStarPer + '%';
        break;
      case 5:
        styles.width = this.starRate.FiveStarPer + '%';
        break;
    }

    return styles;
  }

  _updateRateData(items: ProductReview[]) {
    this.starRate = {
      OneStar: 0,
      OneStarPer: 0,
      TwoStar: 0,
      TwoStarPer: 0,
      ThreeStar: 0,
      ThreeStarPer: 0,
      FourStar: 0,
      FourStarPer: 0,
      FiveStar: 0,
      FiveStarPer: 0,
      SumSart: 0
    };
    let sumStar = 0;
    items.forEach(item => {
      switch (item.rating) {
        case 1:
          this.starRate.OneStar += 1;
          break;
        case 2:
          this.starRate.TwoStar += 1;
          break;
        case 3:
          this.starRate.ThreeStar += 1;
          break;
        case 4:
          this.starRate.FourStar += 1;
          break;
        case 5:
          this.starRate.FiveStar += 1;
          break;
      }
      sumStar += item.rating;
    });
    this.starRate.OneStarPer = Math.round((this.starRate.OneStar / items.length) * 100);
    this.starRate.TwoStarPer = Math.round((this.starRate.TwoStar / items.length) * 100);
    this.starRate.ThreeStarPer = Math.round((this.starRate.ThreeStar / items.length) * 100);
    this.starRate.FourStarPer = Math.round((this.starRate.FourStar / items.length) * 100);
    this.starRate.FiveStarPer = Math.round((this.starRate.FiveStar / items.length) * 100);
    this.starRate.SumSart = Math.round(5 * (sumStar / (items.length * 5)));
  }

}
