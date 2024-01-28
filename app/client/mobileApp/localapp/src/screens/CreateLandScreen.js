import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import { Button } from '@rneui/base';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import TextInput from '../components/TextInput';
import landService from '../services/landService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateLandScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [landDetails, setLandDetails] = useState({
        title: '',
        description: '',
        size: '',
        location: '',
        price: '',
        images: [],
        // Add more fields as needed
      });
    

      const handleImageUpload = async () => {
        try {
          const result = await landService.uploadImages();
          console.log('Selected Images:', result);
          if (result) {
            setLandDetails({ ...landDetails, images: [...landDetails.images, result] });
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Failed to upload image. Please try again.');
        }
      };
    
      const handleCreateListing = async () => {
        setLoading(true);
        try {
          const authToken = await AsyncStorage.getItem('userToken');
          console.log(authToken)
          await landService.createLandListing(landDetails, authToken);
          Alert.alert('Success', 'Land listing created successfully');
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Failed to create land listing. Please try again.');
        }
        setLoading(false);
      };
      
      

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
            <Text style={tw`text-xl font-bold text-gray-400`}>Earn recidual income on your land through lease</Text>
          </View>
        </View>  

        <View style={tw`w-full mt-[0.5rem] px-4`}>
        
          <TextInput
            placeholder='Title'
            value={landDetails.title}
            onChangeText={(text) => setLandDetails({ ...landDetails, title: text })}
          />
          <TextInput
            placeholder="Description"
            value={landDetails.description}
            keyboardType='default'
            onChangeText={(text) => setLandDetails({ ...landDetails, description: text })}
          />
          <TextInput
            placeholder="Size"
            value={landDetails.size}
            keyboardType='default'
            onChangeText={(text) => setLandDetails({ ...landDetails, size: text })}
          />
          <TextInput
            placeholder="Location"
            value={landDetails.location}
            keyboardType='default'
            onChangeText={(text) => setLandDetails({ ...landDetails, location: text })}
          />
          <TextInput
            placeholder="Price per month (#)"
            value={landDetails.price}
            keyboardType='default'
            onChangeText={(text) => setLandDetails({ ...landDetails, price: text })}
          />
         
         {/* Image Upload Button */}
         <Button title="Upload Image(s)" onPress={handleImageUpload} />
           <View style={tw`h-10 bg-black-500 color-white`}>
                {/* Display uploaded image URLs */}
                {landDetails.images.map((imageUrl, index) => (
                <Text key={index} style={tw`text-gray-500`}>
                    Image {index + 1}: {imageUrl}
                </Text>
                ))}
           </View>
        </View>
        <View style={tw`w-full items-center`}> 
          <Button
          title={loading ? 'Creating in...' : 'Add Listing'}
          buttonStyle={tw`w-[15rem] py-3 mt-4 text-white bg-black rounded-100`}
          onPress={handleCreateListing}
          disabled={loading}
          />
        </View>
    </View>
  )
}

export default CreateLandScreen