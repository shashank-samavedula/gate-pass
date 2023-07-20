import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, StatusBar,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { fetchUser } from '../redux/app-redux';
import AddImage from './AddImage';
import * as firebase from 'firebase';

const mapStateToProps =(state) => {
    return{
      currentUser: state.currentUser,
    };
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return { 
      fetchUser: () => {dispatch(fetchUser())},
     };
  }

class Profile extends React.Component {

    userSignout(){
        firebase.auth().signOut()
    }

    render() {
        if(this.props.currentUser.downloadURL){
            return (
                <View style={styles.Container}>
                <StatusBar barStyle='light-content' backgroundColor="#262A43" />
                <Image style={styles.image} source={{uri: this.props.currentUser.downloadURL}} />
                <Text style={{color:'#fff',fontWeight:'bold',marginTop:15,fontSize:20}}>{this.props.currentUser.name}</Text>
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>{this.props.currentUser.email}</Text>
            <AddImage />
            <TouchableOpacity style={styles.button2} onPress={()=>this.userSignout()}>
        <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>Logout</Text>
      </TouchableOpacity>

            </View>
        )}
        else{
            return (
                <View style={styles.Container}>
                    <StatusBar barStyle='light-content' backgroundColor="#262A43" />
                <Image style={styles.image2} source={require('./auth/imagesLogo.png')} />
                    <Text style={{color:'#fff',fontWeight:'bold',marginTop:15,fontSize:20}}>{this.props.currentUser.name}</Text>
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>{this.props.currentUser.email}</Text>
            <AddImage />
            <TouchableOpacity style={styles.button2} onPress={()=>this.userSignout()}>
        <Text style={{color:'#fff',fontWeight:'bold',fontSize:15}}>Logout</Text>
      </TouchableOpacity>

            </View>
        )
        }
    }
}

const styles = StyleSheet.create({
    Container:{
      flex:1,
      backgroundColor:'#262A43',
      justifyContent:'flex-start',
      alignItems:'center',
    },
    image:{
        marginTop:20,
        width: 190, 
        height: 190,
        borderRadius:100,
        borderColor:'#fff',
        borderWidth:4,
    },
    image2:{
        marginTop:20,
        width: 190, 
        height: 190,
        borderRadius:100,
        borderWidth:4,
        borderColor:'#fff'
    },
    button2:{
        marginTop:10,
        width:90,
        height:45,
        paddingTop:10,
        paddingLeft:20,
        backgroundColor:'#3E64FF',
        borderRadius:30,
      },
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);