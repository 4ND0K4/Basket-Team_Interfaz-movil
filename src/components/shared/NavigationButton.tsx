import { Pressable, Text } from "react-native";
import { globalStyles } from "../../styles/theme/global.styles";


interface Props {
    onPress: () => void;
    label: string;
}

export const NavigationButton = ({ onPress, label }: Props) => {
  return (
    <Pressable  
        onPress={ () => onPress() }
        style={globalStyles.navigationButton}>
      <Text style={ globalStyles.buttonText }>{label}</Text>
    </Pressable>
  );
};

export default NavigationButton;

{/* Botón de navegación a List. Componente sustituido por House */}
            {/*<NavigationButton 
                onPress={ () => navigation.navigate('List' as never) }
                label="Volver"
            />*/}