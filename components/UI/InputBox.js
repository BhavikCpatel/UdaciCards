import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import {
  headerTextColor,
  placeholderTextColor,
  inputFieldTextColor,
} from '../../utils/colors';

const styles = StyleSheet.create({
  inputField: {
    borderColor: headerTextColor,
    borderWidth: 1,
    height: 48,
    width: '100%',
    padding: 12,
    borderRadius: 8,
    fontSize: 18,
    color: inputFieldTextColor,
    marginBottom: 20,
  },
});

const InputBox = React.forwardRef((props, ref) => (
  <TextInput
    underlineColorAndroid="transparent"
    autoCorrect
    enablesReturnKeyAutomatically
    clearButtonMode="always"
    keyboardAppearance="dark"
    selectionColor={headerTextColor}
    placeholderTextColor={placeholderTextColor}
    style={styles.inputField}
    {...props}
    ref={ref}
  />
));

export default InputBox;
