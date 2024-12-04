import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { addPlayer } from '../services/playerService';
import * as ImagePicker from 'react-native-image-picker';
import { Player } from '../models/Player';

const CreatePlayerScreen = () => {
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
    } catch (error) {
      console.error('Error adding player:', error);
      Alert.alert('Error adding player');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nombre"
        placeholder="Nombre"
        mode="outlined"
        keyboardType="default"
        value={nombre}
        onChangeText={text => setNombre(text)}
      />
      <TextInput
        mode="outlined"
        label="Posicion"
        placeholder="Posicion"
        keyboardType="default"
        value={posicion}
        onChangeText={text => setPosicion(text)}
      />
      <TextInput
        label="Numero"
        placeholder="Numero"
        mode="outlined"
        keyboardType="numeric"
        value={num}
        onChangeText={text => setNum(text)}
      />
      <TextInput
        label="Edad"
        placeholder="Edad"
        mode="outlined"
        keyboardType="numeric"
        value={edad}
        onChangeText={text => setEdad(text)}
      />
      <TextInput
        label="Anillos"
        placeholder="Anillos"
        mode="outlined"
        keyboardType="numeric"
        value={anillos}
        onChangeText={text => setAnillos(text)}
      />
      <TextInput
        label="Descripcion"
        placeholder="Descripcion"
        mode="outlined"
        keyboardType="default"
        value={descripcion}
        onChangeText={text => setDescripcion(text)}
      />
      <Button title="Elige una imagen" onPress={handleChooseImage} />
      <Button title="Elige un video" onPress={handleChooseVideo} />
      <Button title="Crear jugador" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default CreatePlayerScreen;