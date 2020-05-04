import { Action } from '@ngrx/store';
import { aCategory } from './aCategory.model';

export enum aCategoryActitonTypes {
  LONDING_CATEGORY = '[aCategory] Load Admin Category',
  LONDING_CATEGORY_SUCCESS = '[aCategory] Load Admin Category Success',
  LONDING_CATEGORY_FAILURE = '[aCategory] Load Admin Category Failure',
  ADD_CATEGORY = '[aCategory] Add Category',
  ADD_CATEGORY_SUCCESS = '[aCategory] Add Category Success',
  ADD_CATEGORY_FAILURE = '[aCategory] Add Category Failure',
  UPDATE_CATEGORY = '[aCategory] Update Category',
  UPDATE_CATEGORY_SUCCESS = '[aCategory] Update Category Success',
  UPDATE_CATEGORY_FAILURE = '[aCategory] Update Category Failure',
  DELETE_CATEGORY = '[aCategory] Delete Category',
  DELETE_CATEGORY_SUCCESS = '[aCategory] Delete Category Success',
  DELETE_CATEGORY_FAILURE = '[aCategory] Delete Category Failure'
}

// Loading actions
export class LoadCategoryAction implements Action {
  readonly type: string = aCategoryActitonTypes.LONDING_CATEGORY;

  constructor(public payload?: string, public success?, public failure?) {}
}

export class LoadCategorySuccessAction implements Action {
  readonly type: string = aCategoryActitonTypes.LONDING_CATEGORY_SUCCESS;

  constructor(public payload: Array<aCategory>) {}
}
export class LoadCategoryFailureAction implements Action {
  readonly type: string = aCategoryActitonTypes.LONDING_CATEGORY_FAILURE;

  constructor(public payload: Error) {}
}


// adding actions
export class AddCategoryAction implements Action {
  readonly type: string = aCategoryActitonTypes.ADD_CATEGORY;

  constructor(public payload: aCategory, public success?, public failure?) {}
}
export class AddCategorySuccessAction implements Action {
  readonly type: string = aCategoryActitonTypes.ADD_CATEGORY_SUCCESS;

  constructor(public payload: aCategory) {}
}
export class AddCategoryFailureAction implements Action {
  readonly type: string = aCategoryActitonTypes.ADD_CATEGORY_FAILURE;

  constructor(public payload: Error) {}
}

// update actions
export class UpdateCategoryAction implements Action {
  readonly type: string = aCategoryActitonTypes.UPDATE_CATEGORY;

  constructor(public payload: aCategory, public success?, public failure?) {}
}
export class UpdateCategorySuccessAction implements Action {
  readonly type: string = aCategoryActitonTypes.UPDATE_CATEGORY_SUCCESS;

  constructor(public payload: aCategory) {}
}
export class UpdateCategoryFailureAction implements Action {
  readonly type: string = aCategoryActitonTypes.UPDATE_CATEGORY_FAILURE;

  constructor(public payload: Error) {}
}


// delete actions
export class DeleteCategoryAction implements Action {
  readonly type: string = aCategoryActitonTypes.DELETE_CATEGORY;

  constructor(public payload: string, public success?, public failure?) {}
}
export class DeleteCategorySuccessAction implements Action {
  readonly type: string = aCategoryActitonTypes.DELETE_CATEGORY_SUCCESS;

  constructor(public payload: string) {}
}
export class DeleteCategoryFailureAction implements Action {
  readonly type: string = aCategoryActitonTypes.DELETE_CATEGORY_FAILURE;

  constructor(public payload: string) {}
}


export type aCategoryAction =
      LoadCategoryAction |
      LoadCategorySuccessAction |
      LoadCategoryFailureAction |
      AddCategoryAction |
      AddCategorySuccessAction |
      AddCategoryFailureAction |
      UpdateCategoryAction |
      UpdateCategorySuccessAction |
      UpdateCategoryFailureAction |
      DeleteCategoryAction |
      DeleteCategorySuccessAction |
      DeleteCategoryFailureAction;
