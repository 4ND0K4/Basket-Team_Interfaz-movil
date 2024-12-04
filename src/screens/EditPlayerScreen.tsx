import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, TextInput, Alert, Text } from 'react-native';
import { updatePlayer, getPlayerById } from '../services/playerService';
import * as ImagePicker from 'react-native-image-picker';
import { Player } from '../models/Player';
import NavigationButton from '../components/shared/NavigationButton';
import { useNavigation, useRoute, type NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../routes/StackNavigator';
import { globalStyles } from '../styles/theme/global.styles';

type EditPlayerScreenRouteProp = RouteProp<RootStackParams, 'Edit'>;

export const EditPlayerScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const route = useRoute<EditPlayerScreenRouteProp>();
  const { playerId } = route.params;

  const [player, setPlayer] = useState<Player | null>(null);
  const [nombre, setNombre] = useState('');
  const [posicion, setPosicion] = useState('');
  const [num, setNum] = useState('');
  const [edad, setEdad] = useState('');
  const [anillos, setAnillos] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);
  const [videoFile, setVideoFile] = useState<any>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      const fetchedPlayer = await getPlayerById(playerId);
      if (fetchedPlayer) {
        setPlayer(fetchedPlayer);
        setNombre(fetchedPlayer.nombre);
        setPosicion(fetchedPlayer.posicion);
        setNum(fetchedPlayer.num.toString());
        setEdad(fetchedPlayer.edad);
        setAnillos(fetchedPlayer.anillos);
        setDescripcion(fetchedPlayer.descripcion);
      }
    };

    fetchPlayer();
  }, [playerId]);

  const handleChooseImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setImageFile(response.assets[0]);
      }
    });
  };

  const handleChooseVideo = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'video' }, response => {
      if (response.assets && response.assets.length > 0) {
        setVideoFile(response.assets[0]);
      }
    });
  };

  const handleSubmit = async () => {
    if (!player) return;
  
    const updatedPlayer: Player = {
      ...player,
      nombre,
      posicion,
      num: parseInt(num),
      edad,
      anillos,
      descripcion,
    };
  
    try {
      // Llamamos a la función updatePlayer pasándole los archivos de imagen y video si existen
      await updatePlayer(player.id, updatedPlayer, imageFile, videoFile);
      Alert.alert('Player updated successfully!');
      navigation.navigate('Detail', { player: updatedPlayer });
    } catch (error) {
      console.error('Error updating player:', error);
      Alert.alert('Error updating player.');
    }
  };
  

  if (!player) {
    return (
      <View style={globalStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.form}>
      <Text style={globalStyles.formTitle}>Editar jugador</Text>
      <TextInput
        placeholder="Nombre"
        style={globalStyles.formInput}
        value={nombre}
        onChangeText={text => setNombre(text)}
      />
      <TextInput
        placeholder="Posicion"
        style={globalStyles.formInput}
        value={posicion}
        onChangeText={text => setPosicion(text)}
      />
      <TextInput
        placeholder="Numero"
        style={globalStyles.formInput}
        keyboardType="numeric"
        value={num}
        onChangeText={text => setNum(text)}
      />
      <TextInput
        placeholder="Edad"
        style={globalStyles.formInput}
        keyboardType="numeric"
        value={edad}
        onChangeText={text => setEdad(text)}
      />
      <TextInput
        placeholder="Anillos"
        style={globalStyles.formInput}
        keyboardType="numeric"
        value={anillos}
        onChangeText={text => setAnillos(text)}
      />
      <TextInput
        placeholder="Descripcion"
        style={globalStyles.formInput}
        value={descripcion}
        onChangeText={text => setDescripcion(text)}
      />
      <Button title="Elige una imagen" onPress={handleChooseImage} />
      <Button title="Elige un video" onPress={handleChooseVideo} />
      <Button title="Actualizar jugador" onPress={handleSubmit} />
      <NavigationButton 
        onPress={ () => navigation.navigate('List' as never) }
        label="Volver"
      />
    </View>
  );
};

export default EditPlayerScreen;