import React from 'react';
import {View,Text, ScrollView, StyleSheet } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import SQLite from 'react-native-sqlite-storage';
import {connect} from 'react-redux';
import { showExpenseByDateAction } from '../actions/showExpenseByDateAction';
import moment from 'moment';
class ExpenseScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  this.state={
    Expense: [],
    isLoading: true,
    allExpense: [],
    dateContext:moment(),
    currentDate:moment().format("L"),
}
this.expenseData = this.expenseData.bind(this);
}
month=()=>{
  // console.log(this.state.dateContext)
  return this.state.dateContext.format("MMMM");
  }
componentDidMount(){
  const { currentDate, showExpenseByDate } = this.props;
 this.fetchData(currentDate);

}




expenseData=(value)=>{
  let data =value.map((d, k)=>{
    // console.log("data: "+typeof(this.state.allexpense));

       return(
        <View key={k} style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }} >
        <Text style={{ flex: 1, alignSelf: 'stretch' ,borderWidth: 2, borderColor: 'grey',textAlign:'center'}}>{d.category}</Text>
        <Text style={{ flex: 1, alignSelf: 'stretch' ,borderWidth: 2, borderColor: 'grey',textAlign:'center'}}>{d.amount}</Text>
         <Text style={{ flex: 1, alignSelf: 'stretch' ,borderWidth: 2, borderColor: 'grey',textAlign:'center'}}>{d.date}</Text>
         </View>
       )
  })
  return data
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

        //  this.expenseData(temp);
         this.props.dispatchExpenseByDate(temp);
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

expenseByDate=()=>{
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
        ['12/03/2019'],
       (tx, results) => {
        // console.log(results.rows)
         var len = results.rows.length;
         // var len = results.rows.length;
         var record =[];
         var temp = [];
         for (let i = 0; i < results.rows.length; ++i) {
           temp.push(results.rows.item(i));
         }
          this.setState({allexpense: temp});
         // console.log('len',len);
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
      <View >
      <ScrollView>
      <View style={{marginLeft:5,marginRight:5}} >
         <Text style={{textAlign:'center', fontWeight:"bold",color:'#d9534f',marginBottom:3, fontSize:25}}>All Expenses</Text>
         <View style={{ flex: 1,flexDirection: "row", alignSelf: 'stretch' }}>
         <Text style={{ flex: 1, alignSelf: 'stretch',borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Category</Text>
         <Text style={{flex: 1,alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Amount</Text>
         <Text style={{flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Date</Text>
         </View>
         {this.expenseData(this.props.showExpenseByDate)}
       </View> 
       </ScrollView>
</View>
    );
  }
}
const mapStateToProps = state => {
  return {
    showExpenseByDate: state.places.showExpenseByDate
  

  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatchExpenseByDate: (data) => {
      dispatch(showExpenseByDateAction(data))
    }

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ExpenseScreen);


const styles = StyleSheet.create({
  container: {
    
// height:222,
    // paddingTop: 15,
    // backgroundColor: 'red',
  },
});
