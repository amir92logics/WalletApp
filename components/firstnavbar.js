import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Button
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import SQLite from 'react-native-sqlite-storage';
import { showIncomeByDateAction } from '../actions/showIncomeByDateAction';
import { showExpenseByDateAction } from '../actions/showExpenseByDateAction';
import { showIncomeSumByDateAction } from '../actions/showIncomeSumByDateActon';
import { showExpenseSumByDateAction } from '../actions/showExpenseSumByDateAction';
import Icon from 'react-native-vector-icons/FontAwesome';

class FirstNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      month: 'r',
      year: 0,
      dateContext: moment(),
      dateContextt: "2018-02-02",
      previousMonth: "",
      previousYear: '',
      nextMonth: '',
      nextYear: '',
      allExpenses: 0,
      allIncomes: 0,
      Income:[],
      Expense:[],
      date:''
      // currentDate: moment().format("L")

    }
  }
 
  monthInDigit = () => {
    return this.state.dateContext.format("MM");
  }
  year = () => {
    return this.state.dateContext.format("Y");
  }
  month = () => {
    return this.state.dateContext.format("MMM");
  }


  previous = () => {
let dateContext = Object.assign(this.state.dateContext)
    dateContext = moment(dateContext).subtract(1, 'month')
    this.setState({
      dateContext: dateContext
    })

    let dateContext1 = Object.assign(this.state.dateContext);
    let dateContext2 = Object.assign(this.state.dateContext);


    let nMonth1 = moment(dateContext2).add(0, 'month');
    let pMonth1 = moment(dateContext1).subtract(2, 'month');
    let pMonth = pMonth1.format('MMM');
    let pYear = pMonth1.format('Y');
    let nMonth = nMonth1.format('MMM');
    let nYear = nMonth1.format('Y');
    this.setState({
      previousMonth: pMonth,
      previousYear: pYear,
      nextMonth: nMonth,
      nextYear: nYear,
    })
    let pMonth2=moment(dateContext1).subtract(1, 'month');
    let pMonth3=pMonth2.format('MM');
    let year = this.state.previousYear;
     let date = pMonth3 + '/' + "02" + "/" + year;
   this.setState({
      date:date
    })
    this.fetchData(date);
   

  }


  nextMonth = () => {
    let dateContext = Object.assign(this.state.dateContext)
    dateContext = moment(dateContext).add(1, 'month')

    this.setState({
      dateContext: dateContext
    });
    let dateContext1 = Object.assign(this.state.dateContext);
    let dateContext2 = Object.assign(this.state.dateContext);
    let nMonth1 = moment(dateContext2).add(2, 'month');
    let pMonth1 = moment(dateContext1).subtract(0, 'month');
    let pMonth = pMonth1.format('MMM');
    let pYear = pMonth1.format('Y');
    let nMonth = nMonth1.format('MMM');
    let nYear = nMonth1.format('Y');
    this.setState({
      previousMonth: pMonth,
      previousYear: pYear,
      nextMonth: nMonth,
      nextYear: nYear,
    })
    let pMonth2=moment(this.state.dateContext).add(1, 'month');

    let pMonth3=pMonth2.format('MM');
    let year = this.state.nextYear;
      let date = pMonth3 + '/' + "01" + "/" + year;
    this.setState({
      date:date
    })
  // console.log("firstnav date: "+date);
   this.fetchData(date);
 }
  fetchData=(value)=>{
    // console.log("Database open Now!"+value);
  let currentMonth = moment(value).format("MM");
  // console.log("Current Month is: "+ currentDate)
  let currentYear = moment(value).format("Y");
  // console.log("Current Year is: "+ currentYear)
  
  let startDate = currentMonth+"/"+"01"+"/"+currentYear;
  let endDate = currentMonth+"/"+"31"+"/"+currentYear 
  // console.log("startDate: "+startDate + "EndDate is: "+endDate)
  SQLite.DEBUG(true);
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
        'SELECT * FROM Expense WHERE  date BETWEEN ? AND ?',
        [startDate, endDate],
        (tx, results) => {
         // console.log(results.rows)
          var len = results.rows.length;
         
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
       // console.log(temp);
 
         //  this.ExpenseData(temp);
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
         'SELECT * FROM Income WHERE  date BETWEEN ? AND ?',
         [startDate, endDate],
         (tx, results) => {
          // console.log(results.rows)
           var len = results.rows.length;
          
           var temp = [];
           for (let i = 0; i < results.rows.length; ++i) {
             temp.push(results.rows.item(i));
           }
        // console.log(temp);
  
          //  this.incomeData(temp);
           this.props.dispatchIncomeByDate(temp);
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
  

  render() {
     return (
      <View style={styles.container} >
      {/* <View style={{marginTop:0}}> */}
        <View style={styles.prevContainer}>
          <TouchableOpacity onPress={this.previous} style={styles.contentContainer}>
            {/* <Text style={{ fontSize: 40, color: "white" }}>❮ </Text> */}
            <Icon name="angle-left" size={60} color='#fff'/>

          </TouchableOpacity>
          <View  style={styles.dateLeft}>
            <Text style={{ fontSize: 20, color: "lightgrey", }}>{this.state.previousMonth}</Text>
            <Text style={{ fontSize: 20, color: "lightgrey" }}>{this.state.previousYear}</Text>

          </View>
        </View>
        <View >
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>{this.month()}</Text>
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>{this.year()}</Text>
        </View>
        <View style={styles.prevContainer}>
          <View style={styles.dateRight}>
            <Text style={{ fontSize: 20, color: "lightgrey", }}>{this.state.nextMonth}</Text>
            <Text style={{ fontSize: 20, color: "lightgrey", }}>{this.state.nextYear}</Text>

          </View>
          <TouchableOpacity style={styles.contentContainer1} onPress={this.nextMonth}>
            {/* <Text style={{ fontSize: 50, color: "white" }}>❯ </Text> */}
            <Icon name="angle-right" size={60} color='#fff'/>

          </TouchableOpacity>

        </View>
        {/* </View> */}
      </View>

    );

  }


}
const mapStateToProps = state => {
  return {
    date: state.places.date,
  
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
export default connect(mapStateToProps, mapDispatchToProps)(FirstNavbar);
// export default FirstNavbar;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: "space-between",
    height:60,
    backgroundColor: '#0275d8',
  },
  prevContainer: {
  
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginLeft:10,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    flexWrap: 'wrap',
    alignItems: 'stretch',
    flexDirection: 'row',
    marginRight: 5,
  },
  contentContainer1: {
    flexWrap: 'wrap',
    alignItems: 'stretch',
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 5
  },
  dateRight:{
    flexWrap: 'wrap',
    alignItems: 'center',
    // justifyContent: 'flex-end'
  },
  dateLeft:{
    flexWrap: 'wrap',
    // justifyContent: 'flex-end'
  }
})