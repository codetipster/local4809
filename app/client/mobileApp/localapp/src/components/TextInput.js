// Create a new component file, e.g., TextInput.js
import React from 'react';
import { Input } from '@rneui/base';
import tw from 'twrnc';

const TextInput = ({ placeholder, onChangeText, keyboardType, secureTextEntry }) => {
  return (
    <Input
      containerStyle={tw`w-full my-2 mb-4`}
      inputContainerStyle={tw`py-1`}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default TextInput;
