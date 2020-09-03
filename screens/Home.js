import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PaletteOverview from '../components/PaletteOverview';

const Home = ({ navigation }) => {
  const [palettes, setPalettes] = useState([]);

  const getPalettesFromAPI = useCallback(async () => {
    const request = await fetch(
      'https://notes-app-5fe57.firebaseio.com/db/palettes.json',
    );
    const data = await request.json();

    setPalettes(data);
  }, []);

  useEffect(() => {
    getPalettesFromAPI();
  }, [getPalettesFromAPI]);

  return (
    <View style={styles.container}>
      <FlatList
        data={palettes}
        keyExtractor={(palette) => palette.id + ''}
        renderItem={({ item }) => (
          <PaletteOverview
            handlePress={() => {
              navigation.navigate('ColorPalette', {
                paletteName: item.paletteName,
                colors: item.colors,
              });
            }}
            paletteName={item.paletteName}
            colors={item.colors}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
  },
});

export default Home;
