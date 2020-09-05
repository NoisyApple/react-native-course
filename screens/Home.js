import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import PaletteOverview from '../components/PaletteOverview';

const Home = ({ navigation, route }) => {
  const [palettes, setPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPalettesFromAPI = useCallback(async () => {
    let data;

    if (!route.params) {
      const request = await fetch(
        'https://notes-app-5fe57.firebaseio.com/db/palettes.json',
      );
      data = await request.json();
    } else {
      data = route.params.newPalettes;
    }

    setPalettes(data);
  }, [route.params]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getPalettesFromAPI();
    setIsRefreshing(false);
  }, [setIsRefreshing, getPalettesFromAPI]);

  useEffect(() => {
    getPalettesFromAPI();
  }, [getPalettesFromAPI]);

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
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
