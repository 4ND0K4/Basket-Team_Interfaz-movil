import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Alert } from 'react-native';
import PlayersListScreen from '../screens/PlayersListScreen';
import CreatePlayerScreen from '../screens/CreatePlayerScreen';
import DetailPlayerScreen from '../screens/DetailPlayerScreen';
import EditPlayerScreen from '../screens/EditPlayerScreen';
import MediaScreen from '../screens/MediaScreen';
import { Player } from '../models/Player';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

export type RootStackParams = {
    List: { newPlayer?: Player};
    Create: undefined;
    Detail: { player: Player };
    Edit: { playerId: string };
    Media: { videoUrl: string };
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

  const navigation = useNavigation();
  
  return (
    <Stack.Navigator screenOptions={{
        headerShown: true,
        headerStyle: {
            elevation: 10,
            shadowColor: '#e65c00',
            backgroundColor: '#f8f9fa' // Color de fondo del título
        },
        headerTintColor: '#1565C0', // Color del texto y los íconos
        headerTitleStyle: {
          fontWeight: 'bold', // Estilo del texto del título
        },
        headerTitleAlign: 'center',
        headerTransparent: false,
        headerRight: () => (
          <TouchableOpacity 
            onPress={ () => navigation.navigate('List' as never) }
            style={{ padding: 10 }}
          >
            <Icon name="house" size={20} color="#1565C0" />
          </TouchableOpacity>
        ),
    gestureEnabled: true,
    }}>
      <Stack.Screen name="List" component={PlayersListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Create" component={CreatePlayerScreen} />
      <Stack.Screen name="Detail" component={DetailPlayerScreen} />
      <Stack.Screen name="Edit" component={EditPlayerScreen} />
      <Stack.Screen name="Media" component={MediaScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;