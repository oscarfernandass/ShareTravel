import { StyleSheet, Text, View,ActivityIndicator,FlatList ,Dimensions} from 'react-native'
import React, { useState,useEffect } from 'react'
import Task from './Task.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
const { width, height } = Dimensions.get('window');

const History = () => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'EEEE, MMMM d, yyyy');
      };
    useEffect(() => {
        getPosts();
       }, ['https://node-three-self.vercel.app/get'])
    const[loading,setLoading]=useState(false);
    const[data,setData]=useState([]);
    
    let grape; // Declare grape outside of the block

const fetchPhoneNumber = async () => {
  try {
    const phoneNumber = await AsyncStorage.getItem('phoneNumber');
    
    if (phoneNumber !== null) {
      // Ensure phoneNumber is not null before calling toString
      const phoneNumberString = phoneNumber.toString();
      grape = phoneNumberString; // Assign the value to grape
      // alert(grape); // You can use alert here if needed
    } else {
      alert('Phone number not found in AsyncStorage');
    }
  } catch (error) {
    console.error('Error fetching phone number:', error);
    // Handle the error or show an error message to the user.
  }
};

fetchPhoneNumber();
console.log(grape);
    // const grape=phoneNumber;
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
      
            // Filter users based on the phone number
            const filteredUsers = sortedUsers.filter(user => user.phone === grape);
      
            // Update the state or perform any other actions with the sorted and filtered users
            setData(filteredUsers);
            // alert("success");
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
      
  return (
    <View style={styles.container}>
      <Text style={styles.head}>History</Text>

      <View style={styles.flatList}>
          {loading ? (
            <ActivityIndicator size="80px" color="black" />
            ) : 
            <FlatList showsVerticalScrollIndicator={false}
            style={styles.flat}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
            <View style={[styles.flatListItem
            // , item.phone === grape ? null : { display: 'none' }
            ]}>
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
    </View>
  )
}

export default History

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',

    },
    head:{
        color:'black',
        fontSize:35,
    },
    flatList: {
        marginTop:20,
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

})