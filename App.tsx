import * as React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import Main from './Main.js';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLeft: () => null, // Hide the back button
            headerShown: false, // Hide the back button
            gestureEnabled: false, // Hide the header
          }}
        /> */}
          <Stack.Screen options={{headerShown:false}} name="main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
