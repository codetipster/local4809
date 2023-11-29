import { View, Text, SafeAreaView, TouchableOpacity  } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import {  createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Feed from './tabScreens/Feed';
import Notifications from './tabScreens/Notifications';
import Setting from './tabScreens/Setting';
import { MaterialIcons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

function TabGroup() {
    return (
      
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        // headerTitleAlign: "center",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "rss-feed" : "rss-feed";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings";
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications-on" : "notifications-on";
          }
          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#00783C",
        tabBarInactiveTintColor: "gray",
      })}>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Settings" component={Setting} />    
      </Tab.Navigator>
      
      
    );
  }

const Community = () => {
    const navigation = useNavigation();
  return (
    <>
      <TabGroup/>
    </>
  )
}

export default Community