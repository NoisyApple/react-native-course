import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ColorBox from './ColorBox';

let colors = [
  { name: 'Cyan', hexCode: '#2aa198' },
  { name: 'Blue', hexCode: '#268bd2' },
  { name: 'Magenta', hexCode: '#d33682' },
  { name: 'Orange', hexCode: '#cb4b16' },
];

export default class StylingExercise extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Here are some boxes of different colors</Text>
        <FlatList
          data={colors}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <ColorBox name={item.name} hexCode={item.hexCode} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    margin: 3,
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
});
