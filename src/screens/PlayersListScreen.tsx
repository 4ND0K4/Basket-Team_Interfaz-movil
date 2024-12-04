import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { globalStyles } from '../styles/theme/global.styles';
import { getPlayers } from '../services/playerService';
import PlayerCard from '../components/PlayerCard';
import { Player } from '../models/Player';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { type RootStackParams } from '../routes/StackNavigator';
import CreationButton from '../components/shared/CreationButton';



export const PlayersListScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

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

  if (loading) {
    return (
      <View style={globalStyles.centerContainer}>
        <Text style={globalStyles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.centerContainer}>

      <CreationButton 
        onPress={() => navigation.navigate('Create')} 
        label="Crea jugador" 
        />
      <Text style={globalStyles.title}>Lista de jugadores</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlayerCard player={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={fetchMorePlayers}
      />
    </View>
  );

};

export default PlayersListScreen;