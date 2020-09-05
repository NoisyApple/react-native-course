import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';

import ColorPalette from './screens/ColorPalette';
import Home from './screens/Home';
import AddNewPaletteModal from './screens/AddNewPaletteModal';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

class MainStackScreen extends Component {
  render() {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <Button
                title="Add   "
                onPress={() => navigation.navigate('Add New Palette')}
              />
            ),
          })}
        />
        <MainStack.Screen
          name="ColorPalette"
          component={ColorPalette}
          options={({ route }) => ({ title: route.params.paletteName })}
        />
      </MainStack.Navigator>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={MainStackScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Add New Palette"
            component={AddNewPaletteModal}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
