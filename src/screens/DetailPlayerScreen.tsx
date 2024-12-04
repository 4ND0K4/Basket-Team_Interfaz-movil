import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../routes/StackNavigator';
import NavigationButton from '../components/shared/NavigationButton';
import { Player } from '../models/Player';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { globalStyles } from '../styles/theme/global.styles';

type DetailPlayerScreenRouteProp = RouteProp<RootStackParams, 'Detail'>;

export const DetailPlayerScreen: React.FC = () => {
    
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const route = useRoute<DetailPlayerScreenRouteProp>();
    const { player } = route.params;

    useEffect(() => {
        navigation.setOptions({
          title: player.nombre,
        });
      }, [player]);

    return (  
        <View style={globalStyles.container}>
            <Image source={{ uri: player.img }} style={globalStyles.detailImage} />
            <Text style={globalStyles.detailTitle}>{player.nombre}</Text>
            <Text style={globalStyles.detailText}><Text style={globalStyles.boldText}>Posición:</Text> {player.posicion}</Text>
            <Text style={globalStyles.detailText}><Text style={globalStyles.boldText}>Número:</Text> {player.num}</Text>
            <Text style={globalStyles.detailText}><Text style={globalStyles.boldText}>Edad:</Text> {player.edad}</Text>
            <Text style={globalStyles.detailText}><Text style={globalStyles.boldText}>Anillos:</Text> {player.anillos}</Text>
            <Text style={globalStyles.detailText}><Text style={globalStyles.boldText}>Descripción:</Text> {player.descripcion}</Text>
            <View style={globalStyles.buttonContainer}>
                <Button 
                  title="Reproducir Video" 
                  onPress={() => { /* Lógica para reproducir video */ }} />
                <Button title="Editar" onPress={() => navigation.navigate('Edit', { playerId: player.id })} />
                
            </View>
            <NavigationButton 
                    onPress={ () => navigation.navigate('List') }
                    label="Volver"
                />
        </View>
    );
};

export default DetailPlayerScreen;
