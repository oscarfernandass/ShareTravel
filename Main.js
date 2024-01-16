import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import homeIcon from './homeIcon.png';
import log from './log.png';
import Home from './screens/HomeScreen.js';
import History from './screens/History.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen
  name='home'
  component={Home}
  options={({ navigation }) => ({
    tabBarIcon: ({ focused, color, size }) => (
      <Image
        source={focused ? homeIcon : homeIcon}
        style={{ width: size, height: size, tintColor: color }}
      />
    ),
    headerShown: false, // This line hides the header/title above the screen
  })}
/>

        <Tab.Screen
         name='history' 
         component={History}
         options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? log : log}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerShown:false,
        }}
         />
        
      </Tab.Navigator>
  )
}

export default Main

const styles = StyleSheet.create({})