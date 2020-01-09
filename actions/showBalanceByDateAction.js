import { ADD_BALANCE_BY_DATE } from './types';
export const showBalanceByDateAction = (data) => {
  return {
    type: ADD_BALANCE_BY_DATE,
    payload: data
  }
}