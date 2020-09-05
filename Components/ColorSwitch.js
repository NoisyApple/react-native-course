import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const ColorSwitch = ({ colorName, hexCode, addColor, removeColor }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleSwitch = (newValue) => {
    setIsEnabled(newValue);
    if (newValue) {
      addColor({ colorName: colorName, hexCode: hexCode });
    } else {
      removeColor({ colorName: colorName, hexCode: hexCode });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <View
          style={[
            styles.colorBlock,
            styles.shadow,
            { backgroundColor: hexCode },
          ]}
        />
        <Text style={styles.text}>{colorName}</Text>
      </View>
      <Switch
        style={isEnabled ? styles.shadow : {}}
        trackColor={{ true: hexCode }}
        value={isEnabled}
        onValueChange={handleSwitch}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  colorBlock: {
    width: 30,
    height: 30,
    borderRadius: 7,
    marginRight: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default ColorSwitch;
