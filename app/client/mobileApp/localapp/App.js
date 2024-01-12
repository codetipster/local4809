import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, BuyScreen, SellScreen, RentScreen, FinancialScreen, PaywallScreen, Community } from './screens';
import { Provider } from 'react-redux';
import RegistrationScreen from './src/screens/RegistrationScreen';
import  IntroSlider  from '../localapp/src/screens/IntroSlider';
import LoginScreen from '../localapp/src/screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import "react-native-gesture-handler";
import tw from 'twrnc';
import { KeyboardAvoidingView, Platform } from 'react-native';
import store from './src/redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if(value == null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    })
  }, []);

  return (
    <Provider store={store}>
    <NavigationContainer>
    <KeyboardAvoidingView 
    style={tw`flex-1`}
    behavior={Platform.OS === 'ios' ? "padding" : "height"} 
    keyboardVerticalOffset={Platform.OS  === 'ios' ? -64 : 0}>
      <Stack.Navigator>
        {isFirstLaunch ? (
          <Stack.Screen options={{headerShown : false}} name="IntroSlider" component={IntroSlider} />
        ) : (
          <Stack.Screen options={{headerShown : false}} name="LoginScreen" component={LoginScreen} />
        )}
        <Stack.Screen options={{headerShown : false}} name="RegistrationScreen" component={RegistrationScreen} />
        <Stack.Screen options={{headerShown : false}} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen options={{headerShown : false}} name="BuyScreen" component={BuyScreen} />
        <Stack.Screen options={{headerShown : false}} name="SellScreen" component={SellScreen} />
        <Stack.Screen options={{headerShown : false}} name="RentScreen" component={RentScreen} />
        <Stack.Screen options={{headerShown : false}} name="FinancialScreen" component={FinancialScreen} />
        <Stack.Screen options={{headerShown : false}} name="Community" component={Community} />
        <Stack.Screen options={{headerShown : false,
        presentation:  "modal"}} name="PaywallScreen" component={PaywallScreen} />
      </Stack.Navigator>
      </KeyboardAvoidingView> 
    </NavigationContainer> 
    </Provider>
  );
}


