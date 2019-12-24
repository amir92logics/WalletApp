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
import { changeNextState } from '../actions/actionnext';
import { addPlace } from '../actions/place';
import { incomeState } from '../actions/incomeAction';
import { incomeArrayState } from '../actions/incomeArrayActon';
import { expenseArrayState } from '../actions/expenseArrayAction';
import { dateState } from '../actions/dateAction';

import { expenseState } from '../actions/expenseAction';
// import { expenseArrayState } from '../actions/expenseArrayAction';

// import {  } from '../actions/place';


// import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import moment from 'moment';

class FirstNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      month: 'r',
      year: 0,
      dateContext: moment(),
      dateContextt: "2018-02-02",
      previousMonth: "",
      // previousYear:"",

      previousYear: moment().format("Y"),
      nextMonth: '',
      nextYear: moment().format("Y"),
      allExpenses: 0,
      allIncomes: 0,
      Income:[],
      Expense:[],
      date:''
      // currentDate: moment().format("L")

    }
  }
  // componentWillMount() {
   
  //   let dateContext1 = Object.assign(this.state.dateContext);
  //   let dateContext2 = Object.assign(this.state.dateContext);


  //   let nMonth1 = moment(dateContext2).add(1, 'month');
  //   let pMonth1 = moment(dateContext1).subtract(1, 'month');
  //   let pMonth = pMonth1.format('MMM');
  //   let pYear = pMonth1.format('Y');
  //   let nMonth = nMonth1.format('MMM');
  //   let nYear = nMonth1.format('Y');
  //   this.setState({
  //     previousMonth: pMonth,
  //     previousYear: pYear,
  //     nextMonth: nMonth,
  //     nextYear: nYear,
  //   })
  // }
  monthInDigit = () => {
    return this.state.dateContext.format("MM");
  }
  year = () => {
    return this.state.dateContext.format("Y");
  }
  month = () => {
    return this.state.dateContext.format("MMM");
  }

//   showIncomeListByDate = (date) => {
//     // console.log(date);
//     let token1=date;
//     // console.log(token1)
//     if(token1){
//     fetch("http://192.168.43.235:5000/api/account/showIncomeByDate?dateTime=" + token1)
//       .then(res => res.json())
//       .then(json => {
//         // console.log(json.amount);
//         if (json.success) {
//            console.log(json.amount)
//           let v3 = json.amount;
          
//           let result=[];
//           result = v3.map((key, _id) => {
//             return (<View style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }} key={_id}>
//               <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.category}</Text>
//               <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.amount}</Text>
//               <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.dateTime}</Text>
//             </View>
//             )
//           });
//           // if(result.length<1){
//           //   console.log('Income not found')
           
            
//           // // this.props.add(this.state.Income);

//           // }
//           // console.log("income"+result);
//           this.setState({
//             // token:dateTime,
//             // isLoading: false,
//             Income: result
//           });
//           // console.log(typeof this.state.Expense);
         
//           // console.log(this.state.Income);

//           this.props.add1(this.state.Income);
         
//         } else {
//           // console.log('Income not found')

//           this.setState({
//             isLoading: false,
//             Income:<Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{'Empty List'}</Text>
//           })
//           this.props.add1(this.state.Income);

//         }
//       }).catch((error) => {
//         console.error(error);
//       });
//   }
// }
  showIncome = (date) => {
    let token1=date;
    // console.log(token1)
    if(token1){
  fetch('http://192.168.43.235:5000/api/account/showIncome?dateTime='+ token1)
.then(res=> res.json())
.then(json=>{
  if(json.success){
//  console.log(json.amount)
let v3=json.amount;

let v5=json.incomeArry;
// console.log(typeof v4);

var result1 =v5.map(function(key, i) {
 
return ( 

<Text key={i*88}>Rs { key}.00</Text>
  
  )
});
// let v3=v2.value.reduce((a, v) => a + v, 0)
// console.log(v2.length);
  //  let v4=0;
   
  //  v3 += v2.map((v1)=>{
  // v4+=v1;
  //  return v4;
  // } );
  // console.log( v3);
  
this.setState({
  // token:token1,
  isLoading: false,
//  Income:v3,
 allIncomes:v3
});
this.props.add2(this.state.allIncomes);

// this.props.add(this.state.Income);
// console.log(this.state.allIncomes);
// this.props.changeStateToReducer(this.state.Income);
// this.props.changeStateToReducer3(this.state.allIncomes);
}else{

this.setState({
    isLoading: false,
    allIncomes:0,
    // Income:''
})
this.props.add2(this.state.allIncomes);

// this.props.changeStateToReducer(this.state.Income);
// this.props.changeStateToReducer3(this.state.allIncomes);

}
}).catch((error) => {
        console.error(error);
      });
  }
}

