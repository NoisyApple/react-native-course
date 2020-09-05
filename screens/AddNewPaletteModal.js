import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  Button,
} from 'react-native';
import ColorSwitch from '../components/ColorSwitch';
import { TextInput } from 'react-native-gesture-handler';

const AddNewPaletteModal = ({ navigation }) => {
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paletteNameText, setPaletteNameText] = useState('');
  const [paletteColors, setPaletteColors] = useState([]);
  const [colorCount, setColorCount] = useState(0);

  const getColorsFromAPI = useCallback(async () => {
    const request = await fetch(
      'https://notes-app-5fe57.firebaseio.com/db/cssColors.json',
    );
    const data = await request.json();

    setColors(data);
    setIsLoading(false);
  }, []);

  const addColor = (color) => {
    let index = paletteColors.findIndex((c) => c.colorName === color.colorName);

    if (index === -1) {
      setPaletteColors((pColors) => {
        setColorCount((count) => ++count);
        return [...pColors, color];
      });
    }
  };

  const removeColor = (color) => {
    let index = paletteColors.findIndex((c) => c.colorName === color.colorName);

    if (index !== -1) {
      setPaletteColors((pColors) => {
        setColorCount((count) => --count);

        let newPColors = pColors;
        newPColors.splice(index, 1);
        return newPColors;
      });
    }
  };

  useEffect(() => {
    getColorsFromAPI();
  }, [getColorsFromAPI]);

  const addPalette = useCallback(async () => {
    if (!paletteNameText) {
      alert('Enter a name for your palette.');
      return;
    }

    if (colorCount < 3) {
      alert('Select at least 3 colors.');
      return;
    }

    const request = await fetch(
      'https://notes-app-5fe57.firebaseio.com/db/palettes.json',
    );

    let dbPalettes = await request.json();

    if (dbPalettes === null) {
      dbPalettes = [];
    }

    dbPalettes = [
      {
        id: dbPalettes.length,
        colors: paletteColors,
        paletteName: paletteNameText,
      },
      ...dbPalettes,
    ];

    await fetch('https://notes-app-5fe57.firebaseio.com/db/palettes.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dbPalettes),
    });

    navigation.navigate('Home', { newPalettes: dbPalettes });
  }, [paletteNameText, colorCount, navigation, paletteColors]);

  if (isLoading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Name of your color palette</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Palette Name"
          value={paletteNameText}
          onChangeText={(text) => {
            setPaletteNameText(text);
          }}
        />
        <FlatList
          style={styles.list}
          data={colors}
          keyExtractor={(item) => item.colorName}
          renderItem={({ item }) => (
            <ColorSwitch
              addColor={addColor}
              removeColor={removeColor}
              colorName={item.colorName}
              hexCode={item.hexCode}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <View style={styles.buttonContainer}>
          <Text
            style={[
              styles.colorsCount,
              colorCount < 3
                ? { color: 'crimson' }
                : { color: 'mediumseagreen' },
            ]}
          >{`${colorCount} colors selected`}</Text>
          <Button title="ADD PALETTE" onPress={addPalette} />
          {/* <Text style={styles.buttonText}>ADD PALETTE</Text> */}
        </View>
        <View style={styles.bottomSpacing} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    alignSelf: 'center',
    width: '90%',
    height: 1,
    backgroundColor: '#0002',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  textInput: {
    fontSize: 20,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 10,
    // fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  bottomSpacing: {
    height: 22,
  },
  colorsCount: {
    fontSize: 18,
    margin: 8,
  },
});

export default AddNewPaletteModal;
