import { aCategory } from '../aCategory/aCategory.model';

export interface aProduct {
  cartDesc: string;
  id: number;
  image: string;
  live: number;
  longDesc: string;
  name: string;
  price: number;
  cargoPrice: number;
  taxPercent: number;
  productCategory:aCategory;
  sku: string;
  stock: number;
  unlimited: number;
}

export interface aProductStatus {
  list: aProduct[];
  loading: boolean;
  error: Error;
}

export interface aProductState {
  readonly aProduct: aProductStatus
}

