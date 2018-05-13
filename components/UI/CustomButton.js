import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as theme from '../../utils/colors';

const styles = StyleSheet.create({
  buttonCaption: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.bgColor,
  },
});

const CustomButton = props => (
  <TouchableOpacity style={props.style} onPress={props.onTap}>
    <Text style={styles.buttonCaption}>{props.children}</Text>
  </TouchableOpacity>
);

CustomButton.propTypes = {
  style: PropTypes.number.isRequired,
  onTap: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomButton;
