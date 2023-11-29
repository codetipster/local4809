import { View, Text, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const ActionCards = ({title, onPress, screen, color, requiresPro, icon, vertical}) => {
    
  return (
    <TouchableOpacity style={tw`border border-green-600 w-[45%] px-1 m-1 rounded-lg shadow-sm flex flex-row items-center justify-between py-3` } onPress={onPress}
     >
      <MaterialIcons name={icon} size={28} color="green" />
      <Text style={tw`text-1xl justify-center w-[80%] px-2`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ActionCards