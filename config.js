import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyAcE__wAc252Cq9pZqAmdrNZ2ZiMRxc-LY",
  authDomain: "phone-auth-c82f3.firebaseapp.com",
  projectId: "phone-auth-c82f3",
  storageBucket: "phone-auth-c82f3.appspot.com",
  messagingSenderId: "98171473953",
  appId: "1:98171473953:web:81d9e5449fe1a9fa1dd360",
  measurementId: "G-REJ43RGWET" // This might not be necessary for your use case
};

// Always initialize the app, even if there are no apps initialized
firebase.initializeApp(firebaseConfig);

export default firebase;
