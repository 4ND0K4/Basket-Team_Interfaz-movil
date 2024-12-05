import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { Player } from '../models/Player';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../routes/StackNavigator';
import { globalStyles } from '../styles/theme/global.styles';
import { deletePlayer } from '../services/playerService';
import Icon from 'react-native-vector-icons/FontAwesome6';

type PlayerCardProps = {
  player: Player;
  onDelete: (id: string) => void;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onDelete }) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleDelete = async () => {
    try {
      await deletePlayer(player.id);
      onDelete(player.id);
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  return (
    <View style={globalStyles.cardBody}>
      <Image source={{ uri: player.img }} style={globalStyles.cardImage} />
      <Text style={globalStyles.cardTitle}>{player.nombre}</Text>
      <Text style={globalStyles.cardText}>
        <Text style={globalStyles.boldText}>Posición:</Text> {player.posicion}
      </Text>
      <Text style={globalStyles.cardText}>
        <Text style={globalStyles.boldText}>Edad:</Text> {player.edad}
      </Text>
      {player.anillos && player.anillos !== '0' ? (
        <Text style={globalStyles.cardText}>
          <Text style={globalStyles.boldText}>Anillos NBA:</Text> {player.anillos}
        </Text>
      ) : (
        <Text style={globalStyles.cardText}>
          <Text style={globalStyles.boldText}>Anillos NBA:</Text> Ninguno
        </Text>
      )}
      <View style={globalStyles.buttonContainer}>
        <Icon.Button 
          name="eye" 
          backgroundColor="#007bff" 
          onPress={() => navigation.navigate('Detail', { player })}
        >Detalle</Icon.Button>
        <Icon.Button 
          name="trash" 
          backgroundColor="#dc3545" 
          onPress={handleDelete} 
        >Eliminar</Icon.Button>
      </View>
    </View>
  );
};

export default PlayerCard;