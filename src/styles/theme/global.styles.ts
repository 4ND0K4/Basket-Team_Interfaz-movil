import { StyleSheet }  from 'react-native';

export const globalColors = {   
    primary: '#6200EE',
    secondary: '#03DAC6',
    terciary: '#BB86FC',
    success: '#00C853',
    warning: '#FFAB00',
    danger: '#D50000',
    light: '#FFFFFF',
    dark: '#000000',
}

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: globalColors.secondary
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalColors.terciary
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 15,
    },
    form: {
        backgroundColor: 'orange', 
        padding: 100
    },
    
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    navigationButton: {
        backgroundColor: globalColors.primary,
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: '100%',
        alignItems: 'center'
    },
    buttonText: {
        color: globalColors.light,
        fontSize: 20
    }
});