import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  Dimensions,
  ImageBackground,
  BackHandler,
  Alert,
  Image,
  Pressable,
  Linking,
} from 'react-native';
import { Surface, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../config';
import firebase from '../config';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profile from '../prof.jpg';
import Autocomplete from 'react-native-autocomplete-input';
import Task from './Task';
import ModalView from '../ModalView';
import { Picker } from '@react-native-picker/picker';
import bin from '../bin.png';
import refresh from '../refresh.png';
import logout from '../logout.png';
import { format } from 'date-fns';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');
import axios from 'axios';

const app = axios.create();


// Now `usernameWithoutDomain` contains the email without the @gmail.com domain.

const HomeScreen =  () => {



  const showToast1 = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Post Added Successfully',
      // Optional, add more lines if needed
      visibilityTime: 2500,
      autoHide: true,
      topOffset: 10,
      bottomOffset: 40,
      backgroundColor: '#4CAF50', // Set your desired background color
    });
  };
  const showToast2 = () => {
    Toast.show({
      type: 'info',
      position: 'top',
      text1: 'Your posts have been deleted.',
      visibilityTime: 2500,
      autoHide: true,
      topOffset: 10,
      bottomOffset: 40,
      fontSize:60,
      containerStyle: {
        backgroundColor: '#4CAF50', // Set your desired background color
      },
      textStyle: {
        color: 'white',
        fontSize:60,
        textAlign:'center',
      },
    });
  };
  const showToast3 = () => {
    Toast.show({
      type: 'info',
      position: 'top',
      text1: 'You Have Not Posted anything',
      visibilityTime: 2500,
      autoHide: true,
      topOffset: 10,
      bottomOffset: 40,
      fontSize:60,
      containerStyle: {
        backgroundColor: '#4CAF50', // Set your desired background color
      },
      textStyle: {
        color: 'white',
        fontSize:60,
        textAlign:'center',
      },
    });
  };
  const navigation=useNavigation();
  const phoneNumber =  AsyncStorage.getItem('phoneNumber').toString(); 
  const grape=phoneNumber;
  // const phoneNumber='8927331';
  if (!phoneNumber) {
    console.error('Phone number is undefined');
    navigation.navigate('Login');
    return null;
  }
  const apiUrl = 'https://node-three-self.vercel.app/get';
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const[data,setData]= useState([]);
  const [visible, setVisible] = useState(false);
  const[email,setEmail]=useState('');
  
    const[postId,setPostId]=useState(0);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(`${phoneNumber}`);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [required, setRequired] = useState('');
    
    const [loading, setLoading] = useState(true);
    const [fromOptions, setFromOptions] = useState(['SKCET','Singanallur', 'Gandipuram', 'Ukadam']);
    const [toOptions, setToOptions] = useState(['SKCET','Singanallur', 'Gandipuram', 'Ukadam']);
    const vehicleOptions = ['Car', 'Auto'];
    const requiredOptions = [1,2,3];
    
    const [searchText, setSearchText] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    
  
  
    useEffect(() => {
      const checkLoginStatus = async () => {
        const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
        if (userLoggedIn !== 'true') {
          navigation.navigate('Login');
        }
      };
  
      checkLoginStatus();
    }, []);
  
    useFocusEffect(
      React.useCallback(() => {
        const onBackPress = () => {
          // Disable back button press
          return true;
        };
  
        // Add a listener for the back button press
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
        // Remove the listener when the screen loses focus or on component unmount
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, [])
    );

    const checkLoginStatus = async () => {
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      setIsLoggedIn(userLoggedIn === 'true');
    };
  
    const handleLogout = async () => {
      // Display a confirmation alert
      Alert.alert(
        'Confirmation',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Logout',
            onPress: async () => {
              // User pressed 'Logout', proceed with the logout logic
              alert('Logged Out');
              await AsyncStorage.removeItem('userLoggedIn');
              navigation.navigate('Login');
            },
          },
        ],
        { cancelable: true }
      );
    };










    const formatTime = (timeString) => {
      const time = new Date(`1970-01-01T${timeString}`);
      return format(time, 'h:mm a');
    };
    
    // Function to format date to day, month, year
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return format(date, 'EEEE, MMMM d, yyyy');
    };


    







