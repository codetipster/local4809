import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import TextInput from '../components/TextInput';
import LoadingIndicator from '../components/LoadingIndicator';
import tw from 'twrnc';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import authService from '../services/authService';


const RegistrationScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('consumer');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const navigation = useNavigation();

  const handleRegistration = async () => {
    setLoading(true);
    try {
      await authService.registerUser(email, password, selectedCategory);
      Alert.alert('Registration Successful', 'You can now log in with your email and password.');
    } catch (error) {
      Alert.alert('Registration Failed', error.message || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <SafeAreaView style={tw`flex-1 relative`}>
      <Image
        source={require('../../assets/images/cloud.png')}
        style={[{transform: [{ rotate: '270deg' }]}, tw`absolute bottom-0 h-100 w-100`]}
      />

        <View style={tw`w-full mt-[4rem] px-4`}>
          <Text style={tw`text-[2.5rem] font-medium`}>
            Register
          </Text>
          <Text style={tw`text-[1.1rem] text-gray-500`}>
            Please Register an account to continue
          </Text>
        </View>
      <View style={tw`w-full mt-[6rem] px-4`}>
        <TextInput
            placeholder='Email'
            onChangeText={(text) => {
              if (validateEmail(text)) {
                setEmail(text);
                setEmailError(false);
              } else {
                setEmailError(true);
              }
            }}
            keyboardType='email-address'
            secureTextEntry={true}
        />
        <TextInput
            placeholder='Password'
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        <RNPickerSelect
            onValueChange={(value) => setSelectedCategory(value)}
            items={[
              { label: 'Consumer', value: 'consumer' },
              { label: 'Farmer', value: 'farmer' },
              { label: 'Landowner', value: 'landowner' },
            ]}   
        />  
      </View>
      <View style={tw`w-full items-center`}>
        <Button
          title={loading ? 'Registering...' : 'Register'}
          buttonStyle={tw`w-[15rem] py-3 mt-4 text-white bg-black rounded-100`}
          onPress={handleRegistration}
          disabled={loading}
        />
        <Text style={tw`my-4 text-gray-500 `}>
          Already have an account? <Text style={tw`text-blue-500`} onPress={() => navigation.navigate('LoginScreen')}>Login</Text>
        </Text>
      </View>
        {loading && (
            <LoadingIndicator visible={loading} />
        )}
        </SafeAreaView>
    </View>
  );
};



export default RegistrationScreen;
