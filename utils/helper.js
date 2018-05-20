import { AlertIOS, ToastAndroid, Platform, AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'com.bhavik.udacicards.notification';

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

// Clear Local Notification
export function clearNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync,
  );
}

// Get Local Notification Message
function getNotificationMessage() {
  return {
    title: 'Study on UdaciCards',
    body: `Don't forget to study on UdaciCards`,
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export function setNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(17);
            tomorrow.setMinutes(0);
            // FOR TEST: tomorrow.setSeconds(tomorrow.getSeconds() + 30);
            Notifications.scheduleLocalNotificationAsync(
              getNotificationMessage(),
              {
                time: tomorrow,
                repeat: 'day',
              },
            );
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

export function getScoreMessage(score) {
  if (score > 0.9) {
    return 'Excellent!';
  }
  return score > 0.7 ? 'Great Job!' : 'Try Hard!';
}
