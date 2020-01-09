import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import moment from 'moment';
import SQLite from 'react-native-sqlite-storage';
import { connect } from 'react-redux';
import { showIncomeByDateAction } from '../actions/showIncomeByDateAction';
import { showExpenseByDateAction } from '../actions/showExpenseByDateAction';
import { showIncomeSumByDateAction } from '../actions/showIncomeSumByDateActon';
import { showExpenseSumByDateAction } from '../actions/showExpenseSumByDateAction';
import CalendarPicker from 'react-native-calendar-picker';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  this.state={
    date:'',
    currentDate:moment().format("L"),
  dateContext:moment(),
  today: moment(),
  allExpenses: "",
  allIncomes: "",
  Income:[],
  Expense:[],
}
this.onDateChange=this.onDateChange.bind(this);
  }

weekdays = moment.weekdays();
weekdaysShort= moment.weekdaysShort();
months = moment.months();

year=()=>{
  return this.state.dateContext.format("Y");
  }
  monthInDigit=()=>{
    return this.state.dateContext.format("MM");
    }
    month=()=>{
      return this.state.dateContext.format("MMMM");
      }
    daysInMonth=()=>{
      return this.state.dateContext.daysInMonth();
      }
      currentDate=()=>{
        return this.state.dateContext.get("date");
        }
        currentDay=()=>{
          return this.state.dateContext.format("D");
          }
          firstDayOfMonth=()=>{
            let dateContext= this.state.dateContext;
            let firstDay = moment(dateContext).startOf('month').format('d');
          return firstDay;
          }

          onDateChange=(val)=>{
                   var date = val.format("L");
          
          
            SQLite.DEBUG(true);
            SQLite.enablePromise(true);
          
            SQLite.openDatabase({
                name: "WalletApp",
                location: "default"
            }).then((db) => {
             db.transaction((tx) => {
              tx.executeSql('CREATE TABLE IF NOT EXISTS Expense (id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(20),amount INT(10), date DATE)');
            }).then(() => {
              console.log('database created successfully!!!')
            }).catch(error => {
                console.log(error);
            });
            db.transaction((tx) => {
                tx.executeSql(
                  'SELECT * FROM Expense WHERE  date = ?',
                  [date],
                  (tx, results) => {
                  //  console.log(results.rows)
                    var len = results.rows.length;
                   
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                      temp.push(results.rows.item(i));
                    }
                    // this.props.dispatchIncomeByDate(temp);
                    this.props.dispatchExpenseByDate(temp);
                    var expenseSum = 0;
                    for (let i = 0; i < len; i++) {
                         let row = results.rows.item(i);
                      
                         expenseSum+=row.amount
                        
                     }
                     // this.setState({allExpenseAmountArray: expenseSum});   
                    //  console.log('expenseSum:'+expenseSum);
                        this.props.dispatchExpenseSumByDate(expenseSum);
              if (len > 0) {
                      // console.log(results.rows.item(0).category);
                     
                    }else{
                      // console.log('No user found');
                     
                    }
                  }
                );
                tx.executeSql('CREATE TABLE IF NOT EXISTS Income (id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(20),amount INT(10),date DATE)');
              }).then(() => {
                console.log('database created successfully!!!')
              }).catch(error => {
                  console.log(error);
              });
              db.transaction((tx) => {
                tx.executeSql(
                 'SELECT * FROM Income WHERE  date = ?',
                 [date],
                 (tx, results) => {
                  // console.log(results.rows)
                   var len = results.rows.length;
                  
                   var temp1 = [];
                   for (let i = 0; i < results.rows.length; ++i) {
                     temp1.push(results.rows.item(i));
                   }
                   this.props.dispatchIncomeByDate(temp1);
                   var incomeSum = 0;
                   for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                     
                        incomeSum+=row.amount
                       
                    }
                   //  this.setState({allIncomeAmountArray: incomeSum});
                    //  console.log('incomeSum:'+incomeSum);
                       this.props.dispatchIncomeSumByDate(incomeSum);

             if (len > 0) {
                     // console.log(results.rows.item(0).category);
                    
                   }else{
                     // console.log('No user found');
                    
                   }
                 }
               );
               });
            });
            
          }
          componentWillReceiveProps(){
            // console.log("allIncomeCategory: "+this.props.allIncomeCategory);
          }
  render() {
   
    
    return (
     <View style={styles.calendarContainer} >
       <View style={styles.container}>
        <CalendarPicker 
        onDateChange={(date) =>  this.onDateChange(date)}
        />
 
        </View>
      
            </View>
      
    );
  }

}

const mapStateToProps = state => {
  return {
    allIncomeCategory: state.places.allIncomeCategory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchIncomeByDate: (data) => {
      dispatch(showIncomeByDateAction(data))
    },
    dispatchExpenseByDate: (data) => {
      dispatch(showExpenseByDateAction(data))
    },
    dispatchIncomeSumByDate: (name) => {
      dispatch(showIncomeSumByDateAction(name))
    },
    dispatchExpenseSumByDate: (name) => {
      dispatch(showExpenseSumByDateAction(name))
    },
    


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
// export default FirstNavbar;

const styles = StyleSheet.create({
  calendarContainer:{
    // backgroundColor: 'green',
    justifyContent:'center',
    alignItems: 'center',
   width: '100%'
  },
  // container: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between'
  //  },
 
  calendarNavigator:{flexDirection: 'row'}  
});