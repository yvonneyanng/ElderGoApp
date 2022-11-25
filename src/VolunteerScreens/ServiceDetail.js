import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import back from '../assets/back.png'

// id: type.orderId, 
// detail: type.typeDetail,
// time: type.exeTime,
// name: type.elderName,
// descript: type.descript,
// place: type.place
// img

export default function ServiceDetail({ route, navigation }) {

  const orderID = route.params.id;
  const helperID = route.params.helper;
  console.log("[DETAIL] orderID: " + orderID);
  console.log("[DETAIL] helperID: " + helperID);
  console.log("[DETAIL] IMG: " + route.params.img)

  const receive = ( buttonText ) => {
    return(
      <TouchableOpacity
        style={styles.button}
        onPress={updateOrder}
      >
        <Text style={styles.buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    )
  }

  const updateOrder = () => {
    const url = route.params.baseUrl + '/Orders/ReceiveOrder?' + new URLSearchParams({
      id: orderID,
      helper: helperID
    });
    fetch(url, { method: 'PUT'})
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log('[SER-DET] error: ' + error);
      })
    navigation.navigate("VolunteerHome", { msg: helperID });
  }

  const detail = ( title, content ) => {
    if(!content.trim()){
      content = "無"
    }
    return(
      <View style={styles.detailView}>
        <Text style={styles.detailTitle}>{title}</Text>
        <Text style={styles.contentText}>{content}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>訂單內容</Text>
      </View>

      <View style={{height: 10}}/>
      {/* {detail("訂單編號", route.params.id)} */}
      <View style={styles.wholeDetail}>
        {detail("【項目】", route.params.detail)}
        {detail("【時間】", route.params.time.substring(11, 16) + ", " + route.params.time.substring(5, 10))}
        {detail("【地點】", route.params.place)}

        {detail("【服務對象】", route.params.name)}
        {detail("【備註】", route.params.descript)}
        <Text style={styles.detailTitle}>【環境預覽】</Text>
        <Image source={{ uri: route.params.img }} style={styles.img}/>
      </View>

      {receive("接   單")}
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
    marginTop: 65,
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
    marginTop: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#cc6b49",
    width: Math.round(Dimensions.get('window').width) - 55,
    height: 60,
    marginHorizontal: 15,
    justifyContent: "center",
    marginTop: 25
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Avenir Next",
    letterSpacing: 20,
    marginLeft: 20
  },
  detailView: {
    alignItems: "flex-start",
    marginBottom: 5,
    borderRadius: 10,
    flexDirection: "row",
    width: Math.round(Dimensions.get('window').width) - 55,
  },
  detailTitle: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#ece6c2",
    letterSpacing: 1,
    alignSelf: "flex-start",
    padding: 8,
    // marginLeft: 5,
  },
  detailContent: {
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    width: Math.round(Dimensions.get('window').width) - 55,
    paddingVertical: 10,
    backgroundColor: "#d2a24c",
    alignItems: "flex-start",
  },
  contentText: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#6f5643",
    letterSpacing: 1,
    alignSelf: "flex-end",
    paddingVertical: 8,
    marginRight: 120,
  },
  wholeDetail: {
    width: Math.round(Dimensions.get('window').width) - 55,
    backgroundColor: "#d2a24c",
    borderRadius: 10,
    // paddingHorizontal: 10,
    paddingVertical: 10,
  },
  img: {
    width: Math.round(Dimensions.get('window').width) - 100,
    height: 230,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 10,
  }
});