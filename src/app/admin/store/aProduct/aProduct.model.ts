import { aCategory } from '../aCategory/aCategory.model';

export interface aProduct {
  _id: string;
  sku: string;
  name: string;
  price: number;
  cargo_price: string;
  tax_percent: number;
  cart_desc: string;
  long_desc: string;
  thumb: string;
  image: string;
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

