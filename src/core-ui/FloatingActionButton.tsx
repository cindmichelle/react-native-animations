import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

type Props = {
  src?: string;
  color?: string;
  onPress: () => void;
};

export default function FloatingActionButton(props: Props) {
  let {src, color, onPress} = props;
  return (
    <TouchableOpacity style={styles.fab} activeOpacity={0.7} onPress={onPress}>
      <MaterialIcons
        name={src || 'favorite'}
        size={34}
        color={color || '#ff9999'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 30,
    borderColor: 'grey',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
  },
});
