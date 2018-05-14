import { StyleSheet } from 'react-native';
import * as theme from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgColor,
  },
  flexCenterWithPadding: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttonCaption: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.bgColor,
  },
  card: {
    flex: 1,
    position: 'absolute',
    left: 30,
    right: 30,
    top: 50,
    bottom: 50,
    backgroundColor: theme.secondaryBgColor,
    borderRadius: 10,
    shadowRadius: 0,
    shadowOpacity: 0.6,
    shadowColor: theme.secondaryBorderColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cardDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 42,
    color: theme.headerTextColor,
    paddingBottom: 5,
  },
  subTitle: {
    fontSize: 20,
    color: theme.secondaryTextColor,
  },
  actionBar: {
    alignItems: 'center',
  },
  actionButton: {
    width: '70%',
    height: 48,
    backgroundColor: theme.headerTextColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 8,
  },
});

export default styles;
