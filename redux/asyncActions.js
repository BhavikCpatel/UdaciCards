import * as actions from './actions';
import * as api from '../utils/api';

/* Get Decks */
export const getDecksAsync = () => async dispatch => {
  try {
    dispatch(actions.getDecks());
    const decks = await api.getDecks();
    dispatch(actions.decksReceived(decks));
    return Promise.resolve('success');
  } catch (error) {
    return Promise.reject(error);
    // return Promise.reject('Error while getting data');
  }
};

/* Save New Deck */
export const saveDeckAsync = deckTitle => async dispatch => {
  try {
    await api.addDeck(deckTitle);
    dispatch(actions.addDeck(deckTitle));
    dispatch(actions.notify('DECK', 'Deck Saved Successfully', 'success'))
    return Promise.resolve('success');
  } catch (error) {
    return Promise.reject(error);
    // return Promise.reject(`Unable to save deck: ${deckTitle}`)
  }
};

/* Save New Card */
export const saveCardAsync = (deck, card) => async dispatch => {
  try {
    await api.addCardToDeck(deck, card);
    dispatch(actions.addCard(deck, card));
    dispatch(actions.notify('CARD', 'Card Added Successfully', 'success'));
    return Promise.resolve('success');
  } catch (error) {
    return Promise.reject(error);
    // return Promise.reject(`Unable to save card for ${deck} deck`);
  }
};
