import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles/deckDetailStyle';
import { alertMessage } from '../utils/helper';
import CustomButton from './UI/CustomButton';

class DockDetail extends Component {
  static propTypes = {
    decks: PropTypes.object.isRequired,
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      goBack: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };
  static defaultProps = {};
  static navigationOptions = ({ navigation }) => {
    const topic = navigation.getParam('topic', '');

    return {
      title: topic || 'Card Detail',
    };
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  startQuiz(topic) {
    // this.props.decks[topic].questions
    const { questions } = this.props.decks[topic];

    if (questions.length > 0) {
      this.props.navigation.navigate('Quiz', {
        topic,
        questions,
      });
    } else {
      alertMessage('Sorry!, this deck is empty. Please add cards first');
    }
  }

  render() {
    const topic = this.props.navigation.getParam('topic', '');
    const cards = topic ? this.props.decks[topic].questions.length : 0;
    return (
      <View style={[styles.container, styles.flexCenterWithPadding]}>
        <View style={styles.card}>
          <View style={styles.cardDetail}>
            <Text style={styles.title}> {topic} </Text>
            <Text style={styles.subTitle}>
              {cards > 0 ? `${cards} Card(s)` : 'Empty Deck'}
            </Text>
          </View>
          <View style={styles.actionBar}>
            <CustomButton
              style={styles.actionButton}
              onTap={() => this.startQuiz(topic)}
            >
              Start Quiz
            </CustomButton>
            <CustomButton
              style={styles.actionButton}
              onTap={() =>
                this.props.navigation.navigate('FlashCardEntry', {
                  topic,
                })
              }
            >
              Add Cards
            </CustomButton>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state.decks,
  };
}

export default connect(mapStateToProps)(DockDetail);
