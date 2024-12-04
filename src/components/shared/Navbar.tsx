import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../../styles/theme/global.styles';
import { useNavigation, StackActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export const Navbar = () => {
    const navigator = useNavigation();

    return (
        <LinearGradient
            colors={['#1565C0', '#e65c00']} // Colores del degradado
            style={globalStyles.navBarContainer} // Estilo para llenar el contenedor
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <Text 
                onPress={() => navigator.dispatch(StackActions.popToTop())}
                style={globalStyles.navBarTitle}>
                Movicoders Basket Team
            </Text>
        </LinearGradient>
    );
};

export default Navbar;


