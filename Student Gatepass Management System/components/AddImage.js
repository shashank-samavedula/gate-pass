import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet, TouchableOpacity,Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function AddImage() {
  const [image, setImage] = useState();
  const [picked, setPicked] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setPicked(true);
    }
  };
  
  if(!picked){
    return (
      <View style={styles.Container}>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>Pick an image from gallery</Text>
    </TouchableOpacity>

      <View style={styles.imageDesign}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius:100,borderWidth:4,borderColor:'#fff'}} />}
      </View>
    </View>
  );
}else{
  return (
    <View style={styles.Container}>

    <TouchableOpacity style={styles.button} onPress={pickImage}>
      <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>Pick an image from gallery</Text>
    </TouchableOpacity>

    <View style={styles.imageDesign}>
    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius:100,borderWidth:4,borderColor:'#fff'}} />}
    </View>

        <TouchableOpacity style={styles.button2} onPress={()=> navigation.navigate('Save', {image})}>
          <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:15,
  },
  imageDesign:{
    margin:13,
  },
  button:{
    width:220,
    height:45,
    paddingTop:10,
    paddingLeft:17,
    backgroundColor:'#3E64FF',
    borderRadius:30,
  },
  button2:{
    width:90,
    height:45,
    paddingTop:12,
    paddingLeft:28,
    backgroundColor:'#3E64FF',
    borderRadius:30,
  },
})