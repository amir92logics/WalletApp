import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NetInfo
} from 'react-native';
import {connect} from 'react-redux';
import SQLite from 'react-native-sqlite-storage';
import { showIncomeByDateAction } from '../actions/showIncomeByDateAction';
import moment from 'moment';
 class IncomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  this.state={
      Income: [],
      isLoading: true,
      allIncome: [],
      dateContext:moment(),
      currentDate:moment().format("L"),
  }
  this.incomeData = this.incomeData.bind(this);
}
month=()=>{
  return this.state.dateContext.format("MMMM");
  }
componentDidMount(){
  const { currentDate, showIncomeByDate } = this.props;
 this.fetchData(currentDate);
// SQLite.DEBUG(true);
//   SQLite.DEBUG(true);
//   SQLite.enablePromise(true);

//   SQLite.openDatabase({
//       name: "WalletApp",
//       location: "default"
//   }).then((db) => {
//    db.transaction((tx) => {
      
//     tx.executeSql('DROP TABLE IF EXISTS Income');
//   }).then(() => {
//     console.log('database created successfully!!!')
//   }).catch(error => {
//       console.log(error);
//   });

    
//   });
}

incomeData=(value)=>{
  let data =value.map((d, k)=>{
    // console.log("data: "+typeof(this.state.allIncome));

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
        
        
   if (len > 0) {
    var temp = [];
    for (let i = 0; i < results.rows.length; ++i) {
      temp.push(results.rows.item(i));
    }
 // console.log(temp);

   //  this.incomeData(temp);
    this.props.dispatchIncomeByDate(temp); 
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
          <Text style={{textAlign:'center', fontWeight:"bold",color:'#5cb85c',marginBottom:3,fontSize:25}}>All Incomes</Text>
          <View style={{ flex: 1,flexDirection: "row", alignSelf: 'stretch' }}>
          <Text style={{ flex: 1, alignSelf: 'stretch',borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Category</Text>
          <Text style={{flex: 1,alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Amount</Text>
          <Text style={{flex: 1, alignSelf: 'stretch', borderWidth: 2, borderColor: 'grey',textAlign:'center',fontWeight:"bold"}}>Date</Text>
          </View>
         {this.incomeData(this.props.showIncomeByDate)}
         
        </View> 
        </ScrollView>
</View>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentDate: state.places.date,
    showIncomeByDate: state.places.showIncomeByDate,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatchIncomeByDate: (data) => {
      dispatch(showIncomeByDateAction(data))
    }

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(IncomeScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
})
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center',
//   },
//   navigationFilename: {
//     marginTop: 5,
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });
