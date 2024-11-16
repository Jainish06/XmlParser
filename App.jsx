import React, {useState} from 'react';
import {View, Button, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import FormRenderer from './FormRenderer';
import XMLInput from './XMLInput';
import xml2js from 'react-native-xml2js';

const App = () => {
  const [formData, setFormData] = useState(null);

  const handleFilePick = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.plainText],
      });
      const fileUri = file.uri;
      const fileData = await fetch(fileUri);
      const text = await fileData.text();
      parseXML(text);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('File upload canceled');
      } else {
        Alert.alert('Error', 'Failed to upload file');
      }
    }
  };
  
  const parseXML = xml => {
    xml2js.parseString(xml, (err, result) => {
      if (err) {
        Alert.alert('Invalid XML format');
      } else {
        setFormData(result);
      }
    });
  };

  return (
    <View style={{padding: 20}}>
      <Button title="Render Form from XML File" onPress={handleFilePick} />
      <XMLInput setFormData={setFormData} />
      {formData && <FormRenderer data={formData} />}
    </View>
  );
};

export default App;

// import React, { useState } from 'react';
// import { View, Button, TextInput, Text, Alert, ScrollView } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import { parseString } from 'react-native-xml2js';

// const ALLOWED_ELEMENTS = ['TextField', 'DateTimeField', 'RadioButtons', 'DrawingField'];

// const App = () => {
//   const [xmlContent, setXmlContent] = useState('');
//   const [parsedXml, setParsedXml] = useState(null);

// const handleFileUpload = async () => {
//   try {
//     const file = await DocumentPicker.pickSingle({
//       type: [DocumentPicker.types.plainText],
//     });

//     const fileContent = await fetch(file.uri).then(res => res.text());
//     renderXml(fileContent);
//   } catch (err) {
//     if (DocumentPicker.isCancel(err)) {
//       Alert.alert('File upload canceled');
//     } else {
//       Alert.alert('Error', 'Failed to upload file');
//     }
//   }
// };

//   const handleXmlInput = () => {
//     renderXml(xmlContent);
//   };

//   const renderXml = (content) => {
//     parseString(content, (err, result) => {
//       if (err) {
//         Alert.alert('Error', 'Invalid XML format');
//       } else {
//         if (isXmlValid(result)) {
//           setParsedXml(result);
//         } else {
//           Alert.alert('Error', 'XML contains disallowed elements. Only TextField, DateTimeField, RadioButtons, and DrawingField are allowed.');
//         }
//       }
//     });
//   };

//   const isXmlValid = (xmlObj) => {
//     const keys = extractElementNames(xmlObj);
//     return keys.every(key => ALLOWED_ELEMENTS.includes(key));
//   };

//   const extractElementNames = (obj) => {
//     let elements = [];
//     for (const key in obj) {
//       elements.push(key);
//       if (typeof obj[key] === 'object') {
//         elements = elements.concat(extractElementNames(obj[key]));
//       }
//     }
//     return elements;
//   };

//   const renderParsedXml = () => {
//     if (!parsedXml) return <Text>No XML rendered yet</Text>;

//     return (
//       <ScrollView>
//         {Object.entries(parsedXml).map(([key, value], index) => (
//           <Text key={index}>{key}: {JSON.stringify(value)}</Text>
//         ))}
//       </ScrollView>
//     );
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Button title="Upload XML File" onPress={handleFileUpload} />
//       <TextInput
//         multiline
//         placeholder="Write or paste XML content here"
//         style={{
//           borderWidth: 1,
//           borderColor: '#ccc',
//           marginVertical: 10,
//           padding: 10,
//           height: 150,
//         }}
//         value={xmlContent}
//         onChangeText={setXmlContent}
//       />
//       <Button title="Render XML Input" onPress={handleXmlInput} />
//       <View style={{ marginTop: 20 }}>
//         {renderParsedXml()}
//       </View>
//     </View>
//   );
// };

// export default App;
