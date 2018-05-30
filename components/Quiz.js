import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import ScoreCard from './ScoreCard';
import QuizPage from './QuizPage';

class Quiz extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParam: PropTypes.func,
      goBack: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };
  static navigationOptions = ({ navigation }) => {
    const topic = navigation.getParam('topic', '');
    return {
      title: Platform.OS === 'ios' ? '' : topic,
    };
  };

  state = { isCompleted: false, correctAnswers: 0 };
  quizCompletedHandler(correctAnswers) {
    this.setState(() => ({ isCompleted: true, correctAnswers }));
  }

  redoQuiz() {
    this.setState(() => ({ isCompleted: false, correctAnswers: 0 }));
  }
  render() {
    const { isCompleted, correctAnswers } = this.state;
    const { navigate, getParam } = this.props.navigation;
    const topic = getParam('topic', '');
    const questions = getParam('questions', []);

    if (isCompleted) {
      return (
        <ScoreCard
          totalQuestions={questions.length}
          correctAnswers={correctAnswers}
          onBackTap={() => navigate('DeckDetail', { topic })}
          onRedoTap={() => this.redoQuiz()}
        />
      );
    }

    return (
      <QuizPage
        questions={questions}
        onQuizComplete={val => this.quizCompletedHandler(val)}
      />
    );
  }
}

export default connect()(Quiz);
