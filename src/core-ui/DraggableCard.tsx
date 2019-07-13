import React, {useState} from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  PanResponder,
  PanResponderGestureState,
} from 'react-native';

export default function DraggableCard() {
  let [animatedValueScale] = useState(new Animated.Value(1));
  let animatedValueTransform = new Animated.ValueXY();
  let _value = {x: 0, y: 0};
  animatedValueTransform.addListener((value) => {
    _value = value;
  });

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      _onPressIn();
      animatedValueTransform.setOffset({x: _value.x, y: _value.y});
      animatedValueTransform.setValue({x: 0, y: 0});
    },
    onPanResponderMove: Animated.event([
      null,
      {dx: animatedValueTransform.x, dy: animatedValueTransform.y},
    ]),
    onPanResponderRelease: ({}, gestureState: PanResponderGestureState) => {
      animatedValueTransform.flattenOffset();
      _onPressOut();
      // Animated.decay(animatedValueTransform, {
      //   deceleration: 0.997,
      //   velocity: {x: gestureState.vx, y: gestureState.vy},
      // }).start();
    },
  });

  let _onPressIn = () => {
    Animated.spring(animatedValueScale, {toValue: 0.9}).start();
  };

  let _onPressOut = () => {
    Animated.spring(animatedValueScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
    }).start();
  };

  let animatedStyle = {
    transform: [
      {scale: animatedValueScale},
      {translateX: animatedValueTransform.x},
      {translateY: animatedValueTransform.y},
    ],
  };
  return (
    <Animated.View
      style={[animatedStyle, styles.card]}
      {...panResponder.panHandlers}
    >
      <Text style={{color: 'white'}}>Drag Me !</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'blue',
    width: '75%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    borderRadius: 7,
  },
});
