import { createStackNavigator } from '@react-navigation/stack';
import PlayersListScreen from '../screens/PlayersListScreen';
import CreatePlayerScreen from '../screens/CreatePlayerScreen';
import DetailPlayerScreen from '../screens/DetailPlayerScreen';
import EditPlayerScreen from '../screens/EditPlayerScreen';
import { Player } from '../models/Player';

export type RootStackParams = {
    List: undefined;
    Create: undefined;
    Detail: { player: Player };
    Edit: { playerId: string };
}


const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: true,
        headerStyle: {
            elevation: 10,
            shadowColor: 'transparent'
        }
    }}>
      <Stack.Screen name="List" component={PlayersListScreen} />
      <Stack.Screen name="Create" component={CreatePlayerScreen} />
      <Stack.Screen name="Detail" component={DetailPlayerScreen} />
      <Stack.Screen name="Edit" component={EditPlayerScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;