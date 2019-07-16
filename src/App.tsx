import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import SwipeableCards from './components/SwipeableCards';
import FavoriteButton from './components/FavoriteButton';
import ModalBottomSheet from './components/ModalBottomSheet';
import DraggableCard from './core-ui/DraggableCard';
import ProgressiveImage from './components/ProgressiveImage';

const w = Dimensions.get('window');

export default function App() {
  let [modalVisible, setModalVisible] = useState(false);

  let _handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      {/* <SwipeableCards /> */}
      {/* <TouchableOpacity style={styles.button} onPress={_handleModal}>
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
      </TouchableOpacity> */}
      <FavoriteButton />
      {/* <ModalBottomSheet
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
      </ModalBottomSheet> */}
      {/* <DraggableCard /> */}
      <ProgressiveImage
        thumbnailSource={{
          uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=50&buster=${Math.random()}`,
        }}
        source={{
          uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=${w.width *
            2}&buster=${Math.random()}`,
        }}
        style={{width: w.width, height: w.width}}
        resizeMode="cover"
      />
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
