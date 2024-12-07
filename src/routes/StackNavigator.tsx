import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import PlayersListScreen from '../screens/PlayersListScreen';
import CreatePlayerScreen from '../screens/CreatePlayerScreen';
import DetailPlayerScreen from '../screens/DetailPlayerScreen';
import EditPlayerScreen from '../screens/EditPlayerScreen';
import MediaScreen from '../screens/MediaScreen';
// No relacionadas con Navigation
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Player } from '../models/Player';

// Definición de los parámetros de la navegación
export type RootStackParams = {
    List: { newPlayer?: Player};
    Create: undefined;
    Detail: { player: Player };
    Edit: { playerId: string };
    Media: { videoUrl: string };
}

// Creación del Stack
const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

  const navigation = useNavigation();
  
  return (
    <Stack.Navigator screenOptions={{
        headerShown: true, //Muestra encabezado
        headerStyle: {
            elevation: 10, // Sombra en Android
            shadowColor: '#e65c00', // Color sombra
            backgroundColor: '#f8f9fa' // Color fondo
        },
        headerTintColor: '#1565C0', // Color titulos/íconos
        headerTitleStyle: {
          fontWeight: 'bold', // Peso del título
        },
        headerTitleAlign: 'center', // Alineación del título
        headerTransparent: false, // Fondo transparente
        headerRight: () => (
          <TouchableOpacity 
            onPress={ () => navigation.navigate('List' as never) }
            style={{ padding: 10 }}
          >
            <Icon name="house" size={20} color="#1565C0" />
          </TouchableOpacity>
        ),
        gestureEnabled: true, // Habilita gestos
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