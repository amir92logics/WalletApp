import {ADD_EXPENSE_SUM,ADD_INCOME_SUM,ADD_BALANCE_BY_DATE,ADD_EXPENSE_BY_DATE, ADD_INCOME_BY_DATE, ADD_INCOME_CATEGORY, ADD_EXPENSE_CATEGORY, ADD_DATE, ADD_PLACE, ADD_INCOME,ADD_INCOMEARRAY,ADD_EXPENSE,ADD_EXPENSEARRAY } from '../actions/types';
import moment from 'moment';

const initialState = {
  Income: [],
  allIncomes: 0,
  Expense: [],
  allExpenses: 0,
  places: [],
  date:[],
  date:moment().format("L"),
  allIncomeCategory:[],
  allExpenseCategory:[],
  showIncomeByDate: [],
  showExpenseByDate: [],
  showBalanceByDate: 0,
  showIncomeSumByDate: 0,
  showExpenseSumByDate: 0,
  
};

const placeReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_EXPENSE_SUM:
     return {
        ...state,
        showExpenseSumByDate: action.payload
       
      };
      case ADD_INCOME_SUM:
     

        return {
            ...state,
           showIncomeSumByDate: action.payload
          };
      case ADD_BALANCE_BY_DATE:
     
      return {
          ...state,
           showBalanceByDate: action.payloa
        };
      case ADD_EXPENSE_BY_DATE:
     

        return {
            ...state,
           showExpenseByDate: action.payload
          };
      case ADD_INCOME_BY_DATE:
     
        return {
            ...state,
           showIncomeByDate: action.payload
          };
      case ADD_INCOME_CATEGORY:
     
    return {
        ...state,
         allIncomeCategory: action.paylo
      };
      case ADD_EXPENSE_CATEGORY:
     
  
        return {
            ...state,
           allExpenseCategory: action.payload
          };
      case ADD_DATE:
        return {
        ...state,
         date: action.paylo
      };
    case ADD_PLACE:
         return {
        ...state,
         places: action.paylo
      };
      case ADD_INCOME:
        return {
          ...state,
           Income: action.payloa
        };
        case ADD_INCOMEARRAY:
       return {
            ...state,
           allIncomes: action.payload
          };
          case ADD_EXPENSE:
      return {
          ...state,
           Expense: action.payloa
        };
        case ADD_EXPENSEARRAY:
        return {
            ...state,
           allExpense: action.payload
          };
    default:
      return state;
  }
}

export default placeReducer;