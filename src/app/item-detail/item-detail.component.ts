import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import { HttpError } from '../store/app.reducers';
import * as CartActions from '../store/cart/cart.actions';
import { Cart, Product } from '../store/cart/cart.reducer';
import { Observable, Subscription, throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription;

  product: Product;

  cartState: Observable<{ cart: Cart; errors: HttpError[]; loading: boolean }>;
  inlineLoading: boolean = true;

  id: number;

  isPopState = false;
  fetchError: HttpErrorResponse = null;
  routerSubscription: Subscription;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locStrat: LocationStrategy,
    private productService: ProductService,
    private store: Store<fromApp.AppState>,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '550px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
          small: 'assets/gallery-test/1-small.jpeg',
          medium: 'assets/gallery-test/1-medium.jpeg',
          big: 'assets/gallery-test/1-big.jpeg'
      },
      {
          small: 'assets/gallery-test/2-small.jpeg',
          medium: 'assets/gallery-test/2-medium.jpeg',
          big: 'assets/gallery-test/2-big.jpeg'
      },
      {
          small: 'assets/gallery-test/3-small.jpeg',
          medium: 'assets/gallery-test/3-medium.jpeg',
          big: 'assets/gallery-test/3-big.jpeg'
      },
      {
          small: 'assets/gallery-test/3-small.jpeg',
          medium: 'assets/gallery-test/3-medium.jpeg',
          big: 'assets/gallery-test/3-big.jpeg'
      },
      {
          small: 'assets/gallery-test/3-small.jpeg',
          medium: 'assets/gallery-test/3-medium.jpeg',
          big: 'assets/gallery-test/3-big.jpeg'
      },
      {
          small: 'assets/gallery-test/3-small.jpeg',
          medium: 'assets/gallery-test/3-medium.jpeg',
          big: 'assets/gallery-test/3-big.jpeg'
      },
      {
          small: 'assets/gallery-test/3-small.jpeg',
          medium: 'assets/gallery-test/3-medium.jpeg',
          big: 'assets/gallery-test/3-big.jpeg'
      },
      {
          small: 'assets/gallery-test/3-small.jpeg',
          medium: 'assets/gallery-test/3-medium.jpeg',
          big: 'assets/gallery-test/3-big.jpeg'
      },
      {
          small: 'assets/gallery-test/3-small.jpeg',
          medium: 'assets/gallery-test/3-medium.jpeg',
          big: 'assets/gallery-test/3-big.jpeg'
      },
      {
          small: 'assets/gallery-test/3-small.jpeg',
          medium: 'assets/gallery-test/3-medium.jpeg',
          big: 'assets/gallery-test/3-big.jpeg'
      },
      {
          small: 'assets/gallery-test/3-small.jpeg',
          medium: 'assets/gallery-test/3-medium.jpeg',
          big: 'assets/gallery-test/3-big.jpeg'
      }
    ];
    this.locStrat.onPopState(() => {
      this.isPopState = true;
    });

    this.routerSubscription = this.router.events.subscribe((event) => {
      // Scroll to top if accessing a page, not via browser history stack
      if (event instanceof NavigationEnd && !this.isPopState) {
        window.scrollTo(0, 0);
        this.isPopState = false;
      }

      // Ensures that isPopState is reset
      if (event instanceof NavigationEnd) {
        this.isPopState = false;
      }
    });

    this.cartState = this.store.select('cart');
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.inlineLoading = true;
      this.productService
        .getFullProduct(this.id)
        .pipe(
          take(1),
          catchError((error) => {
            this.fetchError = error;
            this.inlineLoading = false;
            return throwError(error);
          })
        )
        .subscribe((data: Product) => {
          this.product = data;
          this.inlineLoading = false;
        });
    });
  }

  ngOnDestroy() {
    if (this.paramSubscription != null) {
      this.paramSubscription.unsubscribe();
    }
    if (this.routerSubscription != null) {
      this.routerSubscription.unsubscribe();
    }
  }

  addToCart(amount: HTMLInputElement) {
    const val = amount.value;
    let reg = new RegExp('^[0-9]+$');
    if (!reg.test(val) || parseInt(val) == 0) {
      alert('Please enter a valid amount.');
      return;
    }

    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((data) => {
        if (data.authenticated) {
          this.store.dispatch(
            new CartActions.AddToCart({ id: this.id, amount: val })
          );
        } else {
          this.router.navigate(['/login']);
        }
      });
  }

  open(content) {
    this.modalService.open(content);
  }
}
