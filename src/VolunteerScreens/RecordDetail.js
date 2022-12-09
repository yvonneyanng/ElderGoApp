import { SafeAreaView, Text, StyleSheet, Image, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'

import back from '../assets/back.png'

// 單筆訂單細節顯示
export default function RecordDetail({ navigation, route }) {

  const [status, setStatus] = useState('');

  console.log("[DETAIL] status: " + route.params.stat);
  console.log("[DETAIL] user: " + route.params.userID);
  console.log("[DETAIL] order: " + route.params.orderID);
  console.log("-----------------------");

  const update = () => {
    const url = route.params.baseUrl + '/Orders/ProcessingOrder?' + new URLSearchParams({
      id: route.params.orderID,
      helper: route.params.userID
    });
    fetch(url, { method: 'PUT'})
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log('update error -> ' + error);
      })
    navigation.navigate("VolunteerHome", { msg: route.params.userID });
  }

  const complete = () => {
    const url = route.params.baseUrl + '/Orders/FinishedOrder?' + new URLSearchParams({
      id: route.params.orderID,
      helper: route.params.userID
    });
    fetch(url, { method: 'PUT'})
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log('update error -> ' + error);
      })
    navigation.navigate("VolunteerHome", { msg: route.params.userID });
  }

  const home = () => {
    navigation.navigate("VolunteerHome", { msg: route.params.userID });
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
      {/* display order, time, location, name... here */}

      <ScrollView showsVerticalScrollIndicator={false} style={{width: Math.round(Dimensions.get('window').width), paddingHorizontal: 25}}>
        <View style={{height: 20}}></View>
        <View style={styles.wholeDetail}>
          {detail("【項目】", route.params.detail)}
          {detail("【時間】", route.params.time.substring(11, 16) + ", " + route.params.time.substring(5, 10))}
          {detail("【地點】", route.params.place)}

          {detail("【服務對象】", route.params.name)}
          {detail("【備註】", route.params.descript)}
          <Text style={styles.detailTitle}>【環境預覽】</Text>
          <Image source={{ uri: route.params.img }} style={styles.img}/>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={route.params.stat === 1 ? update : route.params.stat === 2 ? complete : home}
        >
          <Text style={styles.buttonText}>
            {route.params.stat === 1 ? "開始服務" : route.params.stat === 2 ? '完成訂單' : '返   回'}
          </Text>
        </TouchableOpacity>
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
    marginRight: 10,
    marginTop: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    // elevation: 2,
    backgroundColor: "#cc6b49",
    width: Math.round(Dimensions.get('window').width) - 55,
    height: 60,
    marginHorizontal: 15,
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 25,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 28,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "white",
    letterSpacing: 30,
    marginLeft: 30,
    alignSelf: "center",
  },
  wholeDetail: {
    width: Math.round(Dimensions.get('window').width) - 55,
    backgroundColor: "#d2a24c",
    borderRadius: 10,
    // paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "center",
  },
  img: {
    width: Math.round(Dimensions.get('window').width) - 100,
    height: 230,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  detailView: {
    alignItems: "flex-start",
    marginBottom: 5,
    borderRadius: 10,
    flexDirection: "row",
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
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
});