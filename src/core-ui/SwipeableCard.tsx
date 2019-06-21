import React, {Component, useState} from 'react';
import {
  Text,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  Platform,
  PanResponderInstance,
} from 'react-native';

import {Card} from '../types/Card';
const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  item: Card;
  removeCard: () => void;
};

type State = {
  Xposition: Animated.Value;
  rightText: boolean;
  leftText: boolean;
};

export function SwipeableCardHooks(props: Props) {
  let [xposition] = useState(new Animated.Value(0));
  let [leftText, setLeftText] = useState(false);
  let [rightText, setRightText] = useState(false);

  let _cardOpacity: Animated.Value = new Animated.Value(1);
  let _panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: ({}, gestureState) => {
      xposition.setValue(gestureState.dx);
      if (gestureState.dx > 0) {
        setRightText(true);
        setLeftText(false);
      } else if (gestureState.dx < 0) {
        setLeftText(true);
        setRightText(false);
      }
    },
    onPanResponderRelease: ({}, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH * 0.2 &&
        gestureState.dx > -SCREEN_WIDTH * 0.2
      ) {
        setLeftText(false);
        setRightText(false);
        Animated.spring(xposition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH * 0.2) {
        Animated.parallel([
          Animated.timing(xposition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(_cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setLeftText(false);
          setRightText(false);
          props.removeCard();
        });
      } else if (gestureState.dx < -SCREEN_WIDTH * 0.2) {
        Animated.parallel([
          Animated.timing(xposition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
          }),
          Animated.timing(_cardOpacity, {
            toValue: 0,
            duration: 200,
          }),
        ]).start(() => {
          setLeftText(false);
          setRightText(false);
          props.removeCard();
        });
      }
    },
  });

  let {item} = props;

  let rotateCard = xposition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-20deg', '0deg', '20deg'],
  });

  let customCardStyle = {
    backgroundColor: item.backgroundColor || null,
    opacity: _cardOpacity,
    transform: [{translateX: xposition}, {rotate: rotateCard}],
  };

  return (
    <Animated.View
      {..._panResponder.panHandlers}
      style={[styles.baseCard, customCardStyle]}
    >
      <Text style={styles.cardTitle}> {item.cardTitle} </Text>
      {leftText && <Text style={styles.leftTextStyle}> Left Swipe </Text>}
      {rightText ? (
        <Text style={styles.rightTextStyle}> Right Swipe </Text>
      ) : null}
    </Animated.View>
  );
}
export default class SwipeableCard extends Component<Props, State> {
  state = {
    Xposition: new Animated.Value(0),
    rightText: false,
    leftText: false,
  };

  _panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: ({}, gestureState) => {
      this.state.Xposition.setValue(gestureState.dx);
      if (gestureState.dx > 0) {
        this.setState({
          rightText: true,
          leftText: false,
        });
      } else if (gestureState.dx < 0) {
        this.setState({
          leftText: true,
          rightText: false,
        });
      }
    },
    onPanResponderRelease: ({}, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH * 0.2 &&
        gestureState.dx > -SCREEN_WIDTH * 0.2
      ) {
        this.setState({
          leftText: false,
          rightText: false,
        });
        Animated.spring(this.state.Xposition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH * 0.2) {
        Animated.parallel([
          Animated.timing(this.state.Xposition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(this._cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          this.setState({leftText: false, rightText: false}, () => {
            this.props.removeCard();
          });
        });
      } else if (gestureState.dx < -SCREEN_WIDTH * 0.2) {
        Animated.parallel([
          Animated.timing(this.state.Xposition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
          }),
          Animated.timing(this._cardOpacity, {
            toValue: 0,
            duration: 200,
          }),
        ]).start(() => {
          this.setState({leftText: false, rightText: false}, () => {
            this.props.removeCard();
          });
        });
      }
    },
  });
  _cardOpacity: Animated.Value = new Animated.Value(1);

  render() {
    let {item} = this.props;
    let {Xposition} = this.state;
    let rotateCard = Xposition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-20deg', '0deg', '20deg'],
    });

    let customCardStyle = {
      backgroundColor: item.backgroundColor || null,
      opacity: this._cardOpacity,
      transform: [{translateX: Xposition}, {rotate: rotateCard}],
    };
    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={[styles.baseCard, customCardStyle]}
      >
        <Text style={styles.cardTitle}> {item.cardTitle} </Text>
        {this.state.leftText && (
          <Text style={styles.leftTextStyle}> Left Swipe </Text>
        )}
        {this.state.rightText ? (
          <Text style={styles.rightTextStyle}> Right Swipe </Text>
        ) : null}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  baseCard: {
    width: '75%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 7,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 24,
  },
  leftTextStyle: {
    top: 22,
    right: 32,
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  rightTextStyle: {
    top: 22,
    left: 32,
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});
