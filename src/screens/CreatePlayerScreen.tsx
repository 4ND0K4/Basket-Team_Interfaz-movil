import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput, Alert, Text } from 'react-native';
import { addPlayer } from '../services/playerService';
import * as ImagePicker from 'react-native-image-picker';
import { Player } from '../models/Player';
import NavigationButton from '../components/shared/NavigationButton';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../routes/StackNavigator';
import { globalStyles } from '../styles/theme/global.styles';

const CreatePlayerScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const [nombre, setNombre] = useState('');
  const [posicion, setPosicion] = useState('');
  const [num, setNum] = useState('');
  const [edad, setEdad] = useState('');
  const [anillos, setAnillos] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);
  const [videoFile, setVideoFile] = useState<any>(null);

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
      Alert.alert('Player added successfully!');
      navigation.navigate('List', { newPlayer: player });
    } catch (error) {
      console.error('Error adding player:', error);
      Alert.alert('Error adding player');
    }
  };

  return (
    <View style={globalStyles.form}>
      <Text style={globalStyles.formTitle}>Introduce los datos</Text>
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
      <Button title="Crear jugador" onPress={handleSubmit} />
      <NavigationButton 
        onPress={ () => navigation.navigate('List' as never) }
        label="Volver"
      />
    </View>
  );
};

export default CreatePlayerScreen;