showIncomeListByDate = (date) => {
  let token1=date;
  // console.log(token1)
  if(token1){
  // console.log(date);
  fetch("http://192.168.43.235:5000/api/account/showIncomeByDate?dateTime=" + token1)
    .then(res => res.json())
    .then(json => {
      // console.log(json.amount);
      if (json.success) {
        //  console.log(json.amount)
        let v3 = json.amount;
        let result=[];
        result = v3.map((key, _id) => {
          return (<View style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }} key={_id}>
            <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.category}</Text>
            <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.amount}</Text>
            <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.dateTime}</Text>
          </View>
          )
        });
        // if(result.length<1){
        //   console.log('Income not found')
         
          
        // this.props.add(this.state.Income);

        // }
        // console.log(result);
        this.setState({
          // token:dateTime,
          // isLoading: false,
          Income: result
        });
        // console.log(typeof this.state.Income);
       
        // console.log(this.state.Income);

        this.props.add1(this.state.Income);
       
      } else {
        // console.log('Income not found')

        this.setState({
          isLoading: false,
          Income:<Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{'Empty List'}</Text>
        })
        this.props.add1(this.state.Income);

      }
    }).catch((error) => {
      console.error(error);
    });
  }
}
showExpenseListByDate = (date) => {
  let token1=date;
  // console.log(token1)
  if(token1){
  // console.log(date);
  fetch("http://192.168.43.235:5000/api/account/showExpenseByDate?dateTime=" + token1)
    .then(res => res.json())
    .then(json => {
      // console.log(json.amount);
      if (json.success) {
        //  console.log(json.amount)
        let v3 = json.amount;
        let result=[];
        result = v3.map((key, _id) => {
          return (<View style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }} key={_id}>
            <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.category}</Text>
            <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.amount}</Text>
            <Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{key.dateTime}</Text>
          </View>
          )
        });
        // if(result.length<1){
        //   console.log('Income not found')
         
          
        // this.props.add(this.state.Income);

        // }
        // console.log(result);
        this.setState({
          // token:dateTime,
          // isLoading: false,
          Expense: result
        });
        // console.log(typeof this.state.Expense);
       
        // console.log(this.state.Expense);

        this.props.add3(this.state.Expense);
       
      } else {
        // console.log('Expense not found')

        this.setState({
          isLoading: false,
          Expense:<Text style={{ flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey', textAlign: 'center' }}>{'Empty List'}</Text>
        })
        this.props.add3(this.state.Expense);

      }
    }).catch((error) => {
      console.error(error);
    });
  }
}
showExpense = (date) => {
  let token1=date;
  // console.log(token1)
  if(token1){
fetch('http://192.168.43.235:5000/api/account/showExpense?dateTime='+ token1)
.then(res=> res.json())
.then(json=>{
if(json.success){
//  console.log(json.amount)
let v3=json.amount;

let v5=json.expenseArry;
// console.log(typeof v4);

var result1 =v5.map(function(key, i) {

return ( 

<Text key={i*88}>Rs { key}.00</Text>

)
});
// let v3=v2.value.reduce((a, v) => a + v, 0)
// console.log(v2.length);
//  let v4=0;
 
//  v3 += v2.map((v1)=>{
// v4+=v1;
//  return v4;
// } );
// console.log( v3);

this.setState({
// token:token1,
isLoading: false,
//  Income:v3,
allExpenses:v3
});
this.props.add4(this.state.allExpenses);

// this.props.add(this.state.Income);
// console.log(this.state.allIncomes);
// this.props.changeStateToReducer(this.state.Income);
// this.props.changeStateToReducer3(this.state.allIncomes);
}else{

this.setState({
  isLoading: false,
  allExpenses:0,
  // Income:''
})
this.props.add4(this.state.allExpenses);

// this.props.changeStateToReducer(this.state.Income);
// this.props.changeStateToReducer3(this.state.allIncomes);

}
}).catch((error) => {
      console.error(error);
    });
}
}
  previous = () => {


    // this.setState({
    //   previousMonth:this.month(),
    //   previousYear:this.year(),
    //   nextMonth:this.month(),
    //   nextYear:this.year(),
    // })
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
    // let pMonth2 = this.month(); 
        // let pYear1 = this.state.previousYear.format('Y')
    // console.log("year "+this.state.previousYear);
    // let pMonth3 = pMonth2.format('MM');
    // let month=(this.monthInDigit());
    let pMonth2=moment(dateContext1).subtract(1, 'month');
    let pMonth3=pMonth2.format('MM');
    let year = this.state.previousYear;
    // let year1 = (this.state.previousYear);

    // console.log(year1);
    // let date=month+'/'+"01"+"/"+year;
    let date = pMonth3 + '/' + "02" + "/" + year;
  //  let date1="10/22/2018";
    this.setState({
      date:date
    })
   
    this.props.add5(date);
    // console.log(this.state.date)
  
    // console.log("stored "+this.props.date)
    // this.props.changeStateToReducer4(date);
    // console.log(date) 
    // let token=date;
    // if(token){
    // let date= '14/02/2019';
    // this.dateUpdate();
   
    // let month=(this.monthInDigit());
  //   let year=(this.year());
  // console.log(date2);
  // this.props.add5(date2);

    // this.props.changeStateToReducer4(date);
    // this.showIncomeListByDate(date);
    // this.showIncome(date);
    // this.showExpenseListByDate(date);
    // this.showExpense(date);
    // this.showExpense(date);

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
    // / let pYear1 = this.state.previousYear.format('Y')
    // console.log("year "+this.state.previousYear);
    // let pMonth3 = pMonth2.format('MM');
    // let month=(this.monthInDigit());
    let year = this.state.nextYear;
    // let year1 = (this.state.previousYear);

    // console.log(year1);
    // let date=month+'/'+"01"+"/"+year;
    let date = pMonth3 + '/' + "02" + "/" + year;
  //  let date1="10/22/2018";
    this.setState({
      date:date
    })
  console.log(date);
   

    // console.log("stored "+this.props.date)
  //  this.dateUpdate();
 
    // this.props.add5(date);
    // this.showIncomeListByDate(date);
    // this.showIncome(date);
    // this.showExpenseListByDate(date);
    // this.showExpense(date);
  }
