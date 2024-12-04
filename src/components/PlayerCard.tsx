import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Player } from '../models/Player';

const PlayerCard: React.FC<{ player: Player }> = ({ player }) => {
  return (
    <View style={styles.cardBody}>
        <Image source={{ uri: player.img }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{player.nombre}</Text>
      <Text style={styles.cardText}>
        <Text style={styles.boldText}>Posición:</Text> {player.posicion}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.boldText}>Edad:</Text> {player.edad}
      </Text>
      {player.anillos && player.anillos !== '0' ? (
        <Text style={styles.cardText}>
          <Text style={styles.boldText}>Anillos NBA:</Text> {player.anillos}
        </Text>
      ) : (
        <Text style={styles.cardText}>
          <Text style={styles.boldText}>Anillos NBA:</Text> Ninguno
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Ver Detalle" color="#007bff" />
        <Button title="Eliminar" color="#dc3545" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBody: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: 'white',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
    marginVertical: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

export default PlayerCard;