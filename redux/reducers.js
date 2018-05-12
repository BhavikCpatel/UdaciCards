import * as ActionTypes from './actionTypes';

export default function appReducer(
  state = {
    isWaiting: false,
    decks: {},
    notify: undefined,
  },
  action,
) {
  switch (action.type) {
    case ActionTypes.ADD_CARD:
      return {
        isWaiting: true,
        decks: {
          ...state.decks,
          [action.deck]: {
            title: action.deck,
            questions: [...state.decks[action.deck].questions, action.card],
          },
        },
      };
    case ActionTypes.ADD_DECK:
      return {
        isWaiting: true,
        decks: {
          ...state.decks,
          [action.deck]: {
            title: action.deck,
            questions: [],
          },
        },
      };
    case ActionTypes.GET_DECKS:
      return {
        ...state,
        isWaiting: true,
      };
    case ActionTypes.DECKS_RECEIVED:
      return {
        isWaiting: false,
        decks: action.decks,
      };
    case ActionTypes.NOTIFY:
      return {
        ...state,
        isWaiting: false,
        notify: {
          category: action.category,
          message: action.message,
        } /* Not using Message Type for this simple app */,
      };
    case ActionTypes.RESET_NOTIFY:
      return {
        ...state,
        notify: undefined /* Not using Message Type for this simple app */,
      };
    default:
      return state;
  }
}
