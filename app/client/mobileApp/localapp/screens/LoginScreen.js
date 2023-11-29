import { View, Text, Image,StyleSheet, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {Input} from '@rneui/themed';
import {Button} from '@rneui/base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        email,
        password,
      });
      if (response.status === 200 && response.data.token) {
        // Save token to AsyncStorage
        AsyncStorage.setItem('userToken', response.data.token);
        navigation.navigate('HomeScreen');
      } else {
        // If no token is present or status is not 200
        Alert.alert('Login Failed', 'Login was unsuccessful.');
      }
    } catch (error) {
      // Handle error (e.g., show error message)
      Alert.alert('Login Failed', error.response?.data?.message || 'Invalid credentials or network error.');
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
        source={require('../assets/images/cloud.png')}
        style={[{transform: [{ rotate: '270deg' }]}, tw`absolute bottom-0 h-100 w-100`]}
      />

      <View style={tw`w-full h-full z-50`}>
        <View style={tw`w-full h-[4rem] px-4 `}>
          <TouchableOpacity activeOpacity={.7} style={tw`h-[3rem] w-[3rem] bg-gray-200 rounded-full items-center justify-center`} onPress={() => navigation.goBack()}> 
          <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={tw`w-full mt-[4rem] px-4`}>
          <Text style={tw`text-[2.5rem] font-medium`}>
            Welcome Back!
          </Text>
          <Text style={tw`text-[1.1rem] text-gray-500`}>
            Please login to your account
          </Text>
        </View>

        <View style={tw`w-full mt-[6rem] px-4`}>
          <Input
            containerStyle={tw`w-full my-3 mb-4`}
            inputContainerStyle={tw`py-1`}
            placeholder='Email'
            onChangeText={(text) => {
              if (validateEmail(text)) {
                setEmail(text);
                setEmailError(false);
              } else {
                setEmailError(true);
              }
            }}
            keyboardType='email-address' // Set keyboardType to 'email-address' for email inputs
          />


         <Input
            containerStyle={tw`w-full my-3 mb-4`}
            inputContainerStyle={tw` py-1 `}
            placeholder='Password'
            onChangeText={setPassword}
            keyboardType='default'
            secureTextEntry={true}
          />
        </View>
        <View style={tw`w-full items-center`}> 
          <Button
          title={loading ? 'Logging in...' : 'Login'}
          buttonStyle={tw`w-[15rem] py-3 mt-4 text-white bg-black rounded-100`}
          onPress={handleLogin}
          disabled={loading}
          />
          <Text style={tw`my-4 text-blue-500 `}> 
            Forgotten Password?
          </Text>
          <Text style={tw`my-1 text-gray-500 `}> 
            or <Text style={tw`text-blue-500`}>Signup</Text> for a new account
          </Text>
        </View>

        {loading && (
        <Modal
          transparent={true}
          animationType="none"
          visible={loading}
          onRequestClose={() => {}}>
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Modal>
      )}
      </View>

    </SafeAreaView>
   
    </View>
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
});

export default LoginScreen