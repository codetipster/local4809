import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/authService';
import { KJUR } from 'jsrsasign';



function HomeScreen() {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('User');

    const options = [
        { name: 'Lands', icon: 'ios-map', screen: 'LandsScreen', description: 'View all available lands' },
        { name: 'Farm Equipments', icon: 'ios-hammer', screen: 'EquipmentsScreen', description: 'Browse farming equipments' },
        { name: 'Trainings', icon: 'ios-school', screen: 'TrainingsScreen', description: 'Access training materials' },
        { name: 'Markets', icon: 'ios-cart', screen: 'MarketsScreen', description: 'Buy and sell farm produce' },
    ];

    useEffect(() => {
        // Fetch user details when the component mounts
        const fetchUserInfo = async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            const decodedToken = KJUR.jws.JWS.parse(token).payloadObj;
            const userId = decodedToken._id;
            const userInfo = await authService.getUserDetails(token, userId);
            setUserName(userInfo.Name || 'User'); // Use the retrieved name or fallback to 'User'
          } catch (error) {
            console.error('Failed to fetch user details:', error.message);
          }
        };
    
        fetchUserInfo();
      }, []); 
    
    return (
    <SafeAreaView style={tw`flex-1 `}>
        
        {/* Header section with a welcome message to user*/}
        <View style={tw`w-full py-4 px-4`}>
            <View>
            <Text style={tw`text-xl font-bold text-green-400 p-2`}>Hello, {userName}</Text>
            <Text style={tw`text-sm px-2 text-gray-500`}>What would you love to do today?</Text>
            </View>
        </View>

        {/* Body section with buttons */}
        {/* Options section */}
        <View style={tw`flex-1 px-4`}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={tw`flex-row items-center bg-gray-100 p-4 mb-4 rounded-lg`}
                        onPress={() => navigation.navigate(option.screen)}
                    >
                        <Ionicons name={option.icon} size={24} color="#059669" />
                        <View style={tw`ml-4`}>
                            <Text style={tw`text-xl`}>{option.name}</Text>
                            <Text style={tw`text-sm text-gray-500`}>{option.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

    </SafeAreaView>
    );
  }

export default HomeScreen;