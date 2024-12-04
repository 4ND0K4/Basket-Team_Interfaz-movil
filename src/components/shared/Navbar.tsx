import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../../styles/theme/global.styles';
import { useNavigation, StackActions } from '@react-navigation/native';

export const Navbar = () => {

    const navigator = useNavigation();

    return (
        <View style={globalStyles.navBarContainer}>
            <Text 
                onPress={ () => navigator.dispatch( StackActions.popToTop ) }
                style={globalStyles.navBarTitle}>
                Movicoders Basket Team
            </Text>
        </View>
    )
}

export default Navbar;

