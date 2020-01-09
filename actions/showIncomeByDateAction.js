import { ADD_INCOME_BY_DATE } from './types';
export const showIncomeByDateAction = (data) => {
  return {
    type: ADD_INCOME_BY_DATE,
    payload: data
  }
}