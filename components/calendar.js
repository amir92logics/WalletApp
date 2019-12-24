import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,Alert,
} from 'react-native';
// import { WebBrowser } from 'expo';
import moment from 'moment';
// import { Table, Row, Rows,Col,Cel,TableWrapper,Cell } from 'react-native-table-component';
import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';
import { incomeState } from '../actions/incomeAction';
import { expenseArrayState } from '../actions/expenseArrayAction';
import { incomeArrayState } from '../actions/incomeArrayActon';
import { expenseState } from '../actions/expenseAction';

import Icon from 'react-native-vector-icons/FontAwesome';

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
showExpenseByDay=(date)=>{
let date1 = date;
            // console.log(date1);

//  let date2= moment(date1);
            if(date){
            // const { token } = obj;
            // console.log(typeof date1);
            // console.log(date2);

            fetch('http://192.168.43.235:5000/api/account/showExpenseByDay?date='+ date)
            .then(res=> res.json())
            .then(json=>{
              if(json.success){
            //  console.log(json.amount)
            let v3=json.amount;
            let v4=json.expenseArry;
            console.log(v4.length);
        let result="";
            result =v4.map((key, _id)=>{
               
              return ( <View style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }} key={_id}>
              <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.category}</Text>
              <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.amount}</Text>
              <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.dateTime}</Text>
            </View>
                )
            });
            // var result =v4.map(function(key, i) {
               
            //   return ( 
            //   <p key={i*77}>{key}</p>
             
            //     )
            // });
            // console.log( result);
            
            // let v3=v2.value.reduce((a, v) => a + v, 0)
            // console.log(v2.length);
              //  let v4=0;
               
              //  v3 += v2.map((v1)=>{
              // v4+=v1;
              //  return v4;
              // } );
              // console.log( v3);
              
            this.setState({
              // token:token,
              isLoading: false,
             Expense:result,
             allExpenses: v3
            });
            // console.log(this.state.Expense);
        
            
            this.props.add3(this.state.Expense);
            this.props.add4(this.state.allExpenses);
            }else{
            
            this.setState({
                isLoading: false,
                allExpenses:0,
                Expense:0
            })
            this.props.add3(this.state.Expense);
            this.props.add4(this.state.allExpenses);
        
            }
            });
            }else{
            this.setState({
                isLoading: false,
            });  
              }
        
}
showIncomesByDay=(date)=>{
  let date1 = date;
              // console.log(date1);
  
  //  let date2= moment(date1);
              if(date){
              // const { token } = obj;
              // console.log(typeof date1);
              // console.log(date2);
  
              fetch('http://192.168.43.235:5000/api/account/showIncomeByDay?date='+ date)
              .then(res=> res.json())
              .then(json=>{
                if(json.success){
              //  console.log(json.amount)
              let v3=json.amount;
              let v4=json.incomeArry;
              // console.log(typeof v4);
              let result="";
              result =v4.map((key, _id)=>{
                 
                return ( <View style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }} key={_id}>
                <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.category}</Text>
                <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.amount}</Text>
                <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.dateTime}</Text>
              </View>
                  )
              });
              // console.log( result);
              
              // let v3=v2.value.reduce((a, v) => a + v, 0)
              // console.log(v2.length);
                //  let v4=0;
                 
                //  v3 += v2.map((v1)=>{
                // v4+=v1;
                //  return v4;
                // } );
                // console.log( v3);
                
              this.setState({
                // token:token,
                isLoading: false,
               Income: result,
               allIncomes: v3
              });
              // console.log(this.state.Expense);
          
              
              this.props.add1(this.state.Income);
              this.props.add2(this.state.allIncomes);
              }else{
              
              this.setState({
                  isLoading: false,
                  allIncomes:0,
                  Income:0
              })
              this.props.add1(this.state.Income);
              // this.props.changeStateToReducer1(this.state.Expense);
              this.props.add2(this.state.allIncomes);
          
              }
              });
              }else{
              this.setState({
                  isLoading: false,
              });  
                }
          
  }
          onDateChange=(val)=>{
            console.log("current date: "+val.format("L"))
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
    date: state.places.date,
    places: state.places.places,
    Income: state.places.Income,
    Expense: state.places.Expense
  }
}
// function mapStateToProps (state){
//   // let showincome= state.incomeFunc.incomeFunc
// // console.log(showincome);
// return({

//      next: state.date.date,
//     //  incomeFunc: state.incomeFunc.incomeFunc
//    }) 
// }
const mapDispatchToProps = dispatch => {
  return {
    add1: (name) => {
      dispatch(incomeState(name))
    },
    add2: (name) => {
      dispatch(incomeArrayState(name))
    },
    add3: (name) => {
      dispatch(expenseState(name))
    },
    add4: (name) => {
      dispatch(expenseArrayState(name))
    },
    // add5: (name) => {
    //   dispatch(dateState(name))
    // },
    
    // changeStateToReducer1: (name) => {
    //   dispatch(incomeState(name))
    // }

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