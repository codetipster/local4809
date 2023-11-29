import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import FlipCard from 'react-native-flip-card';
import tw from 'twrnc';

const AtmCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    
    <TouchableOpacity onPress={() => setIsFlipped(!isFlipped)} style={tw`h-[45j w-[90] justify-center items-center rounded-lg `}>
      <FlipCard
        flip={isFlipped}
        flipHorizontal={true}
        flipVertical={false}
        useNativeDriver={false}
        style={tw`w-90 h-[45] rounded-lg shadow-md px-4`}
      >
        {/* Front Side */}
        <View style={tw`bg-[#00171F]  w-90 h-[45] rounded-lg justify-center items-center`}>
          <Text style={tw`text-white text-lg font-bold`}>Johnny Doe</Text>
          <Text style={tw`text-white mt-2`}>1234 5678 9012 3456</Text>
          <View style={tw`flex-row mt-4`}>
            <View style={tw`flex-1`}>
              <Text style={tw`text-white text-sm`}>Valid Thru</Text>
              <Text style={tw`text-white`}>12/25</Text>
            </View>
            <View>
              <Text style={tw`text-white text-sm`}>Bank Name</Text>
            </View>
          </View>
        </View>
        {/* Back Side */}
        <View style={tw`bg-gray-600 w-90 h-[45] rounded-lg justify-center items-center`}>
          <Text style={tw`text-white text-lg`}>CVV: 123</Text>
          <Text style={tw`text-white mt-2`}>Signature: _________</Text>
          <Text style={tw`text-white mt-4`}>Bank Hotline: 1800-123-456</Text>
        </View>
      </FlipCard>
    </TouchableOpacity>
    
  );
};

export default AtmCard;
