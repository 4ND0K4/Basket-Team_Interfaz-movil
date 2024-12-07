import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { globalStyles } from '../styles/theme/global.styles';
import { getPlayers } from '../services/playerService';
import PlayerCard from '../components/PlayerCard';
import { Player } from '../models/Player';
import { useNavigation, useRoute, type NavigationProp, RouteProp } from '@react-navigation/native';
import { type RootStackParams } from '../routes/StackNavigator';
import CreationButton from '../components/shared/CreationButton';

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
        console.error('Error fetching players:', error);
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
      console.error('Error fetching more players:', error);
    } finally {
      setIsFetchingMore(false);
    }
  };

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
      {/*<Text style={globalStyles.title}>Lista de jugadores</Text>*/}
      <FlatList
        data={players}
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