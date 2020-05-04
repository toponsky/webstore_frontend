import { createSelector } from '@ngrx/store';
import { aCategory, aCategoryState } from './aCategory.model';


export function getState(state: aCategoryState): aCategoryState {
  return state;
}

export function fetchCategories(state: aCategoryState): aCategory[] {
  debugger
  return state.aCategory.list;
}

export const getCategories = createSelector(getState, fetchCategories);
