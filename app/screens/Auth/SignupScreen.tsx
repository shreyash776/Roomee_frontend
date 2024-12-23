import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import tw from 'twrnc';

const SignupScreen: React.FC = ({ navigation }: any) => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });

  const handleInputChange = (key: string, value: string) =>
    setForm({ ...form, [key]: value });

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-6`}>Signup</Text>
      <TextInput
        style={tw`border p-2 mb-4`}
        placeholder="Full Name"
        value={form.fullName}
        onChangeText={(text) => handleInputChange('fullName', text)}
      />
      <TextInput
        style={tw`border p-2 mb-4`}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={tw`border p-2 mb-4`}
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
      />
      <Button title="Signup" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignupScreen;
