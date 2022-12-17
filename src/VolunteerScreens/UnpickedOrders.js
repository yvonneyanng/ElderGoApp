import { SafeAreaView, Text, StyleSheet, Image, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

import back from '../assets/back.png'
import home from '../assets/home.png'

export default function UnpickedOrders({ route, navigation }) {

  console.log("[UNPICKED] userID: " + route.params.userID);

  const [order, setOrder] = useState([]);
  // fetch the orders
  const getOrder = async () => {
    const url = route.params.baseUrl + '/Orders/GetPublishedOrder';
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        setOrder(responseData);
      })
      .catch((error) => {
        console.log('[UNPICKED] error: ' + error);
      })
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>待接服務</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: Math.round(Dimensions.get('window').width), paddingHorizontal: 25}}>
        <View style={{height: 15}}></View>
        {order.map((type, index) => {
          const imgUrl = route.params.baseUrl + '/' + type.imagePath
          console.log("[UNPICKED] IMG: " + type.imagePath)
          console.log("[UNPICKED] place: " + type.place)
          return(
            <View>
              <TouchableOpacity
                style={styles.orderCard}
                onPress={() => navigation.navigate(
                  'ServiceDetail', {
                    id: type.orderId, 
                    detail: type.typeDetail,
                    time: type.exeTime,
                    descript: type.descript,
                    place: type.place,
                    img: imgUrl,
                    name: type.elderName,
                    helper: route.params.userID,
                  })}
                key={index}
              >
                <View style={{
                  flexDirection: "row", 
                  justifyContent: "space-between", 
                  alignItems: "flex-end",
                  marginHorizontal: 5
                }}>
                  <Image source={{ uri: route.params.baseUrl + '/' + type.imagePath }} style={styles.image}/>
                  <View style={{
                    alignItems: "flex-end",
                  }}>
                    <Text style={styles.orderCardTextStyle}>{type.typeDetail}</Text>
                    <Text style={styles.orderCardTextStyle}>{type.exeTime.substring(5, 10)}, {type.exeTime.substring(11, 16)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ece6c2'
  },
  header: {
    flexDirection: "row", 
    marginTop: 60,
    // backgroundColor: "black",
    justifyContent: "flex-start",
    alignSelf: "center",
    width: Math.round(Dimensions.get('window').width) - 55,
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 35, 
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 2,
    marginRight: 20,
    justifyContent: "center",
  },
  backIcon: {
    tintColor: "#6f5643",
    width: 30,
    height: 30,
    marginRight: 5,
    marginTop: 3
  },
  orderCard: {
    backgroundColor: "#d2a24c",
    marginBottom: 20,
    width: Math.round(Dimensions.get('window').width) - 55,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    // flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center"
  },
  orderCardTextStyle: {
    color: "#6f5643",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 23,
  },
  image: {
    width: 150,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#6f5643",
  }
});