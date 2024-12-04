import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { globalStyles } from '../styles/theme/global.styles';
import { getPlayers } from '../services/playerService';
import PlayerCard from '../components/PlayerCard';
import { Player } from '../models/Player';
import { useNavigation } from '@react-navigation/native';
import NavigationButton from '../components/shared/NavigationButton';



export const PlayersListScreen = () => {

  const navigation = useNavigation();

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

      <NavigationButton 
        onPress={() => navigation.navigate('Create' as never)} 
        label="Crea jugador" 
        />
      {/*<Pressable 
        onPress={() => navigation.navigate('Create' as never)}
        style={globalStyles.navigationButton}>
        <Text style={globalStyles.buttonText}>Add Player</Text>
      </Pressable>*/}

      <Text style={globalStyles.title}>Players List</Text>
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