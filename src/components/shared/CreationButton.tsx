import { Pressable, Text } from "react-native";
import { globalStyles } from "../../styles/theme/global.styles";


interface Props {
    onPress: () => void;
    label: string;
}

export const CreationButton = ({ onPress, label }: Props) => {
  return (
    <Pressable  
        onPress={ () => onPress() }
        style={globalStyles.creationButton}>
      <Text style={ globalStyles.buttonText }>{label}</Text>
    </Pressable>
  );
};

export default CreationButton;