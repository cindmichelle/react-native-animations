import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import SwipeableCards from './components/SwipeableCards';
import FavoriteButton from './components/FavoriteButton';

export default class App extends Component<{}, {}> {
  render() {
    return (
      <View style={styles.container}>
        <SwipeableCards />
        <FavoriteButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardNotExistText: {fontSize: 22},
});
