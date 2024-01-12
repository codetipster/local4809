import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';


const IntroSlider = () => {
  const navigation = useNavigation();
  return (
    <Onboarding
  onSkip={() => navigation.replace("LoginScreen")}
  onDone={() => navigation.navigate("LoginScreen")}
  pages={[
    {
      backgroundColor: '#fff',
      image: <Image source={require('../../assets/images/buy.png')} 
        style={styles.imageStyle}
      />,
      title: 'Buy Direct From Farm',
      subtitle: 'For a pocket friendly price, get a monthly supply of fresh farm produce',
    },
    {
      backgroundColor: '#fff',
      image: <Image source={require('../../assets/images/rent.png')} 
        style={styles.imageStyle}
      />,
      title: 'Why buy when you can rent?',
      subtitle: 'Rent a land or farm equipment for a period of time',
    },
    {
      backgroundColor: '#fff',
      image: <Image source={require('../../assets/images/train.png')} 
        style={styles.imageStyle}
      />,
      title: 'Trainings',
      subtitle: 'Get trained at a local partner farm, or get a trainer to your farm',
    }
    
  ]}
/>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 200,
    height: 200,
    objectFit: 'contain',
  },
});

export default IntroSlider;
