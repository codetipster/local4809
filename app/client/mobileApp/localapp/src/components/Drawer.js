import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator 
    initialRouteName="Home"
    screenOptions={{
        drawerStyle: {
          backgroundColor: '#ffff', // Tailwind's 'green-500'
        },
        headerStyle: {
          backgroundColor: '#059669', // Tailwind's 'green-500'
        },
        headerTintColor: '#fff', // white color for header text and icons
      }}
    >
    {/* <Ionicons name="person-circle-outline" size={34} color="green" /> */}
      <Drawer.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{
            drawerIcon: () => (
            <Ionicons name="home-outline" size={34} color="green" />
            ),
        }}
      />
      <Drawer.Screen 
      name="My Profile" 
      component={ProfileScreen} 
      options={{
            drawerIcon: () => (
            <Ionicons name="person-circle-outline" size={34} color="green" />
            ),
        }}
      />
      {/* Add more screens as needed */}
    </Drawer.Navigator>
  );
}