import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Player } from '../models/Player';
import NavigationButton from './shared/NavigationButton';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../routes/StackNavigator';
import { globalStyles } from '../styles/theme/global.styles';

const PlayerCard: React.FC<{ player: Player }> = ({ player }) => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

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
        <Button title="Ver Detalle" color="#007bff" onPress={() => navigation.navigate('Detail', { player })} />
        <Button title="Eliminar" color="#dc3545" />
        </View>
      </View>
  );
};


export default PlayerCard;