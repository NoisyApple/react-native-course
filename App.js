import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import StylingExercise from './Components/StylingExercise';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StylingExercise />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 70,
  },
});
