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
import { incomeArrayState } from '../actions/incomeArrayActon';
import { expenseArrayState } from '../actions/expenseArrayAction';
import SQLite from 'react-native-sqlite-storage';

import { MonoText } from '../components/StyledText';
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
        'SELECT * FROM Income',
        [],
        (tx, results) => {
         // console.log(results.rows)
          var len = results.rows.length;
          // var len = results.rows.length;
          var incTemp =[];
         //  var temp = [];
         //  for (let i = 0; i < results.rows.length; ++i) {
         //    temp.push(results.rows.item(i));
         //  }
     //  })
     var sum = 0;
     for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
       
          sum+=row.amount
         
      }
         console.log('Sum:'+sum);
           
           // this.props.add5(incTemp);
 
           this.setState({allIncomeAmountArray: sum});
          // console.log('len',len);
          if (len > 0) {
            // console.log(results.rows.item(0).category);
           
          }else{
            // console.log('No user found');
           
          }
        }
      );
      tx.executeSql(
       'SELECT * FROM Expense',
       [],
       (tx, results) => {
        // console.log(results.rows)
         var len = results.rows.length;
         // var len = results.rows.length;
         var expTemp =[];
        //  var temp = [];
        //  for (let i = 0; i < results.rows.length; ++i) {
        //    temp.push(results.rows.item(i));
        //  }
    //  })
    var sum = 0;
         for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
           
              sum+=row.amount
             
          }
        //  console.log('Sum:'+sum);
          
          // this.props.add5(record);

          this.setState({allExpenseAmountArray: sum});
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
    // console.log(this.props.allExpenses);
    let balance= this.state.allIncomeAmountArray - this.state.allExpenseAmountArray;
    return (
     
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
          <Text style={{color:'green'}}>Income</Text>
    <Text style={{color:'green'}}>Rs {this.state.allIncomeAmountArray}.00</Text>

          {/* <Text style={{color:'green'}}>Rs {this.props.allIncome}.00</Text> */}
          </View>
          

<View style={styles.expenseText}>
          <Text style={{color:'red'}}>Expense</Text>
          <Text style={{color:'red'}}>Rs {this.state.allExpenseAmountArray}.00</Text>

          {/* <Text style={{color:'red'}}>Rs {this.props.allExpense}.00</Text> */}
          </View>
          

          <View style={styles.balanceText}>
          <Text style={{}}>Balance</Text>
          <Text style={{}}>Rs {balance}.00</Text>

          {/* <Text style={{}}>Rs {balance}.00</Text> */}
          </View>
          
          </View>
         
      
    );
  }

}
const mapStateToProps = state => {
  return {
    // next: state.date.date,
    places: state.places.places,
    Income: state.places.Income,
    allIncome: state.places.allIncomes,
    allExpense: state.places.allExpense,

    Expense:state.places.Expense

  }
}
const mapDispatchToProps = dispatch => {
  return {
   
    add2: (name) => {
      dispatch(incomeArrayState(name))
    },
   
    add4: (name) => {
      dispatch(expenseArrayState(name))
    },
    
    // changeStateToReducer1: (name) => {
    //   dispatch(incomeState(name))
    // }

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
    marginTop:20
  },
  greenBar:{
    backgroundColor:"green",
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
    backgroundColor:"red",
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
