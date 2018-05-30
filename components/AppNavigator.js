import { createStackNavigator } from 'react-navigation';
import DeckList from './DeckList';
import DeckDetail from './DeckDetail';
import Quiz from './Quiz';
import AddFlashCard from './AddFlashCard';
import DeckEntry from './DeckEntry';
import ScoreCard from './ScoreCard';
import { bgColor, headerTextColor } from '../utils/colors';

const RootNavigator = createStackNavigator(
  {
    Decks: {
      screen: DeckList,
      navigationOptions: {
        title: 'Decks',
      },
    },
    TopicEntry: {
      screen: DeckEntry,
      navigationOptions: {
        title: 'Add New Deck',
      },
    },
    DeckDetail: {
      screen: DeckDetail,
    },
    ScoreCard: {
      screen: ScoreCard,
    },
    Quiz: {
      screen: Quiz,
    },
    FlashCardEntry: {
      screen: AddFlashCard,
    },
  },
  {
    initialRouteName: 'Decks',

    navigationOptions: {
      headerStyle: {
        backgroundColor: headerTextColor,
      },
      headerTintColor: bgColor,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default RootNavigator;
