import * as ActionTypes from './actionTypes';

export function addDeck(deck) {
  return {
    type: ActionTypes.ADD_DECK,
    deck,
  };
}
export function addCard(deck, card) {
  return {
    type: ActionTypes.ADD_CARD,
    card,
    deck,
  };
}

export function getDecks() {
  return {
    type: ActionTypes.GET_DECKS,
  };
}

export function decksReceived(decks) {
  return {
    type: ActionTypes.DECKS_RECEIVED,
    decks,
  };
}

export function notify(category, message, messageType) {
  return {
    type: ActionTypes.NOTIFY,
    message,
    category,
    messageType,
  };
}

export function resetNotify() {
  return {
    type: ActionTypes.RESET_NOTIFY,
  };
}
