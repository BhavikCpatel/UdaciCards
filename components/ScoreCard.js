import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  setNotification,
  clearNotification,
  getScoreMessage,
} from '../utils/helper';
import styles from './styles/scoreCardStyle';

export default class ScoreCard extends Component {
  static propTypes = {
    onBackTap: PropTypes.func.isRequired,
    onRedoTap: PropTypes.func.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    correctAnswers: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.opacity = new Animated.Value(0);
    this.scale = new Animated.Value(0.5);
  }
  componentDidMount() {
    clearNotification().then(setNotification);
    Animated.parallel([
      Animated.sequence([
        Animated.timing(this.scale, {
          duration: 400,
          toValue: 1.0,
          useNativeDriver: true,
        }),
        Animated.timing(this.scale, {
          duration: 400,
          toValue: 0.5,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(this.opacity, {
        duration: 400,
        toValue: 1.0,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    const { totalQuestions, correctAnswers, onBackTap, onRedoTap } = this.props;
    const score = correctAnswers / totalQuestions;
    return (
      <View style={styles.container}>
        <View style={styles.score}>
          <Text style={styles.scoreText}>
            {`Score: ${correctAnswers}/${totalQuestions}`}
          </Text>
        </View>
        <Animated.View
          style={[
            styles.message,
            {
              opacity: this.opacity,
            },
          ]}
        >
          <Text style={styles.messageText}> {getScoreMessage(score)} </Text>
        </Animated.View>
        <View style={styles.image}>
          {score > 0.7 ? (
            <Animated.Image
              style={{
                width: 320,
                height: 320,
                transform: [
                  {
                    scale: this.scale,
                  },
                ],
              }}
              source={require('../assets/welldone.png')}
            />
          ) : (
            <Animated.Image
              style={{
                width: 320,
                height: 250,
                transform: [
                  {
                    scale: this.scale,
                  },
                ],
              }}
              source={require('../assets/keepitup.png')}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 60,
            width: '80%',
          }}
        >
          <TouchableOpacity onPress={onBackTap}>
            <Ionicons
              size={48}
              style={styles.homeIcon}
              name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onRedoTap}>
            <Ionicons
              size={48}
              style={styles.homeIcon}
              name={Platform.OS === 'ios' ? 'ios-redo' : 'md-redo'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
