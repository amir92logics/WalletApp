// import { ADD_PLACE } from './types';
import { ADD_INCOME } from './types';
export const incomeState = incomeName => {
  return {
    type: ADD_INCOME,
    payload: incomeName
  }
}