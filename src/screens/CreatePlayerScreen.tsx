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
        placeholder="Nombre"
        style={styles.input}
        value={nombre}
        onChangeText={text => setNombre(text)}
      />
      <TextInput
        placeholder="Posicion"
        style={styles.input}
        value={posicion}
        onChangeText={text => setPosicion(text)}
      />
      <TextInput
        placeholder="Numero"
        style={styles.input}
        keyboardType="numeric"
        value={num}
        onChangeText={text => setNum(text)}
      />
      <TextInput
        placeholder="Edad"
        style={styles.input}
        keyboardType="numeric"
        value={edad}
        onChangeText={text => setEdad(text)}
      />
      <TextInput
        placeholder="Anillos"
        style={styles.input}
        keyboardType="numeric"
        value={anillos}
        onChangeText={text => setAnillos(text)}
      />
      <TextInput
        placeholder="Descripcion"
        style={styles.input}
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default CreatePlayerScreen;