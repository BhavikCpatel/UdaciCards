import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Animated, Platform } from 'react-native';
import { connect } from 'react-redux';
import ScoreCard from './ScoreCard';
import styles from './styles/quizPageStyle';
import CustomButton from './UI/CustomButton';

class QuizPage extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParam: PropTypes.func,
      goBack: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };
  static navigationOptions = ({ navigation }) => {
    const topic = navigation.getParam('topic', 'Card Detail');
    return {
      title: Platform.OS === 'ios' ? '' : topic,
    };
  };
  state = {
    isFlipped: false,
    rotate: new Animated.Value(0),
    opacity: new Animated.Value(0),
    scale: new Animated.Value(1),
    totalQuestions: 0,
    correctAnswers: 0,
    questionsIndex: 0,
  };

  componentDidMount() {
    this.setTotalQuestions();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.scale, {
          duration: 400,
          toValue: 1.03,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(this.state.scale, {
        duration: 200,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }

  setTotalQuestions() {
    const questions = this.props.navigation.getParam('questions', []);
    this.setState(() => ({
      totalQuestions: questions.length,
    }));
  }

  flip = answerCount => {
    const { isFlipped } = this.state;
    if (isFlipped) {
      this.setState(prevState => ({
        questionsIndex: prevState.questionsIndex + 1,
        correctAnswers: prevState.correctAnswers + answerCount,
        isFlipped: !prevState.isFlipped,
      }));
    } else {
      this.setState({
        isFlipped: !this.state.isFlipped,
      });
    }

    if (this.state.questionsIndex < this.state.totalQuestions) {
      Animated.sequence([
        Animated.parallel([
          Animated.spring(this.state.rotate, {
            toValue: Number(!isFlipped),
            bounciness: 12,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.scale, {
            duration: 400,
            toValue: 1.03,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(this.state.scale, {
          duration: 200,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      this.props.navigation.setParam('topic', 'Score Card');
    }
  };

  render() {
    const {
      isFlipped,
      scale,
      opacity,
      rotate,
      questionsIndex,
      totalQuestions,
    } = this.state;
    const { navigate, getParam } = this.props.navigation;

    if (questionsIndex >= totalQuestions) {
      return (
        <ScoreCard
          totalQuestions={totalQuestions}
          correctAnswers={this.state.correctAnswers}
          onHomeTap={() => navigate('Decks')}
        />
      );
    }

    const questions = getParam('questions', []);
    const { question, answer } = questions[questionsIndex];

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.cardContainer,
            {
              transform: [
                {
                  scale,
                },
              ],
              opacity,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.card,
              {
                transform: [
                  {
                    rotateY: rotate.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                  {
                    perspective: 1000,
                  },
                ],
              },
            ]}
          >
            {isFlipped ? (
              <View style={styles.cardBackFace}>
                <View style={styles.cardDetail}>
                  <Text style={styles.title}> {answer} </Text>
                </View>
                <View style={[styles.actionBar, styles.answerActionBar]}>
                  <CustomButton
                    style={styles.optionButton}
                    onTap={() => this.flip(1)}
                  >
                    Correct
                  </CustomButton>
                  <CustomButton
                    style={styles.optionButton}
                    onTap={() => this.flip(0)}
                  >
                    Incorrect
                  </CustomButton>
                </View>
              </View>
            ) : (
              <View style={styles.cardFace}>
                <View style={styles.cardDetail}>
                  <Text style={styles.title}> {question} </Text>
                </View>
                <View style={styles.actionBar}>
                  <CustomButton style={styles.optionButton} onTap={this.flip}>
                    Check Answer
                  </CustomButton>
                </View>
              </View>
            )}
          </Animated.View>
          <View style={styles.score}>
            <Text style={styles.scoreText}>
              Question: {this.state.questionsIndex + 1}
              / {this.state.totalQuestions}
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default connect()(QuizPage);
