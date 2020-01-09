// import { ADD_PLACE } from './types';
import { ADD_INCOME_SUM } from './types';
export const showIncomeSumByDateAction = data => {
  return {
    type: ADD_INCOME_SUM,
    payload: data
  }
}