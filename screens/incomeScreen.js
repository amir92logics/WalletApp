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

// import ReactTable from "react-table";
// import * as axios from 'axios';
// import { WebBrowser } from 'expo';
// import Table from 'react-native-simple-table';
// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
// import "Platform";
import { MonoText } from '../components/StyledText';
import { ThemeProvider } from 'react-native-elements';

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
    
      tableData: [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
      ]
  }
}
componentDidMount(){
  this.incomeByDate();
}
componentWillReceiveProps(){
  // this.fetchData();
  this.incomeByDate();
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
      console.log("Database open Now!");
      tx.executeSql(
       'SELECT * FROM Income',
       [],
       (tx, results) => {
        console.log(results.rows)
         var len = results.rows.length;
         // var len = results.rows.length;
         var record =[];
         var temp = [];
         for (let i = 0; i < results.rows.length; ++i) {
           temp.push(results.rows.item(i));
         }
    //  })
        //  for (let i = 0; i < len; i++) {
        //       let row = results.rows.item(i);
           
        //       record.push(row.category)
             
        //   }
          
          // this.props.add5(record);

          this.setState({allIncome: temp});
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

incomeByDate=()=>{
  SQLite.DEBUG(true);
  SQLite.enablePromise(true);

  SQLite.openDatabase({
      name: "WalletApp",
      location: "default"
  }).then((db) => {
   db.transaction((tx) => {
      console.log("Database open Now!");
      tx.executeSql(
       'SELECT * FROM Income WHERE  date = ?',
        ['12/03/2019'],
       (tx, results) => {
        console.log(results.rows)
         var len = results.rows.length;
         // var len = results.rows.length;
         var record =[];
         var temp = [];
         for (let i = 0; i < results.rows.length; ++i) {
           temp.push(results.rows.item(i));
         }
    //  })
        //  for (let i = 0; i < len; i++) {
        //       let row = results.rows.item(i);
           
        //       record.push(row.category)
             
        //   }
          
          // this.props.add5(record);

          this.setState({allIncome: temp});
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

      let incomeList=<Text style={{textAlign:'center',fontWeight:"bold"}}>{"Empty List"}</Text>;


    if(this.props.Income!=0){

      incomeList =this.props.Income
    }
    let data =this.state.allIncome.map((d, k)=>{
      console.log("data: "+typeof(this.state.allIncome));

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
          <Text style={{textAlign:'center', fontWeight:"bold",color:'green',marginBottom:3,fontSize:25}}>All Incomes</Text>
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
    places: state.places.places,
    Income: state.places.Income,
    Expense: state.places.Expense
  }
}
export default connect(mapStateToProps)(IncomeScreen);


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
