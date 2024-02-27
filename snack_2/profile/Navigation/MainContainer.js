import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/Profile';
import ContactScreen from './Screens/ContactScreen'; 

const HomeName = 'Home';
const ProfileName = 'Profile';
const ContactName = 'Contact'; 

const Drawer = createDrawerNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={HomeName}
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name={HomeName} component={HomeScreen} />
        <Drawer.Screen name={ProfileName} component={ProfileScreen} />
        <Drawer.Screen name={ContactName} component={ContactScreen} /> 
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
}
