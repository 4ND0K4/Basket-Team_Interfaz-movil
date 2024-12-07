import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { globalStyles } from '../styles/theme/global.styles';
// Navigation
import { useNavigation, useRoute, type NavigationProp, RouteProp } from '@react-navigation/native';
import { type RootStackParams } from '../routes/StackNavigator';
// Components
import PlayerCard from '../components/PlayerCard';
import CreationButton from '../components/shared/CreationButton';
// Models & Services
import { Player } from '../models/Player';
import { getPlayers } from '../services/playerService';


// Definición de los parámetros de la navegación
type PlayersListScreenRouteProp = RouteProp<RootStackParams, 'List'>;

export const PlayersListScreen = () => {
  // Hook de naveg
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  // Hook de ruta
  const route = useRoute<PlayersListScreenRouteProp>();

  // Estados
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Estados para los filtros
  const [searchText, setSearchText] = useState('');
  const [filterOption, setFilterOption] = useState('nombre');

  // Efecto para cargar los jugadores
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersList = await getPlayers();
        setPlayers(playersList);
        if (playersList.length > 0) {
          setLastKey(playersList[playersList.length - 1].id);
        }
      } catch (error) {
        console.error('Error al cargar jugadores:', error);
        Alert.alert('Error al cargar jugadores');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Efecto para añadir un nuevo jugador
  useEffect(() => {
    if (route.params?.newPlayer) {
      setPlayers(prevPlayers => [route.params?.newPlayer, ...prevPlayers].filter(player => player !== undefined));
    }
  }, [route.params?.newPlayer]);

  // Función para cargar más jugadores
  const fetchMorePlayers = async () => {
    if (isFetchingMore || !lastKey) return;
    setIsFetchingMore(true);
    try {
      const morePlayers = await getPlayers(lastKey);
      if (morePlayers.length > 0) {
        setPlayers(prevPlayers => {
          const newPlayers = morePlayers.filter(player => !prevPlayers.some(p => p.id === player.id));
          return [...prevPlayers, ...newPlayers];
        });
        setLastKey(morePlayers[morePlayers.length - 1].id);
      }
    } catch (error) {
      console.error('Error al cargar más jugadores:', error);
      Alert.alert('Error al cargar más jugadores');
    } finally {
      setIsFetchingMore(false);
    }
  };

  // Función de filtrado
  const filterPlayers = (items: Player[], searchText: string, filterOption: string): Player[] => {
    if (!items) return [];

    // Convertimos los parámetros a minúsculas para comparación
    searchText = searchText ? searchText.toLowerCase() : '';
    filterOption = filterOption ? filterOption.toLowerCase() : '';
    
    let filteredItems = items;

    // Filtrado por búsqueda (searchText) y opción (filterOption)
    if (searchText) {
      filteredItems = filteredItems.filter((item: Player) => {
        if (filterOption === 'nombre') {
          return item.nombre?.toLowerCase().includes(searchText);
        } else if (filterOption === 'posicion') {
          return item.posicion?.toLowerCase().includes(searchText);
        } else if (filterOption === 'edad') {
          return item.edad?.toString().includes(searchText);
        } else {
          // Si la opción no coincide, filtramos por nombre por defecto
          return item.nombre?.toLowerCase().includes(searchText);
        }
      });
    }

    return filteredItems;
  };

  const filteredPlayers = filterPlayers(players, searchText, filterOption);

  // Función para eliminar un jugador
  const handleDeletePlayer = (id: string) => {
    setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== id));
  };

  // Función para renderizar el separador de la FlatList
  const renderSeparator = () => {
    return <View style={globalStyles.separator} />;
  };

  // Renderizado condicional
  if (loading) {
    return (
      <View style={globalStyles.centerContainer}>
        <Text style={globalStyles.title}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.centerContainer}>
      <View style={globalStyles.searchContainer}>
        <TextInput
          placeholder="Buscar..."
          style={globalStyles.searchInput}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <Picker
          selectedValue={filterOption}
          style={globalStyles.searchInput}
          onValueChange={(itemValue) => setFilterOption(itemValue)}
        >
          <Picker.Item label="Nombre" value="nombre" />
          <Picker.Item label="Posición" value="posicion" />
          <Picker.Item label="Edad" value="edad" />
        </Picker>
      </View>
      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlayerCard player={item} onDelete={handleDeletePlayer} />}
        ItemSeparatorComponent={renderSeparator}
        onEndReachedThreshold={0.5}
        onEndReached={fetchMorePlayers}
      />
      <CreationButton onPress={() => navigation.navigate('Create')} label="" />
    </View>
  );
};
export default PlayersListScreen;