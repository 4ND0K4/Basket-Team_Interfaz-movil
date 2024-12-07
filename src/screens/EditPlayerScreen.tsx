import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Alert, Text, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
//Navigation
import { useNavigation, useRoute, type NavigationProp, RouteProp } from '@react-navigation/native';
import { type RootStackParams } from '../routes/StackNavigator';
//Styles
import { globalStyles } from '../styles/theme/global.styles';
import Icon from 'react-native-vector-icons/FontAwesome6';
//Models & Services
import { Player } from '../models/Player';
import { updatePlayer, getPlayerById } from '../services/playerService';

// Definición de los parámetros de la navegación
type EditPlayerScreenRouteProp = RouteProp<RootStackParams, 'Edit'>;

export const EditPlayerScreen: React.FC = () => {
  // Hook de navegación
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  // Hook de ruta
  const route = useRoute<EditPlayerScreenRouteProp>();
  // Parámetros de la ruta
  const { playerId } = route.params;

  // Estados
  const [loading, setLoading] = useState(false);

  const [player, setPlayer] = useState<Player | null>(null);
  const [nombre, setNombre] = useState('');
  const [posicion, setPosicion] = useState('');
  const [num, setNum] = useState('');
  const [edad, setEdad] = useState('');
  const [anillos, setAnillos] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);
  const [videoFile, setVideoFile] = useState<any>(null);

  // Efecto para cargar el jugador
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

  // Función de carga de imagen
  const handleChooseImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setImageFile(response.assets[0]);
      }
    });
  };

  // Función de carga de video
  const handleChooseVideo = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'video' }, response => {
      if (response.assets && response.assets.length > 0) {
        setVideoFile(response.assets[0]);
      }
    });
  };

  // Función de envío de formulario
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

    setLoading(true);

    try {
      // Llamamos a la función updatePlayer pasándole los archivos de imagen y video si existen
      await updatePlayer(player.id, updatedPlayer, imageFile, videoFile);
      Alert.alert('Player updated successfully!');
      navigation.navigate('Detail', { player: updatedPlayer });
    } catch (error) {
      console.error('Error al actualizar el jugador:', error);
      Alert.alert('Error al actualizar el jugador.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!player) {
    return (
      <View style={globalStyles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.form}>
      {/*<Text style={globalStyles.label}>Nombre:</Text>*/}
      <TextInput
        autoCapitalize='words'
        placeholder="Nombre"
        style={globalStyles.formInput}
        value={nombre}
        onChangeText={text => setNombre(text)}
      />
      {/*<Text style={globalStyles.label}>Número:</Text>*/}
      <TextInput
        placeholder="Numero"
        style={globalStyles.formInput}
        keyboardType="numeric"
        value={num}
        onChangeText={text => setNum(text)}
      />
      {/*<Text style={globalStyles.label}>Edad:</Text>*/}
      <TextInput
        placeholder="Edad"
        style={globalStyles.formInput}
        keyboardType="numeric"
        value={edad}
        onChangeText={text => setEdad(text)}
      />
      {/*<Text style={globalStyles.label}>Anillos:</Text>*/}
      <TextInput
        placeholder="Anillos"
        style={globalStyles.formInput}
        keyboardType="numeric"
        value={anillos}
        onChangeText={text => setAnillos(text)}
      />
      {/*<Text style={globalStyles.label}>Descripción:</Text>*/}
      <TextInput
        placeholder="Descripcion"
        style={[globalStyles.formInput, { height: 100 }]} 
        multiline={true}
        numberOfLines={4}
        value={descripcion}
        onChangeText={text => setDescripcion(text)}
      />
      {/*<Text style={globalStyles.label}>Posición:</Text>*/}
      <Picker
        selectedValue={posicion}
        style={globalStyles.pickerInput}
        onValueChange={(posicion) => setPosicion(posicion)}
      >
        <Picker.Item label="Base" value="Base" />
        <Picker.Item label="Escolta" value="Escolta" />
        <Picker.Item label="Alero" value="Alero" />
        <Picker.Item label="Ala-Pivot" value="Ala-Pivot" />
        <Picker.Item label="Pivot" value="Pivot" />
      </Picker>
        <View style={globalStyles.buttonContainer}>
          <Icon.Button 
            name="image" 
            backgroundColor="#e65c00"
            onPress={handleChooseImage}
          >Elige imagen</Icon.Button>
          <Icon.Button 
            name="video" 
            backgroundColor="#e65c00"
            onPress={handleChooseVideo}
          >Elige video</Icon.Button>
        </View>
        <View style={globalStyles.formButtonSeparator}></View>
      {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
      <Button title="Actualizar jugador" onPress={handleSubmit} />
    )}
    </View>
  );
};

export default EditPlayerScreen;