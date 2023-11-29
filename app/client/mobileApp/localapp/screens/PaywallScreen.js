import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';


const PaywallScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={tw`bg-[#00171F]`}>
      <View style={tw`m-10 space-y-2`}>
        <Text style={tw`text-2xl text-center uppercase text-green-300 font-bold`}>
          Upgrade 
        </Text>
        <Text style={tw`text-center text-white`}>
          Upgrade to a premium account to access all features
        </Text>  
      </View>

      <TouchableOpacity onPress={()=>navigation.goBack()} style={tw`absolute top-0 right-0 p-5`}>
        <Ionicons name="md-close-circle-sharp" size={32} color="white" />
      </TouchableOpacity>

      <View style={tw`items-center`}> 
      <MaterialCommunityIcons name="trophy-award" size={100} color="#35FF69" />
      </View>
      
      <View style={tw`px-5 pt-5`}>
        <View style={tw`flex-row space-x-10 items-center`}>
          <Ionicons name='md-key' size={32} color={'white'} />
          <View style={tw`flex-1`}>
            <Text style={tw`text-white px-5 font-bold text-lg`}>
              Access to all pro features
            </Text>
            <Text style={tw`text-white px-5 text-sm font-extralight`}>
              Upgrade to the premium version of the app and enjoy all the exclusive features available only to pro users.{" "}
            </Text>
          </View>
        </View>

        <View style={tw`flex-row space-x-10 pt-3 items-center`}>
           <MaterialIcons name="support-agent" size={32} color="white" />
          <View style={tw`flex-1`}>
            <Text style={tw`text-white px-5 font-bold text-lg`}>
              Helpline 24/7 
            </Text>
            <Text style={tw`text-white px-5 text-sm font-extralight`}>
              Get unlimited support from our support team whenever you need it - day or night {" "}
            </Text>
          </View>
        </View>

        <View style={tw`flex-row space-x-10 pt-3 items-center`}>
           <Ionicons name="md-star" size={32} color="white" />
          <View style={tw`flex-1`}>
            <Text style={tw`text-white px-5 font-bold text-lg`}>
              Unlock limited edition content
            </Text>
            <Text style={tw`text-white px-5 text-sm font-extralight`}>
              Get unlimited access to special community notes on developments within the Agric world around you{" "}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={tw`items-center px-10 py-2 mt-10 bg-[#04E762] mx-10 rounded-full`}>
        <Text style={tw`text-black text-md text-center font-bold  mb-1`}>FREE Trial for 1 week...</Text>
        <Text style={tw`text-black`}>Then $9.99/month</Text> 
      </TouchableOpacity>

    </ScrollView>
  )
}

export default PaywallScreen