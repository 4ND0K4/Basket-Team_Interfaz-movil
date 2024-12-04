import { StyleSheet, Text, View } from 'react-native';

export const Navbar = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Movicoders Basket Team
            </Text>
        </View>
    )
}

export default Navbar;

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: 'blue', 
    },
    title: {
        fontSize: 18,
        color: 'orange',
        paddingHorizontal: 100,
        paddingVertical: 10,
        
    },
    
});