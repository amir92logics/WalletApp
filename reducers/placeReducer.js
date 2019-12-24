import {ADD_INCOME_CATEGORY, ADD_EXPENSE_CATEGORY, ADD_DATE, ADD_PLACE, ADD_INCOME,ADD_INCOMEARRAY,ADD_EXPENSE,ADD_EXPENSEARRAY } from '../actions/types';
import moment from 'moment';

const initialState = {
  Income: [],
  allIncomes: 0,
  Expense: [],
  allExpenses: 0,
  places: [],
  date:[],
  // date:moment().format("L"),
  allIncomeCategory:[],
  allExpenseCategory:[]
};

const placeReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_INCOME_CATEGORY:
     
    console.log('ADD_INCOME_CATEGORY Reducer');  
    return {
        ...state,
        // places: state.places.concat({
        //   key: Math.random(),
        allIncomeCategory: action.payload
        // })
      };
      case ADD_EXPENSE_CATEGORY:
     
        console.log('ADD_INCOME_CATEGORY Reducer');  
        return {
            ...state,
            // places: state.places.concat({
            //   key: Math.random(),
            allExpenseCategory: action.payload
            // })
          };
      case ADD_DATE:
     
    // console.log('date Reducer');  
    return {
        ...state,
        // places: state.places.concat({
        //   key: Math.random(),
        date: action.payload
        // })
      };
    case ADD_PLACE:
     
    // console.log('Income Reducer');  
    return {
        ...state,
        // places: state.places.concat({
        //   key: Math.random(),
        places: action.payload
        // })
      };
      case ADD_INCOME:
     
      // console.log("Income Reducer");  
      return {
          ...state,
          // places: state.places.concat({
          //   key: Math.random(),
          Income: action.payload
          // })
        };
        case ADD_INCOMEARRAY:
     
        // console.log('All Incomes Reducer');  
        return {
            ...state,
            // places: state.places.concat({
            //   key: Math.random(),
            allIncomes: action.payload
            // })
          };
          case ADD_EXPENSE:
          // console.log("Expense Reducer"); 
      return {
          ...state,
          // places: state.places.concat({
          //   key: Math.random(),
          Expense: action.payload
          // })
        };
        case ADD_EXPENSEARRAY:
     
        // console.log('All Expense Reducer');  
        return {
            ...state,
            // places: state.places.concat({
            //   key: Math.random(),
            allExpense: action.payload
            // })
          };
    default:
      return state;
  }
}

export default placeReducer;