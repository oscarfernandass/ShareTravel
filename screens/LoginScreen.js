import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ImageBackground ,Image,Linking,ToastAndroid} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/core'
import loginback from '../back6.jpg';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import me from '../me.jpeg'
import SplashScreen from 'react-native-splash-screen';
// import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const navigation = useNavigation();


  useEffect(() => {
    const checkLoginStatus = async () => {
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      if (userLoggedIn === 'true') {
        const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
        navigation.navigate('main', { phoneNumber: storedPhoneNumber });
        SplashScreen.hide();
      }
      else{
        SplashScreen.hide();
      }
    };
    
    checkLoginStatus();
  }, []);


  const sendVerification = () => {
    setLoading(true);
    setShowConfirmation(true);
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
    };
    
    const confirmCode = () => {
      setShowConfirmation(false);
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(async () => {
          setShowConfirmation(false);
          await AsyncStorage.setItem('userLoggedIn', 'true');
          await AsyncStorage.setItem('phoneNumber', phoneNumber); // Store the phone number
          navigation.navigate('main', { phoneNumber: phoneNumber });
          setCode('');
          setLoading(false);
          setShowConfirmation(true);
          setLoading(false);
        })
        .catch((error) => {
          alert("Invalid OTP "+error);
          setLoading(false);
        });
    };
    

  return (
    <ImageBackground source={loginback} style={styles.main}>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

      <View
        style={styles.container}
        behavior='padding'
      >
<Text style={styles.title}>Share Travel</Text>
        {loading ? (
          <ActivityIndicator size="larger" color="white" />
        ) : (
          <KeyboardAvoidingView>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder='Type +91'
                placeholderTextColor='#3d0c02'
                defaultValue='+91 '
                onChangeText={setPhoneNumber}
                style={styles.input}
                keyboardType='phone-pad'
                autoCompleteType='tel'
              />
            </View>

            <View style={styles.button}>
              <TouchableOpacity onPress={sendVerification}>
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}

        {showConfirmation?
        <View >
        <KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Enter OTP'
              onChangeText={setCode}
              style={styles.input}
              keyboardType='number-pad'
              />
          </View>
        </KeyboardAvoidingView>

        <View style={styles.button}>
          <TouchableOpacity onPress={confirmCode}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
              </View>
              :null}
              <TouchableOpacity onPress={()=>{Linking.openURL('https://www.linkedin.com/in/oscar-fernandas-94655a257')}}>
              <View style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:10}}>
                <Text style={styles.own}>G Oscar Fernandas</Text>
              </View>
              </TouchableOpacity>


      </View>
    </ImageBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    own:{
        marginTop:20,
        color:'white',
        fontSize:20,

    },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '80%', // Adjust the width as needed
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%', // Full width of the container
    alignItems: 'center',
  },
  input: {
    fontSize:16,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(256,256,256,0.8)',
    borderColor: 'white',
    marginTop: 10,
    width: 190, // Full width of the container
    height: 60,
    color: 'black',
    borderColor:'black',
    borderWidth:2,
    fontWeight:'900'
  },
  button: {
    backgroundColor: 'rgba(256,256,256,0.8)',
     // Adjust the width as needed
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize:18,
    paddingVertical: 18,
    paddingHorizontal: 0,
    width:180,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  title: {
    fontSize: 50,
    fontFamily: 'cursive', // Apply the curvy style
    fontWeight:'900',
    marginBottom:20,
    color: 'white',
    width:300,
    marginBottom:120,
    textAlign:'center',
  },
});
