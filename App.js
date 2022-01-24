/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
//import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import CallSection from './screens/CallScreen/index.js';
import Login from './screens/Login/Login.js';
import IncomingCallScreen from './screens/incomingCallScreen/incomingCallScreen';
import CallEnCour from './screens/CallingScreen/index.js';
import Test from './screens/Contacts/index.js';
import ContactsList from './screens/Contacts/SectionList';
import {View, Text,StyleSheet,Animated,Dimensions,TouchableOpacity } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function GoToButton({ screenName }) {
  const navigation = useNavigation();
 
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
    <Text style={styles.button}>{`${screenName}`}</Text>
     </TouchableOpacity>
    );
}

function HomeScreen({ navigation }) {
  const animeArt = React.useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(animeArt, {
      toValue: 1,
      duration: 10000,
      useNativeDriver:false,
    }).start();
  };
  
 React.useEffect(()=>{
  fadeIn();
 });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{opacity: animeArt}}>
      <Text style={styles.title}>Dingoo</Text>
      </Animated.View>
      <GoToButton style={styles.button} screenName="Test"/>
    </View>
  );
}
//const Tab = createNativeTabNavigator();
//const Tab = createBottomTabNavigator();
const {width,height} = Dimensions.get('screen');


export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Login/SignUp' }} />
        <Stack.Screen name="Login" component={Login} options={{ headerTitle: 'Login/SignUp' }} />
        <Stack.Screen name="Test" component={Test} options={{ headerTitle: 'Test'}} />
        <Stack.Screen name="List" component={ContactsList} options={{ headerTitle: 'Test'}} />
        <Stack.Screen name="Call" component={CallSection} options={{ headerTitle: 'Call' }} />
        <Stack.Screen name="Calling" component={CallEnCour} options={{ headerTitle: 'CallTest'}} />
        <Stack.Screen name="inCall" component={IncomingCallScreen} options={{ headerTitle: 'entercall'}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

//<Stack.Navigator initialRouteName="Home">
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:width,
    height:height,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    backgroundColor:'transparent',
    fontSize:100,
    color:'#936a4f',
    fontWeight:'bold',
    fontFamily:'forte',
  },
  button:{
    width:120,
    height:'auto',
    color:'#936a4f',
    borderRadius:20,
    fontSize:22,
    fontWeight:'bold',
    fontFamily:'forte', 
    paddingTop:8,
    paddingBottom:8,
    paddingLeft:25,
    borderWidth:2,
    alignItems:'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'#D5BA98',
    borderColor:'#936a4f',
    marginTop:15,
    

  }
});
