import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class PaletteOverview extends Component {
  render() {
    const { paletteName, colors, handlePress } = this.props;

    const previewColors = colors.filter((color, i) => {
      if (i < 8) {
        return color;
      }
    });

    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <View>
          <Text style={styles.text}>{paletteName}</Text>
          <FlatList
            style={styles.list}
            horizontal={true}
            data={previewColors}
            keyExtractor={(item) => item.colorName}
            renderItem={({ item }) => (
              <View
                style={[styles.colorBlock, { backgroundColor: item.hexCode }]}
              />
            )}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 10,
  },
  text: {
    marginBottom: 3,
    fontWeight: 'bold',
    fontSize: 16,
  },
  colorBlock: {
    width: 30,
    height: 30,
    borderRadius: 7,
    marginRight: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  list: {
    height: 35,
  },
});
