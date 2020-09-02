import React, { Component } from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import ColorBox from '../components/ColorBox';

export default class ColorPalette extends Component {
  render() {
    const { colors, paletteName } = this.props.route.params;

    return (
      <View style={styles.container}>
        <FlatList
          data={colors}
          keyExtractor={(item) => item.colorName}
          renderItem={({ item }) => (
            <ColorBox name={item.colorName} hexCode={item.hexCode} />
          )}
          ListHeaderComponent={<Text style={styles.text}>{paletteName}</Text>}
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
