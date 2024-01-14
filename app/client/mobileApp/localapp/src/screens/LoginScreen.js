//import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import LoadingIndicator from '../components/LoadingIndicator';
import TextInput from '../components/TextInput';
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { KJUR } from 'jsrsasign';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@rneui/base';
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';
import authService from '../services/authService';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const LoginScreen = ({ dispatch, isAuthenticated  }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    

  const handleLogin = async () => {
    setLoading(true);
    try {
      const token = await authService.loginUser(email, password);
      // Save token to AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      dispatch(login(token)); // dispatch login action
      // Fetch user details
      // const decodedToken = jwtDecode(token);
      // const userId = decodedToken._id;
      const decodedToken = KJUR.jws.JWS.parse(token).payloadObj;
      
      const userId = decodedToken._id;
      
      const userDetails = await authService.getUserDetails(token, userId);
      console.log( 'No user details', userDetails);
      // Check if profile is complete
      if (userDetails.Name) {
        // Redirect to profile update screen if profile is incomplete
        
        navigation.navigate('HomeScreen');
      } else {
        navigation.navigate('ProfileUpdateScreen');
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials or network error.');
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
            or <Text style={tw`text-blue-500`} onPress={() => navigation.navigate('RegistrationScreen')}>Register</Text> for a new account
          </Text>
        </View>

        {loading && (
            <LoadingIndicator visible={loading} />
      )}
      </View>

    </SafeAreaView>
   
    </View>
  )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(LoginScreen); // connect LoginScreen component to Redux store