import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import lena from '../assets/lena.jpg'

export default function FunctionTab({ text, description, screen, icon, id, baseUrl}) {
  const navigation = useNavigation();
  const [newName, setName] = useState('name')
  const [newPhone, setPhone] = useState('phone')
  const [newAddress, setAddress] = useState('addr')

  const getMember = () => {
    console.log("userID: " + id)
    const url = baseUrl + '/Members/GetMember?' + new URLSearchParams({
      id: id
    });
    fetch(url, { method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.name);
        console.log(responseData.phone);
        console.log(responseData.address);
        setName(responseData.name)
        setPhone(responseData.phone)
        setAddress(responseData.address)
        // setOrder(responseData);
      })
      .catch((error) => {
        console.log('error  ' + error);
      })
  };

  useEffect(() => {
    getMember();
  }, []);

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={() => 
        navigation.navigate(
          screen, 
          {
            userID: id, 
            name: newName, 
            phone: newPhone, 
            address: newAddress
          }
        )
      }>
      <View>
        <Text style={styles.buttonText}>{text}</Text>
        <Text style={styles.buttonDescription}>{description}</Text>
      </View>
      
      <Image source={icon} style={styles.buttonIcon}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#d2a24c",
    alignItems: "center",
    justifyContent: "space-between",
    height: 120,
    width: Math.round(Dimensions.get('window').width) - 50,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 30
  },
  buttonText: {
    fontSize: 30,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#6f5643"
  },
  buttonIcon: {
    height: 70,
    width: 70
  },
  buttonDescription: {
    fontSize: 20,
    fontFamily: "Avenir Next",
    color: "#ece6c2",
    fontWeight: "600"
  }
})