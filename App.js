

import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View ,Text} from 'react-native';
import FirstNavbar from './components/firstnavbar';
import CalendarMenu from './components/calendarMenu';
import Calendar from './components/calendar';
import configureStore  from './components/store';
import {Provider} from 'react-redux';
import { createAppContainer} from 'react-navigation';  
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import IncomeScreen from './screens/incomeScreen';  
import BalanceScreen from './screens/balanceScreen'
import expenseScreen from './screens/expenseScreen';  
// import LodingScreen from './lodingScreen'
import SplashScreen from 'react-native-splash-screen'
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
  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }
  render() {
    //  const App=()=>{ 
    //    useEffectcreate:()=>{
    //      SplashScreen.hide();
        
    //    }, InputAccessoryView: []
    //    )
      return (
        // <View style={styles.container}>
        //   {Platform.OS === 'ios' && <StatusBar barStyle="default" />}

          <Provider store={store}>
      <FirstNavbar/>
    

          <TopNav />
         
          <CalendarMenu />
         <Calendar />  
        </Provider>
         
      );
    }
  }

 
// }
// export default App;
const styles = StyleSheet.create({
  container: {
    // height:8,
    // flex:1,
    // flexWrap: 'wrap', 
    // alignItems: 'flex-start',
    // flexDirection:'column',
    // justifyContent:"space-between",
    // color:'red',
    backgroundColor: '#0275d8',
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
