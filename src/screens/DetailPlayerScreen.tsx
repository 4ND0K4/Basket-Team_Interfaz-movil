import React, { useState, useEffect } from 'react';
import { Text, View, Image, Modal, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
// Navigation
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { type RootStackParams } from '../routes/StackNavigator';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
// Styles
import { globalStyles } from '../styles/theme/global.styles';
import Icon from 'react-native-vector-icons/FontAwesome6';

// Definición de los parámetros de la navegación
type DetailPlayerScreenRouteProp = RouteProp<RootStackParams, 'Detail'>;

export const DetailPlayerScreen: React.FC = () => {
    // Hook de navegación
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    // Hook de ruta
    const route = useRoute<DetailPlayerScreenRouteProp>();
    // Parámetros de la ruta
    const { player: initialPlayer } = route.params;

    const [player, setPlayer] = useState(initialPlayer);
    // Estado del modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Cambio del título de la pantalla
    useEffect(() => {
        navigation.setOptions({
          title: player.nombre,
        });
    }, [player]);

    // Array de imagen para el visor
    const images = [
        {
            url: player.img,
        },
    ];

    return (
        <View style={globalStyles.container}>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Image source={{ uri: player.img }} style={globalStyles.detailImage} />
            </TouchableOpacity>
            <Text style={globalStyles.detailText}><Text style={globalStyles.boldText}>Posición:</Text> {player.posicion}</Text>
            <Text style={globalStyles.detailText}><Text style={globalStyles.boldText}>Número:</Text> {player.num}</Text>
            <Text style={globalStyles.detailText}><Text style={globalStyles.boldText}>Edad:</Text> {player.edad}</Text>
            <Text style={globalStyles.detailText}><Text style={globalStyles.boldText}>Anillos:</Text> {player.anillos}</Text>
            <Text style={globalStyles.detailText} numberOfLines={5}><Text style={globalStyles.boldText}>Descripción:</Text> {player.descripcion}</Text>
            <View style={globalStyles.buttonContainer}>
                <Icon.Button 
                  name="video" 
                  backgroundColor="#007bff"
                  onPress={() => navigation.navigate('Media', { videoUrl: player.video })} 
                >Reproducir video</Icon.Button>
                <Icon.Button  
                  name="pen" 
                  backgroundColor="#FFAB00"
                  onPress={() => navigation.navigate('Edit', { playerId: player.id })} 
                >Editar</Icon.Button>
            </View>
            <Modal visible={isModalVisible} transparent={true}>
                <ImageViewer imageUrls={images} onClick={() => setIsModalVisible(false)} />
            </Modal>
        </View>
    );
};

export default DetailPlayerScreen;