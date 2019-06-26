import React, {Fragment, useState, useEffect} from 'react';
import FloatingActionButton from '../core-ui/FloatingActionButton';
import {Animated, StyleSheet, Text} from 'react-native';

export default function FavoriteButton() {
  let [animateVisible, setAnimateVisible] = useState(false);
  let renderAnimate = () => {
    setAnimateVisible(!animateVisible);
  };

  return (
    <Fragment>
      {animateVisible && (
        <FavoriteBubble handleAnimateVisible={renderAnimate} />
      )}
      <FloatingActionButton onPress={renderAnimate} />
    </Fragment>
  );
}

type FavoriteBubbleProps = {
  handleAnimateVisible: () => void;
};

export function FavoriteBubble(props: FavoriteBubbleProps) {
  let [yposition] = useState(new Animated.Value(0));
  let [opacity] = useState(new Animated.Value(1));

  let {handleAnimateVisible} = props;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(yposition, {
        toValue: -100,
        duration: 500,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 700,
      }),
    ]).start(() => {
      handleAnimateVisible();
    });
  });

  let animationStyle = {
    backgroundColor: '#ff9999',
    transform: [{translateY: yposition}],
    opacity,
  };

  return (
    <Animated.View style={[styles.fab, animationStyle]}>
      <Text style={{color: '#FFF'}}>+1</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: 'grey',
    borderRadius: 30,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
  },
});
