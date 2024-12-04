import React from 'react';
import { SafeAreaView } from 'react-native';

import Navbar from './src/components/shared/Navbar';
import PlayerListScreen from './src/screens/PlayersListScreen';

export const App = () => {
  return (
      <SafeAreaView style={{ flex: 1}}>
        <Navbar />
        <PlayerListScreen />
      </SafeAreaView>
  )
}

export default App;