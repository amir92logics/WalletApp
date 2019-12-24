// import { ADD_PLACE } from './types';
import { ADD_EXPENSEARRAY } from './types';
export const expenseArrayState = incomeName => {
  return {
    type: ADD_EXPENSEARRAY,
    payload: incomeName
  }
}