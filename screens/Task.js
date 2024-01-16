import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import bin from '../bin.png';
import tele from '../tele1.png';

const Task = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.grape === props.phone) {
      setShow(true);
    }
  }, [props.grape, props.phone]);

  const call = () => {
    const phone = `tel:${props.phone}`;
    const supported = Linking.canOpenURL(phone);

    if (supported) {
      Linking.openURL(phone);
    } else {
      console.log("Phone dialing is not supported. Please enable Permission");
    }
  };

 

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square}></TouchableOpacity>
        <View style={styles.content}>
        <Text style={styles.itemText}>Name:        {props.name}</Text>
            <Text style={styles.itemText}>From:         {props.from}</Text>
            <Text style={styles.itemText}>To:              {props.to}</Text>
            <Text style={styles.itemText}>Vehicle:     {props.vehicle}</Text>
            <Text style={styles.itemText}>Required:  {props.required} People</Text>
            <Text style={styles.itemText}>Time:         {props.time}</Text>
            <Text style={styles.itemText}>Date:          {props.date}</Text>
        </View>
      </View>

      <View style={styles.icons}>

        

        <TouchableOpacity onPress={call}>
          <Image source={tele} style={styles.bin}></Image>
        </TouchableOpacity>
        
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: 70,
  },
  icons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
  },
  bin: {
    width: 35,
    height: 35,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 25,
    borderColor: '#040720',
    borderWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: 'rgb(23, 32, 42)',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    width: 300,
    color: 'black',
  },
});

export default Task;
