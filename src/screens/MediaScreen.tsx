import React, { useRef, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Video from 'react-native-video';
// Navigation
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../routes/StackNavigator';
// Styles
import { globalStyles } from '../styles/theme/global.styles';

// Definición de los parámetros de la navegación
type MediaScreenRouteProp = RouteProp<RootStackParams, 'Media'>;

export const MediaScreen: React.FC = () => {

  // Hook de ruta
  const route = useRoute<MediaScreenRouteProp>();
  // Parámetros de la ruta
  const { videoUrl } = route.params;

  // Hook de referencia al video
  const videoRef = useRef(null);
  // Estado de reproducción del video
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={globalStyles.mediaContainer}>
      <View style={globalStyles.videoContainer}>
      <Video 
        ref={videoRef}
        paused={!isPlaying}
        source={{ uri: videoUrl }}
        style={globalStyles.video}
        controls
        resizeMode="contain"
      />
      </View>
    </View>
  );
}

export default MediaScreen;