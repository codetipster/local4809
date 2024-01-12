// Create a new component file, e.g., LoadingIndicator.js
import React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { StyleSheet, View } from 'react-native';

const LoadingIndicator = ({ visible }) => {
  return (
    <Modal transparent={true} animationType="none" visible={visible} onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});

export default LoadingIndicator;
