import { StyleSheet } from 'react-native';
import * as theme from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.headerTextColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeView: {
    flex: 1,
    backgroundColor: theme.headerTextColor,
  },
});

export default styles;
