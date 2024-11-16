import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import xml2js from 'react-native-xml2js';

const XMLInput = ({ setFormData }) => {
  const [xml, setXml] = useState('');

  const handleSubmit = () => {
    xml2js.parseString(xml, (err, result) => {
      if (err) {
        Alert.alert("Invalid XML format");
      } else {
        setFormData(result);
      }
    });
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <TextInput
        placeholder="Enter XML here"
        multiline
        numberOfLines={4}
        onChangeText={setXml}
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10 }}
      />
      <Button title="Render Form from XML Input" onPress={handleSubmit} />
    </View>
  );
};

export default XMLInput;
