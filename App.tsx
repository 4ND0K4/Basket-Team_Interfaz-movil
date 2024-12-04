import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

import Navbar from './src/components/shared/Navbar';
import PlayerListScreen from './src/screens/PlayersListScreen';
import CreatePlayerScreen from './src/screens/CreatePlayerScreen';

export const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1}}>
        <Navbar />
        {/*<PlayerListScreen /> */}
        <CreatePlayerScreen />
      </SafeAreaView>
      </NavigationContainer>
  )
}

export default App;