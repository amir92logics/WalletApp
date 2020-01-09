// import { ADD_PLACE } from './types';
import { ADD_EXPENSE_SUM } from './types';
export const showExpenseSumByDateAction = data => {
  return {
    type: ADD_EXPENSE_SUM,
    payload: data
  }
}