import React, { Component } from 'react'
import { StatusBar } from 'react-native';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import firebase from 'firebase'

export default class Landing extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
        }
        this.onSignUp = this.onSignUp.bind(this)
    }
    onSignUp(){
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            // console.log()
        })
        .catch((error) =>{
            Alert.alert(error.message)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor='#262A43'/>
                <Text style={{color:'#3E64FF', fontWeight:'bold', fontSize:35, margin:35}}>Login</Text>
                <TextInput style={styles.textinputs}
                    placeholder="Email"
                    placeholderTextColor="#e1e2ea"
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput style={styles.textinputs}
                    placeholder="Password"
                    placeholderTextColor="#e1e2ea"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                />
                <TouchableOpacity onPress={()=> this.props.navigation.navigate("ForgotPassword")}>
                    <Text style={{color:'skyblue',fontWeight:'bold', marginLeft:'45%'}}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.Button}
                onPress={()=>this.onSignUp()}>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>Login</Text>
              </TouchableOpacity>

                <View style={{flexDirection:'row', paddingTop:30}}>
                    <Text style={{color:'#fff',fontWeight:'bold'}}>Don't have an account? </Text>
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate("Signup")}>
                        <Text style={{color:'skyblue',fontWeight:'bold'}}>Sign up</Text>
                    </TouchableOpacity>
                </View>
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
        marginTop:48,
        paddingTop:11,
        paddingLeft:138,
        backgroundColor:'#3E64FF',
        borderRadius:30,
        marginBottom:15,
      },
  });