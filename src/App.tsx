import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import SwipeableCards from './components/SwipeableCards';
import FavoriteButton from './components/FavoriteButton';
import ModalBottomSheet from './components/ModalBottomSheet';

export default function App() {
  let [modalVisible, setModalVisible] = useState(false);

  let _handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <SwipeableCards />
      <TouchableOpacity style={styles.button} onPress={_handleModal}>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            marginVertical: 10,
          }}
        >
          Click to show Modal
        </Text>
      </TouchableOpacity>
      <FavoriteButton />
      <ModalBottomSheet
        title="Modal Title"
        visible={modalVisible}
        onVisibleChange={_handleModal}
      >
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
      </ModalBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: 'darkblue',
  },
});
