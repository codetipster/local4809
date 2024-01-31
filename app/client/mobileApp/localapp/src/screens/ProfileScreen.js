import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import tw from 'twrnc';

const ProfileScreen = () => {
    // Dummy user data
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        userType: 'Land Owner',
        membershipType: 'Pro',
        profileImage: 'https://via.placeholder.com/150' // Placeholder image
    };

    return (
        <View style={tw`flex-1  justify-center pb-20 mt-0`}>
            <View style={tw`items-center pb-30`}>
            <Image source={{ uri: userData.profileImage }} style={tw`w-28 h-28 rounded-full mb-5`} />
            <Text style={tw`text-2xl font-bold mb-2.5 `}>{userData.name}</Text>
            <Text style={tw`text-lg mb-2.5`}>{userData.email}</Text>
            <Text style={tw`text-lg mb-2.5`}>User Type: {userData.userType}</Text>
            <Text style={tw`text-lg mb-2.5`}>Membership: {userData.membershipType}</Text>
            </View>

            <View style={tw`mt-5`}>
             <Button title="Logout" onPress={() => console.log('Logout Pressed')} />
                <Button title="Settings" onPress={() => console.log('Settings Pressed')} />
                <Button title="View Lands" onPress={() => console.log('View Lands Pressed')} />
                <Button title="View Equipment" onPress={() => console.log('View Equipment Pressed')} />
            </View>
        </View>
    );
};

export default ProfileScreen;
