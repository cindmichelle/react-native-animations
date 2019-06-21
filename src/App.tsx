import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import SwipeableCards from './components/SwipeableCards';

export default class App extends Component<{}, {}> {
  render() {
    return (
      <View style={styles.container}>
        <SwipeableCards />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardNotExistText: {fontSize: 22, color: '#000'},
});
