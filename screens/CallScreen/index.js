/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import CallAction from '../../components/CallActionBox/index.js';

function CallSection ({onHangUp}){
    return (
        <View style={styles.pageContainer}>
         <View style={styles.cameraViewer}></View>
         <Text style={styles.usercalltext} >User</Text>
         <CallAction />
        </View>
      );

}

const styles = StyleSheet.create({
    pageContainer:{
    flex:1,
    backgroundColor:'#c8c8c8',
    },
    cameraViewer:{
     backgroundColor:'#ffff6e',
     width:120,
     height:220,
     top:45,
     left:'70%',
    borderRadius:10,
    },
    usercalltext:{
        top:-195,
        display:'flex',
        left:'40%',
        justifyContent:'flex-start',
        alignItems:'center',
        alignContent:'center',
    },
});

export default CallSection;