import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { globalStyles } from "../../styles/theme/global.styles";


interface Props {
    onPress: () => void;
    label: string;
}

export const CreationButton = ({ onPress, label }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.fab}>
      <Text style={styles.fabText}>{label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
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
  fabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default CreationButton;