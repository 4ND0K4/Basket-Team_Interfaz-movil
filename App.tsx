import React from 'react';
import { SafeAreaView } from 'react-native';

import Navbar from './src/components/shared/Navbar';
import PlayerListScreen from './src/screens/PlayersListScreen';
import CreatePlayerScreen from './src/screens/CreatePlayerScreen';

export const App = () => {
  return (
      <SafeAreaView style={{ flex: 1}}>
        <Navbar />
        {/*<PlayerListScreen /> */}
        <CreatePlayerScreen />
      </SafeAreaView>
  )
}

export default App;