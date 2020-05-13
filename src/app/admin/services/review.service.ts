import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { aProductReview } from '../store/aProduct/aProduct.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  url: string = environment.backendUrl.admin + 'review';
  constructor(private httpClient: HttpClient) { }

  getProductReviews(prodId: string) {
    return this.httpClient.get<aProductReview[]>(this.url,
      {
        params: new HttpParams().set('prodId', prodId)
      });
  }

}
