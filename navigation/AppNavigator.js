import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

// import MainTabNavigator from './MainTabNavigator';

import SecondNavbar from './secondnavbar';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Main: SecondNavbar
  
  SecondNav: SecondNavbar,
// Main: MainTabNavigator,

});