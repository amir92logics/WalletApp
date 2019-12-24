// import { ADD_PLACE } from './types';
import { ADD_INCOMEARRAY } from './types';
export const incomeArrayState = incomeName => {
  return {
    type: ADD_INCOMEARRAY,
    payload: incomeName
  }
}