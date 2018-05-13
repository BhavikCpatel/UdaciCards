import { StyleSheet } from 'react-native';
import * as theme from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    backgroundColor: theme.bgColor,
  },
  saveButton: {
    backgroundColor: theme.headerTextColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 3,
    borderWidth: 0.1,
    borderColor: theme.bgColor,
  },
});

export default styles;
