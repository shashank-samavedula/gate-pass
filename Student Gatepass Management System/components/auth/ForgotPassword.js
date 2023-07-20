import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Button, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class ForgotPassword extends Component {

    constructor(props){
        super(props);
        this.state={
            email:"",
        }
    }

    onResetPasswordPress = ()=>{
        firebase.auth().sendPasswordResetEmail(this.state.email)
        .then(()=>{
            Alert.alert("Password reset email has been sent")
        },(error) =>{
            Alert.alert(error.message)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{color:'#3E64FF', fontWeight:'bold', fontSize:23, margin:35}}> Forgot Password </Text>
                <TextInput style={styles.textinputs}
                    placeholder="Enter your email"
                    placeholderTextColor="#e1e2ea"
                    value={this.state.email}
                    onChangeText={(text) => {this.setState({email: text})}}
                />

                <TouchableOpacity style={styles.Button}
                    onPress={this.onResetPasswordPress}>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:17}}>Reset Password</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.Button2}
                onPress={()=> this.props.navigation.navigate("Landing")}>
                  <Text style={{color:'#262A43',fontWeight:'bold',fontSize:17}}>Login</Text>
              </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#262A43',
      justifyContent: 'center',
      alignItems:'center',
    },
    textinputs: {
        margin:10,
        width:325,
        height:48,
        paddingLeft:17,
        color:'#fff',
        backgroundColor:'#262A43',
        borderColor:'#3E64FF',
        borderRadius:30,
        borderWidth:1,
    },
    Button:{
        width: 325,
        height: 48,
        marginTop:10,
        paddingTop:11,
        paddingLeft:100,
        backgroundColor:'#3E64FF',
        borderRadius:30,
        marginBottom:15,
      },
    Button2:{
        width: 125,
        height: 48,
        marginTop:35,
        paddingTop:12,
        paddingLeft:42,
        backgroundColor:'#45aaf2',
        borderRadius:30,
        marginBottom:15,
      },
})