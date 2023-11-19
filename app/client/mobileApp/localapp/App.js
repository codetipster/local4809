import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IntroSlider, LoginScreen, SignupScreen, HomeScreen } from './screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

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
    <NavigationContainer>
      <Stack.Navigator>
        {isFirstLaunch ? (
          <Stack.Screen options={{headerShown : false}} name="IntroSlider" component={IntroSlider} />
        ) : (
          <Stack.Screen options={{headerShown : false}} name="LoginScreen" component={LoginScreen} />
        )}
        <Stack.Screen options={{headerShown : false}} name="SignupScreen" component={SignupScreen} />
        <Stack.Screen options={{headerShown : false}} name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer> 
  );
}


