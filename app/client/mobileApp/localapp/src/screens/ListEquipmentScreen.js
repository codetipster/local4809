import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import landService from '../services/landService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/authService';
import { KJUR } from 'jsrsasign';





const ListEquipmentScreen = () => {
  const navigation = useNavigation();
  const [landListings, setLandListings] = useState([]);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const fetchLandListings = async () => {
      try {
        const listings = await landService.getAllLandListings();
        setLandListings(listings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLandListings();
  }, []);

  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const decodedToken = KJUR.jws.JWS.parse(token).payloadObj;
        const userId = decodedToken._id;
        const userInfo = await authService.getUserDetails(token, userId);
        setUserType(userInfo.Role); // Use the retrieved name or fallback to 'User'
      } catch (error) {
        console.error('Failed to fetch user details:', error.message);
      }
    };

    fetchUserInfo();
  }, []); 



  console.log(landListings)
  console.log(userType)

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tw`bg-white mt-4 rounded-lg overflow-hidden`}
      onPress={() => navigation.navigate('ListingDetail', { listing: item })}
    >
    {item.images && item.images.length > 0 && (
      <Image
        style={tw`h-40 w-full`}
        source={{ uri: item.images[0] }}
      />
     )}  
      <View style={tw`p-4`}>
        <Text style={tw`text-lg font-bold`}>{item.title}</Text>
        <Text style={tw`text-sm text-gray-500`}>Size: {item.size}</Text>
        <Text style={tw`text-sm text-gray-500`}>Price: {item.price}</Text>
        <Text style={tw`text-sm text-gray-500`}>Owner: {item.ownerName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-gray-100`}>
       <View style={tw`flex-row h-23 justify-between p-4 bg-[#059669]`}>
          <View style={tw`my-8`}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={tw`h-10 w-10 bg-[#059669]  rounded-full items-center justify-center`}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="white" />
            </TouchableOpacity>
            
          </View>
        </View>

        <View style={tw`flex-row justify-between px-5 py-2`}>
          <View>
            <Text style={tw`text-2xl font-bold text-black`}>Find the best land lease offers near you</Text>
            <View style={tw`flex-row items-center bg-green-50 h-10 px-2 rounded mt-2`}>
              <Ionicons name="search" size={20} color="gray" />
              <TextInput 
                style={tw`ml-2 flex-1 `}
                placeholder="Search by location..."
              />
            </View>
          </View>
        </View>  
        <View style={tw`border-b border-gray-400 mt-2`}></View>
      
        
          <View style={tw`px-4`}>
            <Text style={tw`text-sm px-2 text-gray-500`}> All available lands</Text>
            {landListings.length > 0 ? (
              <FlatList
                data={landListings}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={tw`px-4 pb-4`}
              />
              ) : (
              <View style={tw`h-80 my-8 items-center justify-center`}>
                <Text style={tw`text-lg text-gray-500`}>Oops! It's not you...it's us, listings are coming soon 🎉</Text>
              </View>
            )}
          </View>
        
          {userType === 'landowner' && (
            <TouchableOpacity
              style={tw`items-center justify-center h-12 w-12 bg-[#059669] rounded-full absolute bottom-10 right-10`}
              onPress={() => navigation.navigate('CreateLandScreen')}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          )}
      
    </View>
  );
};

export default ListEquipmentScreen
