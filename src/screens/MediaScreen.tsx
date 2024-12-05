import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import Video from 'react-native-video';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../routes/StackNavigator';
import { globalStyles } from '../styles/theme/global.styles';

type MediaScreenRouteProp = RouteProp<RootStackParams, 'Media'>;

export const MediaScreen: React.FC = () => {

  const route = useRoute<MediaScreenRouteProp>();
  const { videoUrl } = route.params;

  const videoRef = useRef(null);
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