import { createStackNavigator } from '@react-navigation/stack';
import PlayersListScreen from '../screens/PlayersListScreen';
import CreatePlayerScreen from '../screens/CreatePlayerScreen';

const Stack = createStackNavigator();

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
    </Stack.Navigator>
  );
}

export default StackNavigator;