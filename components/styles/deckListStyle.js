import { StyleSheet } from 'react-native';
import * as theme from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgColor,
  },
  activityView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  listItem: {
    minHeight: 42,
    padding: 18,
    flexDirection: 'row',
    backgroundColor: theme.bgColor,
    alignItems: 'center',
  },
  listFooterItem: {
    flex: 1,
  },
  listFooterText: {
    color: theme.headerTextColor,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItemSeparator: {
    height: 1,
    width: '82%',
    marginLeft: '18%',
    backgroundColor: theme.secondaryBorderColor,
  },
  listItemTitle: {
    color: theme.primaryTextColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItemSubTitle: {
    color: theme.secondaryTextColor,
    fontSize: 12,
  },
  avatar: {
    height: 54,
    width: 54,
    borderRadius: 27,
    backgroundColor: theme.secondaryBgColor,
    borderWidth: 0.9,
    borderColor: theme.secondaryBorderColor,
    marginRight: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.headerTextColor,
  },
  navigationArrow: {
    marginLeft: 'auto',
    color: theme.primaryTextColor,
  },
  addDeckButton: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
