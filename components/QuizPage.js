import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Animated } from 'react-native';
import styles from './styles/quizPageStyle';
import CustomButton from './UI/CustomButton';

class QuizPage extends Component {
  static propTypes = {
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string,
        answer: PropTypes.string,
      }),
    ).isRequired,
    onQuizComplete: PropTypes.func.isRequired,
  };

  state = {
    isFlipped: false,
    rotate: new Animated.Value(0),
    opacity: new Animated.Value(0),
    scale: new Animated.Value(1),
    correctAnswers: 0,
    questionsIndex: 0,
    totalQuestions: this.props.questions.length,
  };

  componentDidMount() {
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

  flip = answerCount => {
    const { isFlipped } = this.state;
    let { questionsIndex, correctAnswers } = this.state;
    if (isFlipped) {
      questionsIndex += 1;
      correctAnswers += answerCount;
      if (questionsIndex === this.state.totalQuestions) {
        this.props.onQuizComplete(correctAnswers);
        return;
      }

      this.setState(() => ({
        questionsIndex,
        correctAnswers,
        isFlipped: !isFlipped,
      }));
    } else {
      this.setState({
        isFlipped: !isFlipped,
      });
    }
    this.animateQuizCard(isFlipped);
  };

  animateQuizCard(isFlipped) {
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
  }
  render() {
    const {
      isFlipped,
      scale,
      opacity,
      rotate,
      questionsIndex,
      totalQuestions,
    } = this.state;

    if (questionsIndex >= totalQuestions) {
      return null;
    }
    const { question, answer } = this.props.questions[questionsIndex];

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

export default QuizPage;
