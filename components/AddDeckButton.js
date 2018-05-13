import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bgColor } from '../utils/colors';

const styles = StyleSheet.create({
  mr24: {
    marginRight: 24,
  },
});
const AddDeckButton = ({ onDeckAdd }) => (
  <TouchableOpacity style={styles.mr24} onPress={onDeckAdd}>
    <Ionicons
      size={30}
      color={bgColor}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
  </TouchableOpacity>
);

AddDeckButton.propTypes = {
  onDeckAdd: PropTypes.func.isRequired,
};
export default AddDeckButton;
