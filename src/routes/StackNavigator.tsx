import { createStackNavigator } from '@react-navigation/stack';
import PlayersListScreen from '../screens/PlayersListScreen';
import CreatePlayerScreen from '../screens/CreatePlayerScreen';
import DetailPlayerScreen from '../screens/DetailPlayerScreen';
import EditPlayerScreen from '../screens/EditPlayerScreen';
import MediaScreen from '../screens/MediaScreen';
import { Player } from '../models/Player';

export type RootStackParams = {
    List: { newPlayer?: Player };
    Create: undefined;
    Detail: { player: Player };
    Edit: { playerId: string };
    Media: undefined;
}


const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: true,
        headerStyle: {
            elevation: 10,
            shadowColor: 'transparent',
            backgroundColor: '#f8f9fa' // Color de fondo del título
        },
        headerTintColor: '#1565C0', // Color del texto y los íconos
        headerTitleStyle: {
          fontWeight: 'bold', // Estilo del texto del título
          
        },
    }}>
      <Stack.Screen name="List" component={PlayersListScreen} />
      <Stack.Screen name="Create" component={CreatePlayerScreen} />
      <Stack.Screen name="Detail" component={DetailPlayerScreen} />
      <Stack.Screen name="Edit" component={EditPlayerScreen} />
      <Stack.Screen name="Media" component={MediaScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;