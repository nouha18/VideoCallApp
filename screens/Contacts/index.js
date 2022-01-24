/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React,{useState} from 'react';
import {View,Text,Platform,TextInput,FlatList,Pressable,StyleSheet} from 'react-native';
import dummycontacts from '../../assets/data/contacts.json';
import {useNavigation} from '@react-navigation/core';
import {Voximplant} from 'react-native-voximplant';
import { Divider } from 'react-native-paper';



function Test(){
const [text , onChangeText] = React.useState(' ');
const [filteredcontacts,setFilterTocontact] = React.useState(dummycontacts);
const navigation = useNavigation();
const Vox = Voximplant.getInstance();
const onCall = user =>{
    navigation.navigate('Calling',{user:user});
};

React.useEffect(()=>{
    Vox.on(Voximplant.ClientEvents.IncomingCall,(incomingEvents)=>{
     navigation.navigate('IncomingCall Events',{call:incomingEvents.call});
    });
    return ()=>{
        Vox.off(Voximplant.ClientEvents.IncomingCall);
    }

  });
React.useEffect(()=>{
    const newContact = dummycontacts.filter( 
    contact => contact.user_display_name.toLocaleLowerCase().includes(text),
    );
 
   // sortedarray.sort();
//Sconsole.log(contact);
    setFilterTocontact(newContact);
    },[text]);
    
    return (
      
            <View>
            <Text style={styles.title}>Phone contacts</Text>
            <TextInput 
            placeholder="search..." 
            style={styles.textSearch}
            value={text}
            onChangeText={onChangeText}
            keyboardType="name-phone-pad"
            />
            <FlatList data={filteredcontacts}
            renderItem={({item})=>(
            <Pressable onPress={onCall}>
            <Text style={styles.items}>{item.user_display_name}</Text>
             </Pressable>
            )}
            ItemSeparatorComponent={()=> <View style={styles.divider}></View>}
            />
            </View>
          );

    
}


const styles = StyleSheet.create({
    title:{
        fontSize:40,
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        color:'#764929',
        alignSelf: 'center',
        marginTop:25,
        marginBottom:25,
        
    },
    textSearch: {
        color:'#000000',
        backgroundColor:'#F5E5E4',
        borderColor:'#ffff46',
        height:40,
        marginTop:25,
        marginBottom:25,
    
        alignItems: 'center',
        alignContent:'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width:'80%',
        borderRadius:5,
       },

    items:{
        textAlign: 'center',
        fontSize:15,
        fontFamily:'Arial',
        color:'#664400'
    },
      divider:{
          backgroundColor:'#c2c2c2',
          height:3,
          width:'50%',
          alignItems: 'center',
          alignSelf: 'center',
         margin:10,
        },
    pages:{
    padding: '10px',
    flex:1,
    alignItems:'center',
    alignContent: 'center',
    justifyContent: 'center',
    },
});

export default Test;