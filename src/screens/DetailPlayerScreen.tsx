import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../routes/StackNavigator';
import NavigationButton from '../components/shared/NavigationButton';
import { Player } from '../models/Player';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

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
        <View style={styles.container}>
            <Text>Detail Player Screen</Text>
            <Text>
                { player.id } - { player.nombre }
            </Text>
            <Image source={{ uri: player.img }} style={styles.image} />
            <Text style={styles.title}>{player.nombre}</Text>
            <Text style={styles.text}><Text style={styles.boldText}>Posición:</Text> {player.posicion}</Text>
            <Text style={styles.text}><Text style={styles.boldText}>Número:</Text> {player.num}</Text>
            <Text style={styles.text}><Text style={styles.boldText}>Edad:</Text> {player.edad}</Text>
            <Text style={styles.text}><Text style={styles.boldText}>Anillos:</Text> {player.anillos}</Text>
            <Text style={styles.text}><Text style={styles.boldText}>Descripción:</Text> {player.descripcion}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Reproducir Video" onPress={() => { /* Lógica para reproducir video */ }} />
                <Button title="Editar" onPress={() => { /* Lógica para editar jugador */ }} />
                <NavigationButton 
                    onPress={ () => navigation.navigate('List') }
                    label="Volver"
                />
            </View>
        </View>
    );
};

export default DetailPlayerScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white',
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      marginVertical: 5,
    },
    boldText: {
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
  });