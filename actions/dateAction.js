// import { ADD_PLACE } from './types';
import { ADD_DATE } from './types';
export const dateState = incomeName => {
  return {
    type: ADD_DATE,
    payload: incomeName
  }
}