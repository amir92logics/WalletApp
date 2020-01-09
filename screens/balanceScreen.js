import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import { WebBrowser } from 'expo';
import Icon  from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux';
import { showIncomeSumByDateAction } from '../actions/showIncomeSumByDateActon';
import { showExpenseSumByDateAction } from '../actions/showExpenseSumByDateAction';
import SQLite from 'react-native-sqlite-storage';
import moment from 'moment';
class BalanceScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  this.state={
    allExpenseAmountArray: [],
    allIncomeAmountArray: [],
      isLoading: true,
      incomeListByMonth:[],
      expenseListByMonth:[]
    
     
  }
}
componentDidMount(){
  const { currentDate} = this.props;
 this.fetchData(currentDate);
//  console.log('Month: '+this.month());
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
       
        var incomeSum = 0;
    for (let i = 0; i < len; i++) {
         let row = results.rows.item(i);
      
         incomeSum+=row.amount
        
     }
    //  this.setState({allIncomeAmountArray: incomeSum});
      // console.log('incomeSum:'+incomeSum);
        this.props.dispatchIncomeSumByDate(incomeSum);
  if (len > 0) {
          // console.log(results.rows.item(0).category);
         
        }else{
          // console.log('No user found');
         
        }
      }
    );
     
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
        
         var expenseSum = 0;
     for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
       
          expenseSum+=row.amount
         
      }
      // this.setState({allExpenseAmountArray: expenseSum});   
      // console.log('expenseSum:'+expenseSum);
         this.props.dispatchExpenseSumByDate(expenseSum);
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
renderBalanceData=(income, expense)=>{

  let balance =0;
  balance= income - expense;
  return balance
}
  render() {
    // console.log(this.props.allExpenses);
    // let balance= this.state.allIncomeAmountArray - this.state.allExpenseAmountArray;
   const { showIncomeSumByDate, showExpenseSumByDate } = this.props;
    return (
     <ScrollView>
       <View style={styles.contentContainer}>
      
          <View style={styles.balanceBar}>
             <View style={styles.greenBar}>
             <Icon  name='plus-circle' color='white'/>
             

          </View>
          <View style={styles.redBar}>
          <Icon  name='minus-circle' right={55} color='white'/>
             
          </View>
          </View>
          
          
          <View  style={styles.incomeText}>
          <Text style={{color:'#5cb85c'}}>Income</Text>
    <Text style={{color:'#5cb85c'}}>Rs {showIncomeSumByDate}.00</Text>

          {/* <Text style={{color:'green'}}>Rs {this.props.allIncome}.00</Text> */}
          </View>
          

<View style={styles.expenseText}>
          <Text style={{color:'#d9534f'}}>Expense</Text>
          <Text style={{color:'#d9534f'}}>Rs {showExpenseSumByDate}.00</Text>

          {/* <Text style={{color:'red'}}>Rs {this.props.allExpense}.00</Text> */}
          </View>
          

          <View style={styles.balanceText}>
          <Text style={{color:'#292b2c'}}>Balance</Text>
          <Text style={{color:'#292b2c'}}>Rs {this.renderBalanceData(showIncomeSumByDate,showExpenseSumByDate)}.00</Text>

          {/* <Text style={{}}>Rs {balance}.00</Text> */}
          </View>
          
          </View>
         
          </ScrollView>
    );
  }

}
const mapStateToProps = state => {
  return {
    currentDate:state.places.currentDate,
    showIncomeSumByDate:state.places.showIncomeSumByDate,
    showExpenseSumByDate:state.places.showExpenseSumByDate
    
  }
}
const mapDispatchToProps = dispatch => {
  return {
   
    dispatchIncomeSumByDate: (name) => {
      dispatch(showIncomeSumByDateAction(name))
    },
    dispatchExpenseSumByDate: (name) => {
      dispatch(showExpenseSumByDateAction(name))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceScreen);


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',

  },
  incomeText: {
    flexDirection:'row',
    textAlign: 'center',
    justifyContent:"space-between",
    margin:10
  },
  expenseText: {
    // flex: 1,
    // backgroundColor: '#fff',
    flexDirection:'row',
    textAlign: 'center',
    justifyContent:"space-between",
    // alignSelf: 'stretch',
    margin:10,
    // color:'red'
  
  },
  balanceText: {
    // flex: 1,
    // backgroundColor: '#fff',
    flexDirection:'row',
    textAlign: 'center',
    justifyContent:"space-between",
    // alignSelf: 'stretch',
    margin:10,
  borderTopWidth:1,
  borderColor:"grey"
  // borderStyle:"dotted"
  },
  balanceBar:{
    // backgroundColor:"red",
    // flexWrap: 'wrap', 
    // alignItems: 'flex-start',
    flexDirection:'row',
    textAlign: 'center',
    justifyContent:"center",
    // alignSelf: 'stretch',
    marginTop:30
  },
  greenBar:{
    backgroundColor:"#5cb85c",
    // alignSelf: 'stretch',
    padding: 5,
    alignItems: 'flex-start',

    // textAlign: 'center',
    // marginTop:20
    width:150,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 0,
    },
  redBar:{
    backgroundColor:"#d9534f",
    alignItems: 'flex-end',
    padding: 5,
    // alignSelf: 'stretch',
    // textAlign: 'center',
    // marginTop:20,
    width:150,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 7,
  }
});
