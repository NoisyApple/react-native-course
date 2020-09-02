import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getContrastColor } from '../utils';

export default class ColorBox extends Component {
  render() {
    const { name, hexCode } = this.props;
    const fontColor = getContrastColor(hexCode);

    return (
      <View style={[styles.child, styles.box, { backgroundColor: hexCode }]}>
        <Text
          style={[styles.boxText, styles.text, { color: fontColor }]}
        >{`${name} ${hexCode}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  box: {
    borderRadius: 5,
    margin: 3,
  },
  boxText: {
    textAlign: 'center',
    padding: 10,
  },
});
