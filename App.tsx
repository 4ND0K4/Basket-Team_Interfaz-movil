import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import Navbar from './src/components/shared/Navbar';
import PlayerListScreen from './src/screens/PlayersListScreen';
import CreatePlayerScreen from './src/screens/CreatePlayerScreen';
import StackNavigator from './src/routes/StackNavigator';

export const App = () => {
  return (
    <NavigationContainer>
        <Navbar />
        {/*<PlayerListScreen /> */}
        {/*<CreatePlayerScreen />*/}
        <StackNavigator />
      </NavigationContainer>
  )
}

export default App;