const handleRefresh=async()=>{
  getPosts();
};

const getPosts = async () => {
  setLoading(true);

  try {
    const response = await fetch('https://node-three-self.vercel.app/get');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);

    if (responseData.status === 'ok') {
      const users = responseData.users;

      // Sort the array of users based on the timestamp or any other field that indicates the order
      const sortedUsers = users.sort((a, b) => {
        // Assuming 'timestamp' is a field in your data representing the time of creation
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      // Update the state or perform any other actions with the sorted users
      setData(sortedUsers);
    } else {
      console.error('Error fetching data:', responseData.message);
      // Handle the error or show an error message to the user.
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle the error or show an error message to the user.
  } finally {
    setLoading(false); // Set loading to false regardless of success or failure
  }
};







      

// Assuming postId is a state variable

const addPosts = async () => {
  setLoading(true);

  try {
    const currentDate = new Date();
    const dateString = currentDate.toISOString().split('T')[0]; // Extract date in 'YYYY-MM-DD' format
    const timeString = currentDate.toTimeString().split(' ')[0];
    
    // Use the generatePostId function to get a unique ID
    // const newPostId = generatePostId();
    
    if (name !== '' && phone !== '' && from !== '' && to!=='' && vehicle !== '' && required !== '') {
      const newPost = {
        name: name,
        phone: phone.toString(),
        from: from,
        to: to,
        vehicle: vehicle,
        required: required,
        timestamp: new Date().toISOString().toString(),
        date: dateString.toString(),
        time: timeString.toString(),
      };

      const response = await fetch('https://node-three-self.vercel.app/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Update the state with the new post appended to the current data
        setData((prevData) => [newPost, ...prevData]);
        showToast1();
        // Don't close the modal here
      } else {
        console.error('Error adding post:', responseData);
        Alert.alert('Error', `Failed to add post: ${responseData.message}`);
        // Don't close the modal here
      }
    } else {
      // Display the alert message inside the modal
      Alert.alert('Incomplete Information', 'Please fill in all attributes.', [
        {
          text: 'OK',
          onPress: () => {
            // You can add additional logic here if needed
          },
        },
      ]);
    }
  } catch (error) {
    console.error('Error adding post:', error);
    Alert.alert('Error', 'Failed to add post. Please try again later.');
    // Don't close the modal here
  } finally {
    setLoading(false);
  }
};






// The generatePostId function remains the same
// const generatePostId = () => {
// return Math.floor(Math.random() * 1000);
// };



        


        // const editPost = (postId, name, author) => {
        //     fetch(url + `/${postId}`, {
        //       method: "PUT",
        //       headers,
        //       body: JSON.stringify({
        //         "author": author,
        //         "name": name,
        //       })
        //     }).then((res) => res.json())
        //       .then(resJson => {
        //         console.log('updated:', resJson)
        //         updatePost()
        //       }).catch(e => { console.log(e) })
        //   }
        
        const deletePost = () => {
          Alert.alert("Delete", "Are you sure you want to delete all your post?", [
            { text: "Yes", onPress: () => deleteP() },
            { text: "No" },
          ]);
         };
        const deleteP = async () => {
          try {
            const apiUrl = `https://node-three-self.vercel.app/delete/${encodeURIComponent(phoneNumber)}`;
            console.log('DELETE URL:', apiUrl);
        
            const response = await axios.delete(apiUrl, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (response.status === 200) {
              const resJson = response.data;
              getPosts();
              console.log('delete:', resJson);
              showToast2()
              // alert("Your posts have been deleted.");
            } else {
              showToast3()
              console.error('Error deleting post:', response.status, response.statusText);
              console.error('Error details:', response.data); // Assuming the error details are in the response data
            }
          } catch (error) {
            showToast3()
            // alert("You have no Posts");
            console.log(error);
          }
        };

        
        
        
        

        
        


          // const updatePost = () => {
          //   getPosts()
          //   setVisible(false);
          //   setName('')
          //   setPostId(0)
          // }
        
          // const edit = (id, name) => {
          //   setVisible(true)
          //   setPostId(id)
          //   setName(name)
          // }
        
      
      
    useEffect(() => {
     getPosts();
    }, [apiUrl])

    // const userEmail = auth.currentUser?.email;
    // const nameid = userEmail ? userEmail.replace(/@.*\.com$/, '') : '';

    

   

    const handleSignOut = async () => {
        try {
        
          navigation.replace("Login");

        } catch (error) {
          console.log(error);
          alert('Sign up failed: ' + error.message);
        }
      };  

      const handleSearch = (text) => {
        const trimmedText = text.trim().toLowerCase();
      
        if (trimmedText === '') {
          setData(data); // Display all tasks when search text is empty
          return;
        }
      
        const filteredData = data.filter(item => {
          return item.place.toLowerCase().includes(trimmedText);
        });
      
        setData(filteredData);
      };
      

  return (
      <View  style={styles.outer}>

      <View style={styles.inner}>





        <View style={styles.buttonContainer}>
        
        <TouchableOpacity onPress={()=>Linking.openURL('https://www.instagram.com/oscarferrarii/')}>
        <View>
        <Image source={profile} style={styles.name}></Image>
        </View>
        </TouchableOpacity>


<View style={styles.searchbox}>
                <TextInput
          style={styles.searchInput}
          placeholder="From Places..."
          value={searchText}
          onChangeText={(text) => setSearchText(text.replace(/\s/g, ''))}
        />
</View>


<View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutback}>
            <Image source={logout} style={styles.logout}></Image>
          </TouchableOpacity>
</View>

        </View>



        <View style={styles.refreshouter}>
        <TouchableOpacity onPress={handleRefresh}>
            <Image source={refresh} style={styles.bin}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={deletePost}>
            <Image source={bin} style={styles.bin}></Image>
          </TouchableOpacity>
        </View>

        <ModalView style={styles.uploadbox}
        visible={visible}
        name="Add Post"
        onDismiss={() => setVisible(false)}
        onSubmit={() => {
          if (name === '' || phone === '' || from === '' || to==='' || vehicle === 'Select Vehicle' || required === 'People Required') {
            alert("Please fill in all the required fields");
            console.log("name:", name);
            console.log("phone:", phone);
            console.log("from:", from);
            console.log("to:", to);
            console.log("vehicle:", vehicle);
            console.log("required:", required);
          } else {
            addPosts(name,phone,from,to,vehicle,required)
            setVisible(false)
          }
        }}
        cancelable
      >

          <TextInput
            label="name"
            value={name}
            onChangeText={(text) => setName(text)}
            mode="outlined"
          />

  

<View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 8, overflow: 'hidden', width: 260, marginTop:5 }}>

          <Picker
        selectedValue={from}
        onValueChange={(itemValue) =>{
        setFrom(itemValue);
        if(itemValue==='SKCET'){
        setToOptions(['Singanallur', 'Gandipuram', 'Ukadam']);
        }
        if(itemValue!=='SKCET'){
          setToOptions(['SKCET']);
        }
      }
      }
        mode="dropdown"
        style={{ height: 50, width: 300, color:'black', backgroundColor:'white', width:260, borderColor:'black', borderWidth:10, }}
        >
        <Picker.Item label="Select From Place  ▼" value="" />
        {fromOptions.map((option) => (

          <Picker.Item key={option} label={option} value={option} />
          ))}
      </Picker>
      </View>
<View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 8, overflow: 'hidden', width: 260, marginTop:5 }}>

          <Picker
        selectedValue={to}
        onValueChange={(itemValue) =>{
          setTo(itemValue);
        }
        }
        mode="dropdown"
        style={{ height: 50, width: 300, color:'black', backgroundColor:'white', width:260, borderColor:'black', borderWidth:10, }}
        >
        <Picker.Item label="Select To Place  ▼" value="" />
        {toOptions.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
          ))}
      </Picker>
      </View>
          

      <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 8, overflow: 'hidden', width: 260, marginTop:5 }}>
      <Picker
        selectedValue={vehicle}
        onValueChange={(itemValue) => setVehicle(itemValue)}
        mode="dropdown"
        style={{ height: 50, width: 300, color:'black', backgroundColor:'white', width:260, borderColor:'black', borderWidth:10, }}
      >
        <Picker.Item label="Select Vehicle  ▼" value="" />
        {vehicleOptions.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
      </View>



      <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 8, overflow: 'hidden', width: 260, marginTop:5 }}>
      <Picker
        selectedValue={required}
        onValueChange={(itemValue) => setRequired(itemValue)}
        mode="dropdown"
        style={{ height: 50, width: 300, color:'black', backgroundColor:'white', width:260, borderColor:'black', borderWidth:10, }}
      >
        <Picker.Item label="People Required  ▼" value="" />
        {requiredOptions.map((option) => (
          <Picker.Item key={option} label={option.toString()} value={option} />
        ))}
      </Picker>
      </View>




          </ModalView>



          <View style={styles.flatList}>
          {loading ? (
            <ActivityIndicator size="80px" color="black" />
            ) : 
            <FlatList showsVerticalScrollIndicator={false}
            style={styles.flat}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.flatListItem, !searchText || item.from.toLowerCase() === searchText.toLocaleLowerCase() ? null : { display: 'none' }]}>
                <Task 
                from={item.from} 
                to={item.to} 
                grape={grape} 
                postid={item._id} 
                name={item.name} 
                vehicle={item.vehicle} 
                required={item.required} 
                phone={item.phone} 
                time={(item.time)} 
                date={formatDate(item.date)}/>
              </View>
            )}
            />
          }
        </View>

        <Toast   style={{marginBottom:12, fontSize:40,}}/>

        <View style={styles.create}>
        <TouchableOpacity style={styles.add} onPress={() => setVisible(true)}>
          <Text style={styles.addText}>Create Room</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({

    outer: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        width:width,
        height:height,
        backgroundColor:'#CCD1D1'
      },
      inner: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        width:width,
        height:height,
      },
      name: {
        width:48,
        height:48,
        borderRadius:50,
        borderColor:'#212F3C',
        borderWidth:3,
      },
      buttonContainer: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 10,
        backgroundColor:'rgba(253, 254, 254 , 1)',
        height:60,
        width:width,
        gap:30,

      },
      addText: {
        color: 'white',
        fontSize:30,
        // marginTop:-30,
        textAlign:'center',
      },
      refreshouter:{
        width:width,
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
        flexDirection:'row',
        gap:30,

      },
      logout:{
        width:40,
        height:40,

      },
      bin:{
        width:35,
        height:35,
        
      },
      flatList: {
        marginTop:5,
        display:'flex',
         justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        height:538,
        width:width,
       
        color:'white',
        
  },
  flatListItem: {
    width:300,
    height:'auto',
  

      },
      add:{
        position:'relative',
        bottom:'140%',
        backgroundColor:'#212F3C',
        width:200,
        textAlign:'center',
        height:50,
        borderRadius:30,


      },
      create:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        position:'relative'

      },
      searchInput:{
        height:40,
        width:160,
        borderRadius:5,
        backgroundColor:'white',
        borderColor:'#212F3C',
        borderWidth:2.5,
      },
      searchbox:{
        width:160,
        borderRadius:20,
        height:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
      },
      cover:{
        size:30,
      }

})