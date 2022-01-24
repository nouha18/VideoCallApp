import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import ContactScreen from '../ContactsScreen/index.js';




function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}






export default Apps;


export default NavigationMain;
