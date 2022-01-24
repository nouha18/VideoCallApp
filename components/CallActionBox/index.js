/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View,StyleSheet,Pressable} from 'react-native';

const CallAction = ({onHangUp}) => {
const [isCameraOn,setCameraOn] = React.useState(true);
const [isCameraFront,setCameraFront] = React.useState(true);
const [isMicOn,setMicOn] = React.useState(true);
const [isPhoneOn,setPhoneOn] = React.useState(true);

const onTogglePhone = () =>{
    setPhoneOn(currentValue => !currentValue);
    //onHangUp();
    console.warn(" on press")
    }
    const onActiveMicro= () =>{
        setMicOn(currentValue => !currentValue);
        console.warn(" on press")
    }
    
    const onUpscreen = () =>{
        console.log(" on press")
    }
    const onToggleCamera = () =>{
        setCameraOn(currentValue => !currentValue);
        console.log(" on press")
    }
    const onActiveCamera = () =>{
        setCameraFront(currentValue => !currentValue);
        console.log(" on press")
    }
    

   return (
          <View >
          <View style={styles.overbox}>
          <Pressable  onPress={onToggleCamera}  style={styles.buttonblock}>
          <MaterialIcon name={isCameraOn ? "camera" : "camera-off"} size={40} color={'white'}/>
          </Pressable>
          <Pressable onPress={onActiveCamera}  style={styles.buttonblock}>
          <Ionicons name={isCameraFront ? "camera" : "camera"} size={40} color={'white'}/>
          </Pressable>
          <Pressable   onPress={onUpscreen} style={styles.Up}>
          <AntDesign name="up" size={40} color={'#ffffff'}/>
          </Pressable>
          <Pressable   onPress={onActiveMicro}  style={styles.buttonblock}>
          <FontAwesome name={isMicOn ? "microphone" : "microphone-slash"} size={30} color={'white'}/>
          </Pressable>
          { isPhoneOn ? <Pressable onPress={onTogglePhone} style={[styles.buttonblock,{backgroundColor:'red',}]}>
          <MaterialIcon name={isPhoneOn ? "phone" : "phone-hangup"} size={40} color='white'/>
          </Pressable>
          : <Pressable onPress={onTogglePhone}   style={[styles.buttonblock,{backgroundColor:'green'}]}>
          <MaterialIcon name={isPhoneOn ? "phone" : "phone-hangup"} size={40} color='white'/>
          </Pressable>}
              </View>
              </View>
 );
}

const styles = StyleSheet.create({
    overbox:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      borderRadius:10,
      borderWidth:1,
      borderColor:'#762500', 
      elevation:5,
      shadowColor:'#e2e2e2',
      borderTopRightRadius:15,
      borderTopLeftRadius:15,
      width:'100%',
      height:120,
      marginTop:300,
},
buttonblock:{
height:55,
width:55,
borderColor:'#936a4f',
borderWidth:1,
alignItems:'center',
alignContent:'center',
justifyContent:'space-between',
backgroundColor:'#D5BA98',
paddingTop:7,
borderRadius:27,
    },
Up:{
        alignContent:'flex-start',
        alignItems:'center',
        justifyContent: 'space-between',
        marginTop:-10,
        borderRadius:25,
        height:55,

        width:55,
        margin:0,
        padding:8,
        borderColor:'#936a4f',
        backgroundColor:'#D5BA98',
    },

});

export default CallAction;