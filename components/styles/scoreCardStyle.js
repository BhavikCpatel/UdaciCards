import { StyleSheet } from 'react-native';
import * as theme from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgColor,
    alignItems: 'center',
  },
  score: {
    marginTop: 50,
    maxHeight: 48,
  },
  scoreText: {
    fontSize: 40,
    color: theme.headerTextColor,
  },
  homeIcon: {
    marginBottom: 15,
    color: theme.headerTextColor,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  message: {
    marginBottom: 30,
  },
  messageText: {
    fontSize: 30,
    color: theme.placeholderTextColor,
  },
});

export default styles;
