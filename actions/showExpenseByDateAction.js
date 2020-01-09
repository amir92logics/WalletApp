import { ADD_EXPENSE_BY_DATE } from './types';
export const showExpenseByDateAction = (data) => {
  return {
    type: ADD_EXPENSE_BY_DATE,
    payload: data
  }
}