dateUpdate=()=>{
  let currentMonth=this.month();
  let currentYear= this.year();
  let date= currentMonth+"/"+"02"+"/"+currentYear;
  // console.log(date);
  this.props.add5(date);
}
componentWillReceiveProps(){
  // this.dateUpdate();
  this.props.Income;
}
  render() {
    // console.log(this.props.Income);
    // let currentMonth=this.month();
    // let currentYear= this.year();
    // let date= currentMonth+"/"+"02"+"/"+currentYear;
    // console.log(date);
// this.dateUpdate();
    // console.log("date from store"+this.props.date);
    return (
      <View style={styles.container} >
      {/* <View style={{marginTop:0}}> */}
        <View style={styles.prevContainer}>
          <TouchableOpacity onPress={this.previous} style={styles.contentContainer}>
            <Text style={{ fontSize: 50, color: "white" }}>❮ </Text>

          </TouchableOpacity>
          <View style={{ marginTop: 8, }}>
            <Text style={{ fontSize: 20, color: "lightgrey", }}>{this.state.previousMonth}</Text>
            <Text style={{ fontSize: 20, color: "lightgrey" }}>{this.state.previousYear}</Text>

          </View>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>{this.month()}</Text>
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>{this.year()}</Text>
        </View>
        <View style={styles.prevContainer}>
          <View style={{ marginTop: 8, marginRight: 10 }}>
            <Text style={{ fontSize: 20, color: "lightgrey", }}>{this.state.nextMonth}</Text>
            <Text style={{ fontSize: 20, color: "lightgrey", }}>{this.state.nextYear}</Text>

          </View>
          <TouchableOpacity style={styles.contentContainer} onPress={this.nextMonth}>
            <Text style={{ fontSize: 50, color: "white" }}>❯ </Text>

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
    add: (name) => {
      dispatch(addPlace(name))
    },
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
    add5: (name) => {
      dispatch(dateState(name))
    },
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FirstNavbar);
// export default FirstNavbar;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingTop: 13,
    // marginTop: 18,


    // color: 'rgba(96,100,109, 1)',
    height:80,
    backgroundColor: '#124b78',
  },
  prevContainer: {
    // flex: 1,
    // flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    // justifyContent:"space-between",
    // paddingTop: 30,
    marginLeft:10,

    // color: 'rgba(96,100,109, 1)',
    // height:80,
    // backgroundColor: '#124b78',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    // flex: 1,
    // flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    flexDirection: 'row',
    marginRight: 0,

    // justifyContent:"space-between",
    // paddingTop: 30,
    // marginTop:23,

    // color: 'rgba(96,100,109, 1)',
    // height:80,
    // backgroundColor: '#124b78',

  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});