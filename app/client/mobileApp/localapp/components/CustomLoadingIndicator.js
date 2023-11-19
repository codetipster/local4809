import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { MotiView } from 'moti';

const CustomLoadingIndicator = () => {
  return (
    <MotiView
      from={{ rotate: '0deg' }}
      animate={{ rotate: '360deg' }}
      transition={{
        type: 'timing',
        duration: 1000,
        loop: true,
      }}
      style={styles.spinner}
    >
      {/* Your custom spinner component */}
    </MotiView>
  )
}

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
    spinner: {
      width: 50,
      height: 50,
      // Customize your spinner style
    },
  });

export default CustomLoadingIndicator