import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ColorBox extends Component {
  render() {
    const { name, hexCode } = this.props;

    return (
      <View style={[styles.child, styles.box, { backgroundColor: hexCode }]}>
        <Text
          style={[styles.boxText, styles.text]}
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
    margin: 3,
    borderRadius: 5,
  },
  boxText: {
    textAlign: 'center',
    padding: 10,
    color: '#fff',
  },
});
