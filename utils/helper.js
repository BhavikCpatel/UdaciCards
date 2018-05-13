import { AlertIOS, ToastAndroid, Platform } from 'react-native';

export function alertMessage(message) {
  if (Platform.OS === 'ios') {
    AlertIOS.alert(null, message);
  } else {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
}

export function getDecksList(decks) {
  return Object.keys(decks).map(topicKey => ({
    key: topicKey,
    cards: decks[topicKey].questions.length,
  }));
}
