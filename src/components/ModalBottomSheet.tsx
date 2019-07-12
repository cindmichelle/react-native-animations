import React, {ReactNode, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewProps,
  Animated,
  LayoutChangeEvent,
  Text,
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponderInstance,
  PanResponder,
} from 'react-native';
import {DARKER_GREY, WHITE, LIGHT_GREY} from '../constants/color';

type Props = ViewProps & {
  children?: ReactNode;
  height?: number;
  visible: boolean;
  onVisibleChange: () => void;
  title: string;
};

export default function ModalBottomSheet(props: Props) {
  let {children, height, style, visible, onVisibleChange, title} = props;
  let [modalVisible, setModalVisible] = useState(false);
  let [modalHeight, setHeight] = useState(height || 200);
  let [yposition] = useState(new Animated.Value(modalHeight));

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
    }
  }, [visible]);

  useEffect(() => {
    modalVisible &&
      visible &&
      Animated.timing(yposition, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
  });

  let animationStyle = {transform: [{translateY: yposition}]};

  let handleBackdropVisible = () => {
    onVisibleChange();
  };

  let onHandleLayout = (event: LayoutChangeEvent) => {
    let {height: viewHeight} = event.nativeEvent.layout;
    setHeight(viewHeight);
  };

  let panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderMove: ({}, gestureState: PanResponderGestureState) => {
      if (gestureState.dy > 0) {
        yposition.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_event: GestureResponderEvent) => {
      if (yposition._value < modalHeight / 2 && yposition._value > 0) {
        Animated.spring(yposition, {
          toValue: 10,
          speed: 5,
          bounciness: 10,
          useNativeDriver: true,
        }).start(() => {});
      } else if (yposition._value >= modalHeight / 2 && modalVisible) {
        Animated.timing(yposition, {
          toValue: modalHeight,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setModalVisible(false);
          handleBackdropVisible();
        });
      }
    },
  });
  return visible ? (
    <TouchableWithoutFeedback onPress={handleBackdropVisible}>
      <View style={styles.backdrop}>
        {modalVisible && (
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.defaultModal,
                style,
                {height: height && modalHeight, paddingBottom: 30},
                animationStyle,
              ]}
              onLayout={onHandleLayout}
            >
              <View style={styles.panableArea} {...panResponder.panHandlers}>
                <View style={styles.panIndicator} />
                <Text style={styles.modalTitle}>{title}</Text>
              </View>

              <View style={styles.divider} />
              <View style={{paddingHorizontal: 40}}>{children}</View>
            </Animated.View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <View />
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  defaultModal: {
    backgroundColor: WHITE,
    minHeight: 200,
  },
  modalTitle: {
    marginVertical: 17,
    textAlign: 'center',
    color: DARKER_GREY,
    fontSize: 14,
    fontWeight: 'bold',
  },
  panIndicator: {
    width: 50,
    height: 10,
    borderRadius: 3,
    backgroundColor: LIGHT_GREY,
    alignSelf: 'center',
    marginBottom: 16,
  },
  panableArea: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    minHeight: StyleSheet.hairlineWidth,
    backgroundColor: LIGHT_GREY,
  },
});
