import {combineReducers} from 'redux';
// import userToken from './reducer';
import dateReducer from './reducer';
import allIncomeCategory from './reducer';

import date from './reducer';
// import pNumbers from './reducer';
// import Incomes from './reducer';
// import Expenses from './reducer';
// import allIncomes from './reducer';
// import allExpenses from './reducer';
// import nexts from './reducer';
// import previouses from './reducer';
// import incomefncs from './reducer';
// import categories from './reducer';
// import expenseCategories from './reducer';
// import changeExpenseNoBtnCategoryStates from './reducer';
// import changeIncomeNoBtnStates from './reducer';




export default combineReducers({
    //  userToken : userToken,
     date: dateReducer,
     allIncomeCategory:allIncomeCategory,
     date: date,
    //  pNumber: pNumbers,
    //  Income: Incomes,
    //  Expense: Expenses,
    //  allIncome: allIncomes,
    //  allExpense: allExpenses,
    //  next: nexts,
    //  previous: previouses,
    //  incomeFunc:incomefncs,
    //  category:categories,
    //  expenseCategory:expenseCategories  ,
    //  changeExpenseNoBtnCategoryState:changeExpenseNoBtnCategoryStates,
    //  changeIncomeNoBtnState:changeIncomeNoBtnStates
})