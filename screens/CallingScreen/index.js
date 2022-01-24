/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,Text,StyleSheet,Easing,Animated,Alert,PermissionsAndroid,Platform,UIManager,Pressable,Button} from 'react-native';
import CallAction from '../../components/CallActionBox/index.js';
import Design from './Animation.js';
import {Voximplant} from 'react-native-voximplant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation,useRoute } from '@react-navigation/core';

const permissions = [
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.CAMERA,
];

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function CallEnCour(){
    const [isPhoneOn,setPhoneOn] = React.useState(true);
    const [callStatus,setCallStatus] = React.useState('Initializing...');
    const [localVideoStreamId,setlocalVideoStreamId]= React.useState('');
    const onTogglePhone = () =>{
    setPhoneOn(currentValue => !currentValue);
      console.warn(" on press");
    };
    //const { itemId, otherParam } = route.params;
    const routes = useRoute();
    //const {user,call:incomingCall,isIncomingCall } = routes?.params;
    const user = routes?.params?.user;
    const [permissionGranted,setPermissionGranted] = React.useState(false);
    const voximplant = Voximplant.getInstance();
    const navigation = useNavigation();
 console.log(user);
 
//if(isIncomingCall){
 // answerCall();
//}else{
 // makeCall();
//}

React.useEffect(()=>{
     const getPermission = async ()=>{
     const granted = await PermissionsAndroid.requestMultiple(permissions);
     console.log(granted);
     const recordAudioGranted = granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
     const cameraGranted = granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
if(!cameraGranted || !recordAudioGranted){
    Alert.alert("no permission");
}else{
    setPermissionGranted(true);
}
};
if(Platform.os === 'android'){
    getPermission();
}else{
    setPermissionGranted(true);
}

},[]);
//let call = React.useRef(incomingCall);
let call = React.useRef();
React.useEffect (()=>{
    const callSettings = {
        video:{
            sendVideo:true,
            receiveVideo:true,
        }
    };
   if(!permissionGranted){
     return;
   }else{
   const makeCall = async () => {
      call.current = await voximplant.call('+1 929 224 0694', callSettings);
     console.log(call);
     subscribeToCallEvents();
   };
  }
   const answerCall = async () => {
    call.current.answer(callSettings);
    endpoint.current = call.current.getEndPoints()[0];
    subscribeToEndPointsEvents();
    subscribeToCallEvents();
   
 };

   const subscribeToCallEvents = async () => {
    call.current.on(Voximplant.CallEvents.Failed,(callEvent)=>{
     showError(callEvent.reason);
  });
  call.current.on(Voximplant.CallEvents.ProgressToneStart,(callEvent)=>{
    setCallStatus('calling...');
 });
 call.current.on(Voximplant.CallEvents.Connected,(callEvent)=>{
    setCallStatus('catched');
 });
 call.current.on(Voximplant.CallEvents.Disconnected,(callEvent)=>{
    navigation.navigate('Test');
 });
 call.current.on(Voximplant.CallEvents.localVideoStreamAdded,(callEvent)=>{
   setlocalVideoStreamId(callEvent.videoStream.id);
  navigation.navigate('Test');
});
  };
  const showError=(reason)=>{
  Alert.alert('sorry!, your call has been canceled',`Reason ${reason}`,[
      {
      'text': 'OK',
      onPress: () => {navigation.navigate('Test')},
  
      },
  ]);
  };

  return ()=>{
       //call.current.off(Voximplant.CallEvents.Failed);
       //call.current.off(Voximplant.CallEvents.Disconnected);
       //call.current.off(Voximplant.CallEvents.ProgressToneStart);
       //call.current.off(Voximplant.CallEvents.Connected);
  };

},[permissionGranted]);
//699117024 available phone number


const onHangUp=()=>{
 
};

const goBack =()=>{
navigation.pop();
}

return (
    <View style={styles.container}>
     {call==null ?<>
      <Voximplant.VideoView style={styles.cameraView}
     videoStreamId={localVideoStreamId}>
     </Voximplant.VideoView>
    </>:
    <>
    <View style={styles.cameraView}
     videoStreamId={localVideoStreamId}>
    <Text tyle={styles.phone}>{callStatus + "!!"}</Text>
    <Text style={styles.nameContact}>{user?.user_display_name}</Text>
    <Text tyle={styles.phone}>ringing +216 236152</Text>
    </View>
    </> }
     <Design/>
     <CallAction onPress={onHangUp}/>
    </View>
);
}

const styles = StyleSheet.create({
    container:{
    flex:3,
    width:'100%',
    paddingTop:20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:'#c125489',
    },
    triggle:{marginTop:80,
      opacity:1,
      width:200,
      height:200,
      BackgroundColor:'#456120',
      BorderRadius:50
    },
    dot:{
        width: 60,
        height:60,
        borderRadius:30,
        backgroundColor:'#ffff45',

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
     nameContact:{
     fontFamily:'forte',
     fontWeight:'bold',
     fontSize:40,
     alignItems:'center',
     color:'#772540',
    },
    cameraView:{
     width:'100%',
     backgroundColor:'transparent',
     padding:10,
     alignItems:'center',
     alignContent:'center',
     justifyContent: 'center',

     borderRadius:5,
     marginBottom:180,
    },
    phone:{
        color:'#7a7777',
         fontSize:30,
       },
       buttonback:{
           position:'absolute',
           left:15,
           top:30,
       },
});

export default CallEnCour;