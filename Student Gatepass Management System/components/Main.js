import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,StatusBar, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { fetchUser } from '../redux/app-redux';
import * as SMS from 'expo-sms';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
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

class Main extends React.Component {
    addItem = (data,branch,reason,address,sem,phone,enrollmentNo,imageUrl,gaurdianPhone) => {
        var date = new Date().getDate();
        var month = new Date().getMonth();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var monthName = monthNames[month];
        var curTime = `${date}/${monthName}-${hours}:${min}`;
        firebase.database().ref(`chouksey/${this.props.currentUser.branch}`).push().set({
          name: data,
          branch: branch,
          reason: reason,
          address: address,
          sem: sem,
          phone: phone,
          enrollmentNo: enrollmentNo,
          imageUrl: imageUrl,
          gaurdianPhone: gaurdianPhone,
          currtime: curTime,
        });
      };
    
      constructor(props){
        super(props);
        this.state={
            currentUser: this.props.currentUser,
            items:[],
            phone:'',
            sem:'',
            reason:'',
            address:'',
        }
        this.props.fetchUser();
      }
      componentDidMount(){
        this.unsuscribeAuth = firebase.auth().onAuthStateChanged(user=>{
          if(user){
            this.setState({
              email:user.email,
            })
          }
          else{
            this.props.navigation.navigate("Landing");
          }
          })
        }
        componentWillUnmount(){
          this.unsuscribeAuth()
        }

        fetchClassTeacher(nameOfStudent, branchOfStudent){
          firebase.firestore().collection("teacherContacts")
                .doc(this.props.currentUser.branch)
                .get()
                .then((snapshot) => {
                  var hod = snapshot.data();
                  // console.log(hod.phone);
                  firebase.firestore().collection("teacherContacts")
                  .doc(`${this.props.currentUser.branch}-sem${this.state.sem}`)
                  .get()
                  .then((snapshot) => {
                    var teacher = snapshot.data();
                    // console.log(teacher.phone);
                    this.sendAcceptedSms(hod.phone, teacher.phone, nameOfStudent, branchOfStudent)
                  })
                })
              }
              sendAcceptedSms=async(hodPhone, teacherPhone, nameOfStudent, branchOfStudent)=>{
                await SMS.sendSMSAsync(
                  [`${this.props.currentUser.gaurdianPhone}`,`${hodPhone}`,`${teacherPhone}`],
                  `This is to inform you that i ${nameOfStudent} of ${branchOfStudent}/${this.state.sem} sem wants to go home for following reason:

reason: ${this.state.reason}`
                  );
                }


      handleChangeA = e => {
        this.setState({
          reason: e.nativeEvent.text,
        });
      };
    
      handleChangeC = e => {
        this.setState({
          sem: e.nativeEvent.text
        });
      };

      handleChangeB = e => {
        this.setState({
          phone: e.nativeEvent.text
        });
      };

      handleChangeD = e => {
        this.setState({
          address: e.nativeEvent.text
        });
      };
      handleSubmit = () => {
        if(this.state.phone == '' || this.state.sem == '' || this.state.reason == '' || this.state.address == ''){
          Alert.alert("Please fill all the details")
        }
        else{
          if(this.props.currentUser.downloadURL){
            this.addItem(this.props.currentUser.name, this.props.currentUser.branch,this.state.reason, this.state.address, this.state.sem,this.state.phone,this.props.currentUser.enrollmentNo,this.props.currentUser.downloadURL, this.props.currentUser.gaurdianPhone);
            this.fetchClassTeacher(this.props.currentUser.name, this.props.currentUser.branch)
            Alert.alert("Request sent")
          }
          else{
            Alert.alert("Please set your profile pic")
          }
        }
      };
    render() {
      return (
        <View style={styles.Container}>
              <StatusBar barStyle='light-content' backgroundColor='#262A43' />
                <View style={{marginTop:35}}>
                <Text style={{color:"#fff", fontWeight:'bold',marginLeft:15,marginBottom:-32,fontSize:35}}> Student</Text>
                <Text style={{color:"skyblue", fontWeight:'bold',marginLeft:15,marginBottom:20,fontSize:40,marginTop:18}}> GatePass!</Text>

                <TouchableOpacity style={{marginLeft:'80%',paddingBottom:45,marginTop:-105}}
                onPress={()=>{this.props.navigation.navigate('Profile')}}>
              <FontAwesome name="user-circle-o" size={40} color="#fff" />
                </TouchableOpacity>
                </View>
                    <ScrollView>
                <TextInput placeholder='Phone no.'
                  placeholderTextColor="#e1e2ea"
              keyboardType="numeric"
              style={styles.inputStyle}
              value={this.state.phone}
              onChange={this.handleChangeB}
            />
            <TextInput placeholder='Semester'
              placeholderTextColor="#e1e2ea"
              keyboardType="numeric"
            style={styles.inputStyle}
              value={this.state.sem}
              onChange={this.handleChangeC}
            />
                <TextInput placeholder='Reason'
                  placeholderTextColor="#e1e2ea"
                  multiline={true}
            style={styles.inputReason}
              value={this.state.data}
              onChange={this.handleChangeA}
            />
            <View style={{flexDirection:'row'}}>
            <TextInput placeholder="Address"
              placeholderTextColor="#e1e2ea"
              value={this.state.address}
              multiline={true}
              style={styles.inputAddress}
              onChange={this.handleChangeD}
              />

              <TouchableOpacity onPress={this.handleSubmit}>
              <MaterialCommunityIcons
                style={{marginTop:45, marginLeft:-9}}
                name="send-circle" size={62} color="#fff" 
                />
              </TouchableOpacity>
              </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  Container:{
    flex:1,
    backgroundColor:'#262A43',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  inputStyle:{
    width: 325,
    height: 57,
    margin:12,
    color:'#fff',
    fontSize:17,
    borderRadius:12,
    paddingLeft:10,
    backgroundColor:'#3e435b',
  },
  inputReason:{
    width: 325,
    height: 180,
    margin:12,
    borderRadius:15,
    fontSize:17,
    paddingVertical:10,
    textAlignVertical:'top',
    paddingHorizontal:10,
    color:'#fff',
    backgroundColor:'#3e435b',
  },
  inputAddress:{
    width: 270,
    height: 120,
    margin:12,
    borderRadius:15,
    fontSize:17,
    paddingVertical:10,
    textAlignVertical:'top',
    paddingHorizontal:10,
    color:'#fff',
    backgroundColor:'#3e435b',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);