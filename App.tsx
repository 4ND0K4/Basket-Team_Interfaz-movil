import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/routes/StackNavigator';
import Navbar from './src/components/shared/Navbar';

export const App = () => {
  return (
    <NavigationContainer>
      <Navbar />
      <StackNavigator />
    </NavigationContainer>
  )
}

export default App;