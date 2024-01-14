import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'

const LandsScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`w-full h-full z-50`}>
            <View style={tw`w-full h-[4rem] px-4 `}>
                <TouchableOpacity activeOpacity={.7} style={tw`h-[3rem] w-[3rem] bg-gray-200 rounded-full items-center justify-center`} onPress={() => navigation.goBack()}> 
                <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
        <Text>LandsScreen</Text>
      </SafeAreaView>
    </View>
  )
}

export default LandsScreen