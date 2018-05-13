import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { alertMessage } from '../utils/helper';
import { saveDeckAsync } from '../redux/asyncActions';
import InputBox from './UI/InputBox';
import CustomButton from './UI/CustomButton';
import styles from './styles/entryFormStyles';

class DeckEntry extends Component {
  static propTypes = {
    decks: PropTypes.object.isRequired,
    saveDeckAsync: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }
  /* Validate Deck Entry for blank and duplicate */
  validateDeckName(newDeck) {
    return newDeck
      ? !Object.keys(this.props.decks).find(
          deck => deck.toLowerCase() === newDeck.toLowerCase(),
        )
      : false;
  }
  /* Submit Deck for saving */
  submitDeck(deck) {
    if (this.validateDeckName(deck)) {
      this.props
        .saveDeckAsync(deck)
        .then(() => this.props.navigation.goBack())
        .catch(err => alertMessage(err));
    } else {
      this.setState(() => ({
        title: '',
      }));
      alertMessage('Deck name is already entered, please try another name');
    }
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={20}
        behavior="padding"
      >
        <InputBox
          maxLength={50}
          onChangeText={text =>
            this.setState(() => ({
              title: text,
            }))
          }
          value={this.state.title}
          autoFocus
          placeholder="Type Deck Name"
          returnKeyLabel="Save"
          returnKeyType="done"
          onSubmitEditing={() => this.submitDeck(this.state.title)}
        />
        <CustomButton
          style={styles.saveButton}
          onTap={() => this.submitDeck(this.state.title)}
        >
          Save
        </CustomButton>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    isWaiting: state.isWaiting,
    decks: state.decks,
  };
}
export default connect(
  mapStateToProps,
  {
    saveDeckAsync,
  },
)(DeckEntry);
