export interface aCategory  {
  _id: string;
  name: string;
}

export interface aCategoryStatus {
  list: aCategory[];
  loading: boolean;
  error: Error;
}

export interface aCategoryState {
  readonly aCategory: aCategoryStatus
}

