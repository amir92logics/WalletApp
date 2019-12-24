import React from 'react';
import { Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import BalanceScreen from '../screens/balanceScreen';

import TabBarIcon from '../components/TabBarIcon';
import IncomeScreen from '../screens/incomeScreen';
import ExpenseScreen from '../screens/expenseScreen';
import SettingsScreen from '../screens/SettingsScreen';

const IncomeStack = createStackNavigator({
  Income: IncomeScreen,
});

 IncomeStack.navigationOptions = {
  tabBarLabel: 'Income',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon

    focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const BalanceStack = createStackNavigator({
  Balance: BalanceScreen,
});

BalanceStack.navigationOptions = {
  tabBarLabel: 'Balance',
    
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
    
    focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};


const ExpenseStack = createStackNavigator({
  Expense: ExpenseScreen,
});

ExpenseStack.navigationOptions = {
  tabBarLabel: 'Expense',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
//   }
export default createMaterialTopTabNavigator({
  
  IncomeStack,
  BalanceStack,
  ExpenseStack,
  // SettingsStack,
});
