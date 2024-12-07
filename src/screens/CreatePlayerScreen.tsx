import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput, Alert, Text, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
//Navigation
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { type RootStackParams } from '../routes/StackNavigator';
//Styles
import { globalStyles } from '../styles/theme/global.styles';
import Icon from 'react-native-vector-icons/FontAwesome6';
//Models & Services
import { Player } from '../models/Player';
import { addPlayer } from '../services/playerService';

const CreatePlayerScreen = () => {
  // Hook de navegación
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  // Estados
  const [loading, setLoading] = useState(false);

  const [nombre, setNombre] = useState('');
  const [posicion, setPosicion] = useState('Base');
  const [num, setNum] = useState('');
  const [edad, setEdad] = useState('');
  const [anillos, setAnillos] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);
  const [videoFile, setVideoFile] = useState<any>(null);

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
    const player: Player = {
      id: '',
      nombre,
      posicion,
      num: parseInt(num),
      edad,
      anillos,
      descripcion,
      img: '',
      video: ''
    };
    setLoading(true);
    try {
      await addPlayer(player, imageFile, videoFile);
      // Reset form
      setNombre('');
      setPosicion('');
      setNum('');
      setEdad('');
      setAnillos('');
      setDescripcion('');
      setImageFile(null);
      setVideoFile(null);
      Alert.alert('¡Jugador creado correctamente!');
      navigation.navigate('List', { newPlayer: player });
    } catch (error) {
      console.error('Error al añadir el jugador:', error);
      Alert.alert('Error al añadir el jugador');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.form}>
      {/*<Text style={globalStyles.title}>Añadir jugador</Text>*/}
      <TextInput
        placeholder="Nombre"
        autoCapitalize='words'
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
          >Elige imagen</Icon.Button>
          <Icon.Button 
            name="video" 
            backgroundColor="#e65c00" 
            onPress={handleChooseVideo}
          >Elige video</Icon.Button>
        </View>
        <View style={globalStyles.formButtonSeparator} />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
      <Button title="Guardar cambios" onPress={handleSubmit} />
    )}
    </View>
  );
};

export default CreatePlayerScreen;