/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React,{useState} from 'react';
import {View,Text,TextInput,StyleSheet,Pressable,Animated,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Voximplant} from 'react-native-voximplant';
import {APP_NAME,ACC_NAME} from '../../CONST/const.js';

function Login(){
const [username,setUsername] = useState('');
const [password,setPassword] = useState('');
const voximplant = Voximplant.getInstance();
const navigation = useNavigation();
console.log(voximplant);
const connectVoxClient = async () =>{
    let clientstate = await voximplant.getClientState();
    if(clientstate === "disconnected"){
       console.log("disconnected");
        await voximplant.connect();
   }
   };

React.useEffect(()=>{
//username@appname.accname.voximplant.com <= login nameid
connectVoxClient();

});

const signIn = async (event)=> {
try{
    const userName = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
    let clientstate = await voximplant.getClientState();
    console.log(clientstate)
   if(clientstate === "disconnected"){
    await voximplant.login(userName,password);
 }
if(clientstate !== "disconnected"){
   redirectHome();
}
   

} catch (e) {console.log("error",e);
  console.log('desc :',e.code);
}
};

    const redirectHome = () => {
     navigation.navigate('Calling');
    };
        const onLogin = ()=>{};
            return (
            <View style={styles.loginpage}>
            <View style ={styles.paper}>
            <Text style={styles.title}>Login Page</Text>
            <TextInput type="username"
            autoComplete="off"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#764929"
            placeholder="Username..." style={styles.input}/>
            <TextInput type="password"
             value={password}
             secureTextEntry
             onChangeText={setPassword}
            placeholderTextColor="#764929"
            placeholder="Password..." style={styles.input}/>
            <TouchableOpacity style={styles.button}  onPress={signIn}>
                <Text>login</Text>
            </TouchableOpacity>
            <Text>Memorise Profile</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
     loginpage:{
     flex:1,
     color:'#764929',
     zIndex:100,
     justifyContent: 'center',
     alignItems: 'center',
     alignContent:'center',
    },
    paper:{
        padding:20,
        color:'#764929',
        shadowOpacity:0.55,
        width:'100%',
        height:'auto',
        marginLeft:2,
        marginRight:2,
        alignItems:'center',
        justifyContent:'center',
        fontWeight:'bold',
        fontFamily:'forte',
        zIndex:99,
        borderRadius:15,
        borderWidth:1,
        borderColor:'#762500', 
        elevation:5,
     shadowColor:'#c2c2c2',
     shadowOffset: {width: -2, height: 4},
    },
    title:{
        color:'#764929',
      fontFamily:'forte',
      fontweight:'bold',
      fontsize:150,
    },
    input:{
        padding:10,
        width:'80%',
        color:'darkgrey',
        backgroundColor:'#ffffff',
        borderColor:'#582900',
        marginVertical:10,
        borderRadius:15,
    },
    button:{
        borderColor:'#936a4f',
        color:'#936a4f',
        padding:10,
        borderWidth:2,
        width:'80%',
        borderRadius:10,
        marginVertical:10,
        alignItems: 'center',
        backgroundColor:'#D5BA98',
        justifyContent: 'center',
        fontFamily:'forte',
        fontWeight:'bold',
       fontSize:'50px',
    },
})
export default Login;