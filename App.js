

import React from 'react';
import { Platform, StatusBar, StyleSheet, View ,Text} from 'react-native';
// import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import FirstNavbar from './components/firstnavbar';
// import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './screens/incomeScreen';
import CalendarMenu from './components/calendarMenu';
import Calendar from './components/calendar';
// import Table from "./components/table";
import configureStore  from './components/store';
import {Provider} from 'react-redux';
// const AppContainer = createAppContainer(AppNavigator);
import SQLite from 'react-native-sqlite-storage';
import { createAppContainer} from 'react-navigation';  
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import IncomeScreen from './screens/incomeScreen';  
import BalanceScreen from './screens/balanceScreen'
import expenseScreen from './screens/expenseScreen';  
import { ScrollView } from 'react-native-gesture-handler';
//import all the screens we are going to switch   
const store = configureStore()
   
const TopNavugation = createMaterialTopTabNavigator({  
    //Constant which holds all the screens like index of any book   
    Income: { screen: IncomeScreen },
    Balance: {screen : BalanceScreen},   
    //First entry by default be our first screen if we do not define initialRouteName  
    Expense: { screen: expenseScreen },   
  },  
  {  
    initialRouteName: 'Income',  
  }  
);  
const TopNav = createAppContainer(TopNavugation);  
export default class App extends React.Component {
  constructor( props) {
    super(props);

   
  }
//   componentDidMount() {
//     SQLite.DEBUG(true);
//     SQLite.enablePromise(true);

//     SQLite.openDatabase({
//         name: "TestDatabase",
//         location: "default"
//     }).then((db) => {
//         // console.log("Database open!");
//         db.transaction(function(txn) {
//       txn.executeSql(
//         "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
//         [],
//         function(tx, res) {
//           // console.log('item:', res.rows.length);
//           if (res.rows.length == 0) {
//             txn.executeSql('DROP TABLE IF EXISTS table_user', []);
//             txn.executeSql(
//               'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
//               []
//             );
            
//           }
               
                 
//                     tx.executeSql(
//                       'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
//                       ['Malik',5445555, "fsadfasdfasdf"],
//                       (tx, results) => {
//                         // console.log('Results', results.rowsAffected);
//                         if (results.rowsAffected > 0) {
//                         //  console.log('success')
//                         } else {
//                           // console.log('Registration Failed');
//                         }
//                       }
//                     );
               
//                   tx.executeSql(
//                     'SELECT * FROM table_user',
//                     [],
//                     (tx, results) => {
//                       var len = results.rows.length;
//                       // console.log('len',len);
//                       if (len > 0) {
//                         // console.log(results.rows.item(0).user_name);
//                         this.setState({
//                          user_name:results.rows.item(0).user_name,
//                         });
//                         this.setState({
//                          user_contact:results.rows.item(0).user_contact,
//                         });
//                         this.setState({
//                          user_address:results.rows.item(0).user_address,
//                         });
//                       }else{
//                         // console.log('No user found');
//                         this.setState({
//                           user_name:'',
//                           user_contact:'',
//                           user_address:'',
//                         });
//                       }
//                     }
//                   );
               
           
         
//         }
//       );
//     });
//     });
// }

  render() {
  
    // if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
    //   return (
    //     <AppLoading
    //       startAsync={this._loadResourcesAsync}
    //       onError={this._handleLoadingError}
    //       onFinish={this._handleFinishLoading}
    //     />
    //   );
    // } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}

          <Provider store={store}>
      
      <FirstNavbar/>
    

          <TopNav />
         
          <CalendarMenu />
         <Calendar />  
        
        </Provider>
        </View>
      );
    }
  }

 
// }

const styles = StyleSheet.create({
  container: {
    // height:8,
    flex:1,
    // flexWrap: 'wrap', 
    // alignItems: 'flex-start',
    // flexDirection:'column',
    // justifyContent:"space-between",
    // color:'red',
    backgroundColor: '#fff',
  },
});





// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//         <Button
//           title="Go to Details"
//           onPress={() => {
//             this.props.navigation.dispatch(StackActions.reset({
//               index: 0,
//               actions: [
//                 NavigationActions.navigate({ routeName: 'Details' })
//               ],
//             }))
//           }}
//         />
//       </View>
//     );
//   }  
// }

// class DetailsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//       </View>
//     );
//   }  
// }

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//   },
//   Details: {
//     screen: DetailsScreen,
//   },
// }, {
//     initialRouteName: 'Home',
// });

// export default createAppContainer(AppNavigator);
