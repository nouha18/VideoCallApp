/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {useNavigation} from '@react-navigation/core';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  // ScrollView,
  SectionList,
} from "react-native";

const contacts = [
  {
    index: 0,
    name: "Carolyn Colon"
  },
  {
    index: 1,
    name: "Compton Luna"
  },
  {
    index: 2,
    name: "Michelle Vasquez"
  },
  {
    index: 3,
    name: "Slater Holland"
  },
  {
    index: 4,
    name: "Parrish Bowman"
  },
  {
    index: 5,
    name: "Enid Fowler"
  },
  {
    index: 6,
    name: "Twila Price"
  },
  {
    index: 7,
    name: "Hawkins Mills"
  },
  {
    index: 8,
    name: "Eileen Roth"
  },
  {
    index: 9,
    name: "Eve Mullen"
  },
  {
    index: 10,
    name: "Bryant Olsen"
  },
  {
    index: 11,
    name: "Ramos Bauer"
  },
  {
    index: 12,
    name: "Beach Crane"
  },
  {
    index: 13,
    name: "Cathryn Pearson"
  },
  {
    index: 14,
    name: "Kent Haney"
  },
  {
    index: 15,
    name: "Sawyer Kramer"
  },
  {
    index: 16,
    name: "Mitchell Sanchez"
  },
  {
    index: 17,
    name: "Mcconnell Burns"
  },
  {
    index: 18,
    name: "Marci Hickman"
  },
  {
    index: 19,
    name: "Lenora Ellis"
  },
  {
    index: 20,
    name: "Hahn Hoffman"
  },
  {
    index: 21,
    name: "Lindsey Parks"
  },
  {
    index: 22,
    name: "Garner Fitzgerald"
  },
  {
    index: 23,
    name: "Chrystal Watson"
  },
  {
    index: 24,
    name: "Effie Mcknight"
  },
  {
    index: 25,
    name: "Queen Molina"
  },
  {
    index: 26,
    name: "Weber Howe"
  },
  {
    index: 27,
    name: "Berry Watkins"
  },
  {
    index: 28,
    name: "Leonard Lester"
  },
  {
    index: 29,
    name: "Mcneil Newman"
  },
  {
    index: 30,
    name: "Whitney Mullins"
  },
  {
    index: 31,
    name: "Shannon Marshall"
  },
  {
    index: 32,
    name: "Boone Mcgee"
  },
  {
    index: 33,
    name: "Denise Booth"
  },
  {
    index: 34,
    name: "Audrey Milli"
  },
  {
    index: 35,
    name: "Austin Jack"
  },
  {
    index: 36,
    name: "Amda Hells"
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignSelf: "stretch",
    paddingVertical: 20
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  sectionHeader: {
    backgroundColor: "#efefef",
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});

const ContactsList=()=> {
  const navigation = useNavigation();

  const onCall = user =>{
      navigation.navigate('Calling');
  };

  const getData = () => {
      let contactsArr = [];
      let aCode = "A".charCodeAt(0);
      for (let i = 0; i < 26; i++) {
        let currChar = String.fromCharCode(aCode + i);
        let obj = {
          title: currChar,
        };
  
        let currContacts = contacts.filter(item => {
          return item.name[0].toUpperCase() === currChar;
        });
        if (currContacts.length > 0) {
          currContacts.sort((a, b) => a.name.localeCompare(b.name));
          obj.data = currContacts;
          contactsArr.push(obj);
        }
      }
      return contactsArr;
    };
  
      return (
        <View style={styles.container}>
          <SectionList
            sections={getData}
            ListHeaderComponent={() =>  
            <Text>Contacts</Text>}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Pressable onPress={onCall}>
                <Text>{item.name}</Text>
                </Pressable>
              </View>
            )}
            renderSectionHeader={({ section }) => (
              <View style={styles.sectionHeader}>
                <Text>{section.title}</Text>
              </View>
            )}
            keyExtractor={item => item.index}
          />
        </View>
      );
    }
  
    export default ContactsList;