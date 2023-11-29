import { View, Text, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'

const FinancialScreen = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView>
        <View style={tw`w-full h-[4rem] px-4 `}>
          <TouchableOpacity activeOpacity={.7} style={tw`h-[3rem] w-[3rem] bg-gray-200 rounded-full items-center justify-center`} onPress={() => navigation.goBack()}> 
          <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
      <Text style={tw`px-4`}>Financial Screen</Text>
    </SafeAreaView>
  )
}

export default FinancialScreen