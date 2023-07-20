import { View, Image, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import firebase from 'firebase'
require("firebase/firestore")
require("firebase/firebase-storage")

export default function Save(props, {navigation}) {
    
    const uploadImage = async () =>{
        const uri = props.route.params.image;
        const childPath = `students/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        const response = await fetch(uri);

        const blob = await response.blob();
        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);
        const taskProgress = snapshot =>{
            // console.log(`transferred: ${snapshot.bytesTransferred}`);
        }
        const taskCompleted = snapshot =>{
            task.snapshot.ref.getDownloadURL().then((snapshot) =>{
                savePostData(snapshot);
                // console.log(snapshot)
            })
        }
        const taskError = snapshot =>{
            // console.log(snapshot)
        }
        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) =>{

        firebase.firestore()
            .collection('students')
            .doc(firebase.auth().currentUser.uid)
            .update({
                downloadURL,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function (){
                // props.navigation.popToTop()
                firebase.auth().signOut()
                Alert.alert("Your profile is updated, Please Login to continue")
            }))
    }

    return (
        <View style={styles.Container}>
            <Image style={styles.image} source={{uri:props.route.params.image}}/>
            <Text style={{color:'#fff', fontSize:15, fontWeight:'bold'}}>Note! This image will appear with your request</Text>
            <TouchableOpacity style={styles.button} onPress={()=> uploadImage()}>
        <Text style={{color:'#fff',fontWeight:'bold',fontSize:22}}>Save</Text>
      </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
      flex:1,
      backgroundColor:'#262A43',
      justifyContent:'flex-start',
      alignItems:'center',
    },
    image:{
        marginVertical:25,
        width: 225, 
        height: 225,
        borderColor:'#fff',
        borderWidth:4,
    },
    button:{
        marginTop:20,
        width:150,
        height:55,
        paddingTop:10,
        paddingLeft:50,
        backgroundColor:'#3E64FF',
        borderRadius:30,
      },
})