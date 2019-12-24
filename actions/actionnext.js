
export function changeState(updateToken){
    return dispatch=>{
     dispatch({type:'changeName',payload:updateToken})
     console.log('Aamir');
    }
    
 
 }