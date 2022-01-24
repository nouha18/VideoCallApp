/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,Text,StyleSheet,ImageBackground,Alert,Pressable,TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import imagebg from '../../assets/imagebackground.png';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/core';
import {Voximplant} from 'react-native-voximplant';

const onPress = () => {
    Alert.prompt(
      "Enter password",
      "Enter your password to claim your $1.5B in lottery winnings",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Message send,"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: password => console.log("OK Pressed, password: " + password)
        }
      ],
      "secure-text"
    );
  };

const remindMe=()=>{
    Alert.alert(
      "Send Reminder",
      "Choose one of rapid Message",
     [
        {
          text: "Call me later",
          onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
        {
            text: "Hello, i'm in a meeting",
            onPress: () => Alert.alert("Cancel Pressed"),
            style: "default",
          },
          {
            text: "I can't answer now i'm busy",
            onPress: () => Alert.alert("Cancel Pressed"),
            style: "default",
          },
      ],
      {
        cancelable: true,
        AlertType:"plain-text",
        onDismiss: () =>
          Alert.alert(
            "alert canceled"
          ),
      }
    );
  };


const IncomingCallScreen = () =>{
  const navigation = useNavigation();
  const Vox = Voximplant.getInstance();
  const {caller,setCaller} =React.useState();
 const routes = useRoute();
 const {call} = routes?.params;

const onDecline = () =>{
  call.decline();
}

const onAccept =()=>{
  //navigation.navigate('Calling',{call,isIncomingCall:true});
  navigation.navigate('Calling');

};

React.useEffect(() =>{
  setCaller(call.getEndPoints()[0].displayName);
  call.on(Voximplant.CallEvents.Disconnected,(callEvent)=>{
    navigation.navigate('Test');
 });

},[]);
return(
    <View style={styles.pages}>
   <ImageBackground ImageBackground source={imagebg} resizeMode="cover" style={styles.imgbg} >
   <View style={styles.Camerabox}>
    <Text style={styles.names}>{caller} &hearts;</Text>
    <Text style={styles.phone}> +216 53236152</Text>
    <Text>Real Location</Text>
    </View>
    <View  style={styles.messaging}>
    <View style={styles.circle}>
      <Feather name="message-circle"  size={30} color={'white'}/>
      <TouchableOpacity onPress={remindMe}>
      <Text>Message</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.circle}>

      <MaterialIcon name="alarm"  size={30} color={'white'}/>
      <TouchableOpacity onPress={remindMe}>
      <Text>RemindMe</Text>
      </TouchableOpacity>
    </View>
    </View>
    
    <View style={styles.downbox}>
      <Pressable onPress={onDecline}>
      <View style={styles.crossbox} >
      <Feather name="x" size={40} color={'white'} />
      </View>
      </Pressable>

      <View  style={styles.crossbox2}>
     <Pressable  onPress={onDecline}>
      <MaterialIcon name="check" size={40} color={'white'}/>
      </Pressable>
      </View>

      </View>
</ImageBackground>
</View>
    );
}


const styles = StyleSheet.create({
    imgbg:{
     height:'100%',
     width:'100%',
    },
 
    circle:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:'center',
    fontWeight:'bold',
    },
    messaging:{
     display: 'flex',
     justifyContent: 'space-around',
     flexDirection:'row',
     width:'100%',
     padding:10,
     marginTop:150,
     fontWeight:50,
     color:'#dedede',
    },
    
    Cross:{
        height:'55px',
        width:'55px',
        padding:5,
    },
    downbox: {
        display: 'flex',
        flexDirection:'row',
        bordertopColor:'#fff',
        borderTopWidth:2,
        borderRadius:15,
        width:'100%',
        marginTop:25,
        marginLeft:40,
        alignContent:'space-around',
        paddingTop:50,
    },
    Camerabox:{
        color:'#000',
        width:'80%',
        height:250,
        alignItems:'center',
        alignContent:'center',
        justifyContent: 'center',
        backgroundColor:'transparent',
        padding:20,
        marginTop:50,
        borderRadius:5,
    },
    buttonCheck:{
        alignContent:'center',
        alignItems:'center',
        justifyContent: 'space-between',
        marginTop:25,
        borderRadius:'50%',
        height:'55px',
        width:'55px',
        padding:5,
        backgroundColor:'blue',  
    },
     crossbox:{
    marginLeft:30,
    backgroundColor:'#c2c2c2',
    borderRadius:27,
    alignItems:'center',
    alignContent:'center',
    justifyContent: 'center',
    width:55,
    height:55,
     },
     crossbox2:{
       
        backgroundColor:'#c2c2c2',
        borderRadius:27,
        alignItems:'center',
        alignContent:'center',
        justifyContent: 'center',
        marginLeft:150,
        width:55,
        height:55,
         },
    names:{
    color:'#000',
    fontSize:50,
    left:25,
    fontWeight: 'bold',
    margin:10,
  
    },
    phone:{
        color:'#7a7777',
        fontSize:25,
        alignItems:'center',
    },
    pages:{
        width:'100%',
        display:'flex',
        height:'100%',
        backgroundColor:'#592022',
}

});
export default IncomingCallScreen;