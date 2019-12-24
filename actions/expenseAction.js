// import { ADD_PLACE } from './types';
import { ADD_EXPENSE } from './types';
export const expenseState = incomeName => {
  return {
    type: ADD_EXPENSE,
    payload: incomeName
  }
}