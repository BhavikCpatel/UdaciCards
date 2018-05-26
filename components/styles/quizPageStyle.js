import { StyleSheet } from 'react-native';
import * as theme from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgColor,
  },
  cardContainer: {
    flex: 1,
    position: 'absolute',
    left: 30,
    right: 30,
    top: 50,
    bottom: 50,
  },
  buttonCaption: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.bgColor,
  },
  score: {
    alignItems: 'center',
  },
  scoreText: {
    paddingTop: 15,
    color: theme.secondaryTextColor,
    fontSize: 20,
  },
  card: {
    flex: 1,
    backgroundColor: theme.secondaryBgColor,
    borderRadius: 10,
    justifyContent: 'center',
    shadowRadius: 0,
    shadowOpacity: 0.6,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cardFace: {
    flex: 1,
    transform: [{ scaleX: 1 }],
    backgroundColor: 'transparent',
    bottom: 24,
  },
  cardBackFace: {
    flex: 1,
    transform: [{ scaleX: -1 }],
    backgroundColor: 'transparent',
    bottom: 24,
  },
  cardDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 32,
    color: theme.headerTextColor,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    color: theme.secondaryTextColor,
  },
  actionBar: {
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
  },
  answerActionBar: {
    justifyContent: 'space-around',
  },
  optionButton: {
    flex: 0.7,
    maxWidth: '45%',
    backgroundColor: theme.headerTextColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default styles;
