/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {View, Text,StyleSheet,Dimensions,Animated,TouchableOpacity,SectionList,Easing} from 'react-native';
const {width,height} = Dimensions.get('screen');



const SECTIONS = [
    {
      title: "Predefined animations",
      data: [
      { title: "Elastic", easing: Easing.elastic(4) }
      ]
    },
];

const Design = () => {
    let move = new Animated.Value(1);
    const animate = easing => {
        move.setValue(1);
        Animated.loop(
            Animated.timing(move, {
                toValue: 2 ,
                duration: 1200,
                easing: Easing.easinOut,
                useNativeDriver:false,
              }),
              {iterations:50},
        ).start();
      };
    
    React.useEffect(()=>{
        animate();
  
    });
  
  
    const size = move.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 80]
    });
  
    const animatedStyles = [
      styles.box,
      {
        marginTop:-50,
        borderRadius:size,
        backgroundColor:"transparent",
        alignItems:'center',
        borderColor:'#D5BA98',
        borderWidth:4,
        justifyContent:'center',
        move,
        width: Animated.add(size,20),
        height: Animated.add(size,20),
      },
    ];
    const animatedStyles2 = [
        styles.box,
        {
          marginTop:0,
          borderRadius:size,
          backgroundColor:"transparent",
          alignItems:'center',
          borderColor:'#D5BA98',
          borderWidth:6,
          justifyContent:'center',
          move,
          width: size,
          height:size,
        },
      ];
      const animatedStyles3 = [
        styles.box,
        {
          marginTop:0,
          borderRadius:size,
          backgroundColor:"transparent",
          alignItems:'center',
          borderWidth:4,
          borderColor:'#D5BA98',
          justifyContent:'center',
          move,
          width: Animated.add(size,-20),
          height: Animated.add(size,-20),
        },
      ];
  
    return (
    <View styles={styles.container}>
    <View style={styles.box}>
    <Animated.View style={[animatedStyles]} >
    <Animated.View style={[animatedStyles2]} >
    <Animated.View style={[animatedStyles3]} >
       
    <MaterialIcon name="phone" style={{backgroundColor:'transparent',zIndex:99,position:'absolute'}} size={40} color='grey'/>
    </Animated.View>
    </Animated.View>
    </Animated.View>
    </View>
    </View>
);
};

const styles = StyleSheet.create({
    container:{
      position:'fixed',
    width:200,
    height:500,
    margin:25,
    backgroundColor:'transparent',
},
    box:{
      marginLeft:-40,
      position:'absolute',
     backgroundColor:'trasparent',
     width:'100%',
     height:400,
},

}); 

export default Design;