import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Alert, Text, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
// Navigation
import { useNavigation, useRoute, type NavigationProp, RouteProp } from '@react-navigation/native';
import { type RootStackParams } from '../routes/StackNavigator';
// Styles
import { globalStyles } from '../styles/theme/global.styles';
import Icon from 'react-native-vector-icons/FontAwesome6';
// Models & Services
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
  const [saving, setSaving] = useState(false);
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
      setLoading(true);
      try {
        const fetchedPlayer = await getPlayerById(playerId);
        setPlayer(fetchedPlayer);
        if (fetchedPlayer) {
          setNombre(fetchedPlayer.nombre);
          setPosicion(fetchedPlayer.posicion);
          setNum(fetchedPlayer.num.toString());
          setEdad(fetchedPlayer.edad);
          setAnillos(fetchedPlayer.anillos);
          setDescripcion(fetchedPlayer.descripcion);
        }
      } catch (error) {
        console.error('Error fetching player:', error);
        Alert.alert('Error fetching player');
      } finally {
        setLoading(false);
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

    if (parseInt(edad) < 18 || parseInt(edad) > 64) {
      Alert.alert('La edad debe estar entre 18 y 64 años');
      return;
    }

    if (parseInt(num) < 0 || parseInt(num) > 99) {
      Alert.alert('El número debe estar entre 0 y 99');
      return;
    }

    setSaving(true);
    try {
      const updatedPlayer: Player = {
        ...player,
        nombre,
        posicion,
        num: parseInt(num),
        edad,
        anillos,
        descripcion,
        img: imageFile?.uri || player.img,
        video: videoFile?.uri || player.video,
      };
      await updatePlayer(player.id, updatedPlayer, imageFile, videoFile);
      Alert.alert('Jugador actualizado correctamente');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Detail', params: { player: updatedPlayer } }],
      });
    } catch (error) {
      console.error('Error al actualizar el jugador:', error);
      Alert.alert('Error al actualizar el jugador');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!player) {
    return (
      <View style={globalStyles.centerContainer}>
        <Text style={globalStyles.title}>Jugador no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <TextInput
        placeholder="Nombre"
        style={globalStyles.formInput}
        value={nombre}
        onChangeText={text => setNombre(text)}
      />
      <TextInput
        placeholder="Número"
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
        placeholder="Descripción"
        style={[globalStyles.formInput, { height: 100 }]} 
        value={descripcion}
        multiline={true} 
        numberOfLines={4} 
        onChangeText={text => setDescripcion(text)}
      />
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
        >
          Elige imagen
        </Icon.Button>
        <Icon.Button 
          name="video" 
          backgroundColor="#e65c00" 
          onPress={handleChooseVideo}
        >
          Elige video
        </Icon.Button>
      </View>
      <View style={globalStyles.formButtonSeparator} />
      {saving ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Guardar cambios" onPress={handleSubmit} />
      )}
    </View>
  );
};

export default EditPlayerScreen;