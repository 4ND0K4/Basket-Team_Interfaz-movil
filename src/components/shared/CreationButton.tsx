import { TouchableOpacity } from 'react-native';
import { globalStyles } from "../../styles/theme/global.styles";
import Icon from 'react-native-vector-icons/FontAwesome6';


interface Props {
    onPress: () => void;
    label: string;
}

export const CreationButton = ({ onPress, label }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={globalStyles.fab}>
      <Icon name="plus" size={24} color="white"></Icon>
    </TouchableOpacity>
  );
};

export default CreationButton;