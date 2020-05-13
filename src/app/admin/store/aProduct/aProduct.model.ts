import { aCategory } from '../aCategory/aCategory.model';


export interface aProductReview {
  id: string;
  productId: string;
  custName: string;
  date: Date;
  comment: string;
  rating: number;
}


export interface aProduct {
  _id: string;
  sku: string;
  name: string;
  price: number;
  cargo_price: string;
  tax_percent: number;
  cart_desc: string;
  details: string;
  short_desc: string;
  long_desc: string;
  thumb: string;
  image: string;
  images: string;
  category: string;
  stock: number;
  sell_count: number;
  live: boolean;
  unlimited: boolean;
  date_created: Date;
  last_updated: Date;
}

export interface aProductStatus {
  list: aProduct[];
  loading: boolean;
  error: Error;
}

export interface aProductState {
  readonly aProduct: aProductStatus
}

