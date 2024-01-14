import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import profileService from '../services/profileService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KJUR } from 'jsrsasign';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const ProfileUpdateScreen = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [governmentID, setGovernmentID] = useState(null);
  const navigation = useNavigation();

  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token:profileupdatescreen', token);
      const decodedToken = KJUR.jws.JWS.parse(token).payloadObj;
      const userId = decodedToken._id;
      console.log('Decoded UserId:', userId);
      const userDetails = {
        Name: name || 'User',
        profileDetails: {
          Phone: phone,
          Address: address,
          ProfileImage: profileImage || 'https://pixabay.com/de/photos/bl%C3%A4tter-pflanze-trocken-herbst-8390274/',
          GovernmentID: governmentID || 'https://pixabay.com/de/photos/bl%C3%A4tter-pflanze-trocken-herbst-8390274/', 
        },
        isProfileComplete: true,
      };
      console.log('User Details from profile update:', userDetails);

      const response = await profileService.updateUserDetails(token, userId, userDetails);
      console.log('Response from profile update:', response);
      setLoading(false);
      Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
      navigation.navigate('HomeScreen');

    }
    catch (error) {
      Alert.alert('Profile Update Failed', error.message || 'Profile update failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-green-500`}>
    <View>
      <Text>ProfileUpdateScreen</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} />
      <Button title="Pick a profile image" onPress={() => pickImage(setProfileImage)} />
      {profileImage && <Image source={{ uri: profileImage }} style={{ width: 200, height: 200 }} />}
      <Button title="Pick a government ID image" onPress={() => pickImage(setGovernmentID)} />
      {governmentID && <Image source={{ uri: governmentID }} style={{ width: 200, height: 200 }} />}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
    </SafeAreaView>
  );
};

export default ProfileUpdateScreen;