import { ADD_INCOME_CATEGORY } from './types';
export const incomeCategoryAction = (data) => {
  return {
    type: ADD_INCOME_CATEGORY,
    payload: data
  }
}