import { ADD_PLACE } from './types';

export const addPlace = placeName => {
  return {
    type: ADD_PLACE,
    payload: placeName
  }
}
// export function addPlace(updateToken){
//     return dispatch=>{
//      dispatch({type:'changeName',payload:updateToken})
//      console.log('Aamir');
//     }
    
 
//  }