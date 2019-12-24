import React from 'react';
import {View,Text, ScrollView, StyleSheet } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import SQLite from 'react-native-sqlite-storage';
import {connect} from 'react-redux';

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
  
    tableData: [
      ['1', '2', '3', '4'],
      ['a', 'b', 'c', 'd'],
      ['1', '2', '3', '456\n789'],
      ['a', 'b', 'c', 'd']
    ]
}
}
 
componentDidMount(){
  this.fetchData();
}
componentWillReceiveProps(){
  this.fetchData();
}
fetchData=()=>{
  // console.log("Database open Now!");

  SQLite.DEBUG(true);
  SQLite.enablePromise(true);

  SQLite.openDatabase({
      name: "WalletApp",
      location: "default"
  }).then((db) => {
   db.transaction((tx) => {
      // console.log("Database open Now!");
      tx.executeSql(
       'SELECT * FROM Expense',
       [],
       (tx, results) => {
        // console.log(results.rows)
         var len = results.rows.length;
         // var len = results.rows.length;
        
         var temp = [];
         for (let i = 0; i < results.rows.length; ++i) {
           temp.push(results.rows.item(i));
         }


          this.setState({allExpense: temp});
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
    let expenseList=<Text style={{textAlign:'center',fontWeight:"bold"}}>{"Empty List"}</Text>;
// console.log(this.props.Expense)

    if(this.props.Expense!=0){

      expenseList =this.props.Expense;
    }
    let data =this.state.allExpense.map((d, k)=>{
      // console.log("data: "+typeof(this.state.allIncome));

         return(
          <View key={k} style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }} >
          <Text style={{ flex: 1, alignSelf: 'stretch' ,borderWidth: 2, borderColor: 'grey',textAlign:'center'}}>{d.category}</Text>
          <Text style={{ flex: 1, alignSelf: 'stretch' ,borderWidth: 2, borderColor: 'grey',textAlign:'center'}}>{d.amount}</Text>
           <Text style={{ flex: 1, alignSelf: 'stretch' ,borderWidth: 2, borderColor: 'grey',textAlign:'center'}}>{d.date}</Text>
           </View>
         )
    })

    return (
      <View >
      <ScrollView>
      <View style={{marginLeft:5,marginRight:5}} >
         <Text style={{textAlign:'center', fontWeight:"bold",color:'red',marginBottom:3, fontSize:25}}>All Expenses</Text>
         <View style={{ flex: 1,flexDirection: "row", alignSelf: 'stretch' }}>
         <Text style={{ flex: 1, alignSelf: 'stretch',borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Category</Text>
         <Text style={{flex: 1,alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Amount</Text>
         <Text style={{flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Date</Text>
         </View>
       {data}
       </View> 
       </ScrollView>
</View>
    );
  }
}
const mapStateToProps = state => {
  return {
    // next: state.date.date,
    // places: state.places.places,
    // Income: state.places.Income,
    Expense: state.places.Expense
  

  }
}
export default connect(mapStateToProps)(ExpenseScreen);


const styles = StyleSheet.create({
  container: {
    
// height:222,
    // paddingTop: 15,
    // backgroundColor: 'red',
  },
});
