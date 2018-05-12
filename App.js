import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Constants, Font, AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigator from './components/AppNavigator';
import configureStore from './redux/store';

export default class App extends React.Component {
  static async loadAppState() {
    await Font.loadAsync(Ionicons.font);
  }
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={App.loadAppState}
          onFinish={() =>
            this.setState({
              isReady: true,
            })
          }
          onError={console.warn}
        />
      );
    }
    return (
      <Provider store={configureStore()}>
        <SafeAreaView>
          <View>
            <StatusBar
              style={{
                height: Constants.statusBarHeight,
              }}
              barStyle="light-content"
            />
          </View>
          <RootNavigator />
        </SafeAreaView>
      </Provider>
    );
  }
}
