import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActionCards from '../components/ActionCards';
import AtmCard from '../components/AtmCard';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-green-500`}>
        
        {/* Header section with user icon and welcome message */}
        <View style={tw`w-full py-0 px-4`}>
            <TouchableOpacity onPress={()=>navigation.navigate('PaywallScreen')} activeOpacity={0.7} style={tw`h-[2.5rem] w-[2.5rem] bg-gray-200 rounded-full items-center justify-center z-50`} >
                <Ionicons name="person-circle-outline" size={34} color="green" />
            </TouchableOpacity>
            <Text style={tw`text-1xl font-bold text-white p-1`}>Welcome, User!</Text>
        </View>


        {/* Action buttons area */}
        <View style={tw`w-full bg-gray-200 h-full py-4`}>
            {/* ATM Card */}
            <View style={tw`h-[45j w-[90] justify-center items-center`}>
                <AtmCard/>
            </View>

            {/* Rows of Action Cards */}
            <View style={tw`py-2 bg-gray-100 my-4 w-full mx-1 rounded-lg px-4 shadow-md`}>
                <View style={tw`flex flex-row item-center justify-between mb-4`}>
                    <ActionCards title="Buy From Farm" screen="BuyScreen" color="green" requiresPro={false} icon="add-shopping-cart" vertical={false} onPress={() => navigation.navigate('BuyScreen')}/>
                    <ActionCards title="Sell Produce" screen="SellProduce" color="blue" requiresPro={false} icon="house-siding" vertical={false} onPress={() => navigation.navigate('SellScreen')}/>
                </View> 

                <View style={tw`flex flex-row item-center justify-between mb-4`}>
                    <ActionCards title="Rent a Farm/equipment" screen="RentFarm" color="yellow" requiresPro={false} icon="landscape" vertical={false} onPress={() => navigation.navigate('RentScreen')}/>
                    <ActionCards title="Community Forum" screen="CommunityForum" color="red" requiresPro={false} icon="people-outline" vertical={false} onPress={() => navigation.navigate('Community')}/>
                </View> 

                <View style={tw`flex flex-row item-center justify-between`}>
                    <ActionCards title="Financial Services" screen="FinancialServices" color="purple" requiresPro={false} icon="attach-money" vertical={false} onPress={() => navigation.navigate('FinancialScreen')}/>
                    <ActionCards title="Settings" screen="Settings" color="gray" requiresPro={false} icon="settings" vertical={false} />
                </View> 
            </View>
        </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
