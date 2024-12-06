import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { type RootStackParams } from '../routes/StackNavigator';
import NavigationButton from '../components/shared/NavigationButton';
import { Player } from '../models/Player';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { globalStyles } from '../styles/theme/global.styles';
import Icon from 'react-native-vector-icons/FontAwesome6';
import ImageViewer from 'react-native-image-zoom-viewer';

type DetailPlayerScreenRouteProp = RouteProp<RootStackParams, 'Detail'>;

export const DetailPlayerScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const route = useRoute<DetailPlayerScreenRouteProp>();
    const { player } = route.params;
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        navigation.setOptions({
          title: player.nombre,
        });
    }, [player]);

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
            {/* Botón de navegación a List. Componente sustituido por House */}
            {/*<NavigationButton 
                onPress={ () => navigation.navigate('List' as never) }
                label="Volver"
            />*/}
            <Modal visible={isModalVisible} transparent={true}>
                <ImageViewer imageUrls={images} onClick={() => setIsModalVisible(false)} />
            </Modal>
        </View>
    );
};

export default DetailPlayerScreen;