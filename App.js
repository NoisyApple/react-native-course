import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ColorPalette from './screens/ColorPalette';
import Home from './screens/Home';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="ColorPalette"
            component={ColorPalette}
            options={({ route }) => ({ title: route.params.paletteName })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
