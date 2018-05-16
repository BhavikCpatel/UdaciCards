import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { resetNotify } from '../redux/actions';
import { saveCardAsync } from '../redux/asyncActions';
import { alertMessage } from '../utils/helper';
import styles from './styles/entryFormStyles';
import InputBox from './UI/InputBox';
import CustomButton from './UI/CustomButton';

class AddFlashCard extends Component {
  static propTypes = {
    notify: PropTypes.shape({
      category: PropTypes.string,
      message: PropTypes.string,
    }),
    saveCardAsync: PropTypes.func.isRequired,
    resetNotification: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };
  static defaultProps = {
    notify: null,
  };
  static navigationOptions = ({ navigation }) => {
    const deck = navigation.getParam('topic', 'Deck');
    return {
      title: `${deck} - Add Card`,
      deck,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
    };
    this.answerFieldRef = React.createRef();
    this.changeFocus = this.changeFocus.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.notify && !prevProps.notify) {
      alertMessage(`${this.props.notify.message}`);
      this.props.resetNotification();
    }
  }
  /* Validate card for blank question and answer */
  validateCard() {
    return this.state.question && this.state.answer;
  }
  /* Submit Deck for saving */
  submitDeck() {
    const deck = this.props.navigation.getParam('topic');
    if (!deck) {
      alertMessage('Oops!, Something went wrong, Please try again');
    }
    const { question, answer } = this.state;
    if (this.validateCard()) {
      this.props
        .saveCardAsync(deck, {
          question,
          answer,
        })
        .then(() => this.props.navigation.goBack())
        .catch(err => {
          alertMessage(err);
        });
    } else {
      alertMessage('Question and Answer are required for a Card');
    }
  }
  changeFocus() {
    this.answerFieldRef.current.focus();
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={20}
        behavior="padding"
      >
        <InputBox
          onChangeText={text =>
            this.setState(() => ({
              question: text,
            }))
          }
          value={this.state.question}
          autoFocus
          placeholder="Type Question"
          returnKeyLabel="Next"
          blurOnSubmit={false}
          onSubmitEditing={this.changeFocus}
          returnKeyType="next"
        />
        <InputBox
          ref={this.answerFieldRef}
          onChangeText={text =>
            this.setState(() => ({
              answer: text,
            }))
          }
          value={this.state.answer}
          placeholder="Type Answer"
          returnKeyLabel="Save"
          returnKeyType="done"
          onSubmitEditing={() => this.submitDeck()}
        />
        <CustomButton style={styles.saveButton} onTap={() => this.submitDeck()}>
          Save Card
        </CustomButton>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    notify: state.notify,
  };
}
const mapDispatchToProps = dispatch => ({
  resetNotification: () => dispatch(resetNotify()),
  saveCardAsync: (deck, card) => dispatch(saveCardAsync(deck, card)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddFlashCard);
