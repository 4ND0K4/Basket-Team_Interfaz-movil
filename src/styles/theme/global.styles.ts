import { StyleSheet }  from 'react-native';

export const globalColors = {   
    primary: '#1565C0',
    secondary: '#e65c00',
    terciary: '#BB86FC',
    success: '#00C853',
    warning: '#FFAB00',
    danger: '#D50000',
    light: '#f8f9fa',
    dark: '#000000',
}

export const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: globalColors.light,
        padding: 20,
        ...StyleSheet.absoluteFillObject
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalColors.light,
        padding: 20,
        ...StyleSheet.absoluteFillObject
    },
    form: {
        backgroundColor: globalColors.light, 
        padding: 40,
        ...StyleSheet.absoluteFillObject
    },
    title: {
        fontSize: 40,
        fontWeight: '300',
        color: 'black',
        marginVertical: 10
    },
    formTitle: {
        fontSize: 20,
        fontWeight: '300',
        color: 'black',
        paddingBottom: 10,
        marginHorizontal: 40
    },
    detailTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    formInput: {
        height: 40,
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 15,
    },
    creationButton: {
        backgroundColor: globalColors.primary,
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: '100%',
        alignItems: 'center',
    },
    navigationButton: {
        backgroundColor: globalColors.primary,
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },
    buttonText: {
        color: globalColors.light,
        fontSize: 20
    },
    detailText: {
        fontSize: 16,
        marginVertical: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    navBarContainer: {
        height: 50, // Altura del navbar, ajusta según necesites
        justifyContent: 'center', // Centra el texto verticalmente
        alignItems: 'center', // Centra el texto horizontalmente 
    },
    navBarTitle: {
        fontSize: 18,
        color: 'globalColors.secondary',
        paddingHorizontal: 100,
        paddingVertical: 10,
        fontWeight: 'bold', // Negrita para el título
    },
    detailImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    cardBody: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'white',
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: 16,
        marginVertical: 5,
    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
});