
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const FormRenderer = ({ data }) => {
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return <TextInput placeholder={field.label} style={{ borderColor: 'gray', borderWidth: 1, marginVertical: 5 }} />;
      case 'date':
        return <TextInput placeholder="Select a date" style={{ borderColor: 'gray', borderWidth: 1, marginVertical: 5 }} />;
      case 'radio':
        return (
          <View>
            {field.options.map((option, index) => (
              <View key={index}>
                <Text>{option.label}</Text>
                <Button title={option.label} onPress={() => {}} />
              </View>
            ))}
          </View>
        );
      case 'drawing':
        return <Text>Drawing field (implement drawing functionality)</Text>;
      default:
        return null;
    }
  };

  return (
    <View>
      {data.fields.map((field, index) => (
        <View key={index}>
          <Text>{field.label}</Text>
          {renderField(field)}
        </View>
      ))}
    </View>
  );
};

export default FormRenderer;
