import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// Navigation
import { useNavigation, StackActions } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
// Styles
import { globalStyles } from '../../styles/theme/global.styles';
import Icon from 'react-native-vector-icons/FontAwesome6';

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
                onPress={() =>
                    navigator.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'List' }],
                      })
                    )
                  }                 
                style={globalStyles.navBarTitle}>
                <Icon name="basketball" size={18} color="#e65c00"></Icon> Movicoders Basket Team
            </Text>
        </LinearGradient>
    );
};

export default Navbar;


