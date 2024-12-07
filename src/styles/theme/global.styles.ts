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
    // Estilos globales
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
    title: {
        fontSize: 40,
        fontWeight: '300',
        color: 'black',
        marginVertical: 10
    },
    boldText: {
        fontWeight: 'bold',
    },
    // Estilos para formularios
    form: {
        backgroundColor: globalColors.light, 
        padding: 40,
        ...StyleSheet.absoluteFillObject
    },
    formTitle: {
        fontSize: 20,
        fontWeight: '300',
        color: 'black',
        paddingBottom: 10,
        marginHorizontal: 40
    },
    formInput: {
        height: 40,
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    pickerInput: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 5,
        color: '#666666',
    },
    formButton: {
        backgroundColor: globalColors.primary,
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: '100%',
        alignItems: 'center',
    },
    formButtonSeparator: {
        height: 20
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 1,
    },
    // Estilo para los botones
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
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        margin: 20,
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
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 16,
        bottom: 16,
        backgroundColor: '#03A9F4',
        borderRadius: 28,
        elevation: 8,
    },
    // Estilos para el navbar
    navBarContainer: {
        height: 50, // Altura del navbar, ajusta según necesites
        justifyContent: 'center', // Centra el texto verticalmente
        alignItems: 'center', // Centra el texto horizontalmente 
    },
    navBarTitle: {
        fontSize: 18,
        color: 'globalColors.secondary',
        paddingHorizontal: 60,
        paddingVertical: 10,
        fontWeight: 'bold', // Negrita para el título
    },
    // Estilos para la  PlayerCard
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
    // Estilos para la pantalla de PlayerListScreen
    separator: {
        height: 5,
        width: '100%',
        backgroundColor: globalColors.light,
      },
    // Estilos para la pantalla de DetailPlayerScreen
    detailTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    detailImage: {
        width: '100%',
        height: 250,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    detailText: {
        fontSize: 16,
        marginVertical: 5,
    },
    // Estilos para la pantalla de MediaScreen
    mediaContainer: {
        flex: 1,
        backgroundColor: 'globalColors.secondary', 
        justifyContent: 'center',
        alignItems: 'center',
      },
      videoContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: 'globalColors.secondary',
      },
      video: {
        width: '100%',
        height: '100%',
      }
});