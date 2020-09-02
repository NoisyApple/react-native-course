import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ListExercise from './Components/ListExercise';
import StylingExercise from './Components/StylingExercise';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        {/* <StylingExercise /> */}
        <ListExercise />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
