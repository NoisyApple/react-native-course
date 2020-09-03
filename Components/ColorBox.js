import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getContrastColor } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ColorBox extends Component {
  render() {
    const { name, hexCode, navigation } = this.props;
    const fontColor = getContrastColor(hexCode);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.setOptions({
            headerStyle: {
              backgroundColor: hexCode,
            },
            headerTintColor: getContrastColor(hexCode),
          })
        }
      >
        <View style={[styles.child, styles.box, { backgroundColor: hexCode }]}>
          <Text
            style={[styles.boxText, styles.text, { color: fontColor }]}
          >{`${name} ${hexCode.toUpperCase()}`}</Text>
        </View>
      </TouchableOpacity>
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
    marginVertical: 3,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  boxText: {
    textAlign: 'center',
    padding: 10,
  },
});
