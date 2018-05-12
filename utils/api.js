import { AsyncStorage } from 'react-native';
import defaultDecks from './data';

const APP_STORAGE_KEY = 'com.bhavik.UdaciCards';

// getDecks: return all of the decks along with their titles, questions, and answers.
export async function getDecks() {
  try {
    const persistedData = await AsyncStorage.getItem(APP_STORAGE_KEY);
    if (persistedData) {
      const decks = await JSON.parse(persistedData);
      return decks;
    }
    AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(defaultDecks));
    return defaultDecks;
  } catch (error) {
    return Promise.reject(error);
  }
}
// addDeck: take in a single title argument and add it to the decks.
export async function addDeck(deckTitle) {
  await AsyncStorage.mergeItem(
    APP_STORAGE_KEY,
    JSON.stringify({
      [deckTitle]: { title: deckTitle, questions: [] },
    }),
  );
}

/* getDeck: take in a single id argument and return the deck associated with that id.  */
export async function getDeck(deckKey) {
  const decks = await getDecks();
  return deckKey in decks ? decks[deckKey] : { title: deckKey, questions: [] };
}

/* addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. */
export async function addCardToDeck(deckKey, card) {
  const deck = await getDeck(deckKey);
  deck.questions.push(card);
  await AsyncStorage.mergeItem(
    APP_STORAGE_KEY,
    JSON.stringify({ [deckKey]: deck }),
  );
}
