import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getDecksAsync } from '../redux/asyncActions';
import { getDecksList, setNotification } from '../utils/helper';
import { headerTextColor } from '../utils/colors';
import AddDeckButton from './AddDeckButton';
import styles from './styles/deckListStyle';

const flatListItemSeparator = () => (
  <View
    style={{
      height: 1,
      width: '82%',
      marginLeft: '18%',
      backgroundColor: '#FFD180',
    }}
  />
);

class DockList extends Component {
  static propTypes = {
    decks: PropTypes.object.isRequired,
    isWaiting: PropTypes.bool,
    getDecksAsync: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      goBack: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };
  static defaultProps = {
    notify: null,
    isWaiting: false,
  };
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <AddDeckButton onDeckAdd={() => navigation.navigate('TopicEntry')} />
    ),
  });

  componentDidMount() {
    // Set Local Notification
    setNotification();
    this.props.getDecksAsync();
  }

  flatListFooter = () => (
    <View style={[styles.listItem, styles.addDeckButton]}>
      <Ionicons
        size={30}
        color={headerTextColor}
        name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
      />
      <Text
        style={styles.listFooterText}
        onPress={() => this.props.navigation.navigate('TopicEntry')}
      >
        Add New Deck
      </Text>
    </View>
  );
  showSelectedTopic(topic) {
    this.props.navigation.navigate('DeckDetail', {
      topic: topic.key,
    });
  }
  renderListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => this.showSelectedTopic(item)}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.key.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.listItemTitle}> {item.key} </Text>
        <Text style={styles.listItemSubTitle}>
          {item.cards} {item.cards > 1 ? ` Cards` : ' Card'}
        </Text>
      </View>
      <Ionicons
        size={30}
        style={styles.navigationArrow}
        name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'}
      />
    </TouchableOpacity>
  );

  render() {
    const decks = getDecksList(this.props.decks);
    if (this.props.isWaiting) {
      return (
        <View style={[styles.container, styles.activityView]}>
          <ActivityIndicator size="large" color={headerTextColor} />
        </View>
      );
    }
    return (
      <FlatList
        style={styles.container}
        ItemSeparatorComponent={flatListItemSeparator}
        ListFooterComponent={this.flatListFooter}
        data={decks}
        showsVerticalScrollIndicator={false}
        renderItem={this.renderListItem}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isWaiting: state.isWaiting,
    decks: state.decks,
  };
}

const mapDispatchToProps = dispatch => ({
  getDecksAsync: () => dispatch(getDecksAsync()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DockList);
