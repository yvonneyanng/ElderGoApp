import { SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, View, Alert, Dimensions, ScrollView } from 'react-native'
import React, { useContext } from 'react'

import logout from '../assets/logout.png'
import orders from '../assets/orders.png'
import service from '../assets/service.png'
import mod from '../assets/mod.png'
import game from '../assets/game.png'
import settings from '../assets/settings.png'

import FunctionTab from '../components/FunctionTab'
import { AuthContext } from '../navigation/AuthProvider';

// msg: helperID
export default function VolunteerHome({ route, navigation }) {

  const helperID = route.params.msg;
  console.log("[VOL-HOME] userID: " + helperID);
  // const { login, logout, loading } = useContext(AuthContext);

  // logout alert
  const logOut = () => {
    Alert.alert(
      "確認", 
      "是否要登出?",
      [
        {text: "是", onPress: () => navigation.navigate("SignIn")},
        {text: "否", onPress: () => console.log("No Pressed")}
        // {text: "是", onPress: () => { logout(), navigation.navigate("SignIn") }},
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>首頁</Text>
        <TouchableOpacity onPress={logOut}>
          <Image source={logout} style={styles.logout} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 15,
          height: Math.round(Dimensions.get('window').height)-180,
          // backgroundColor: "#ece662",
          // alignItems: "space-between",
        }}
      >
        <FunctionTab text="待接服務" description="查看正在等待的服務" screen="UnpickedOrders" icon={service} id={helperID}/>
        <FunctionTab text="歷史訂單" description="查看所有訂單記錄" screen="ServiceRecord" icon={orders} id={helperID}/>
        <FunctionTab text="遊戲" description="活動大腦" screen="紙牌遊戲" icon={game} id={helperID}/>
        <FunctionTab text="設定" description="修改會員資料" screen="Settings" icon={settings} id={helperID}/>
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
    justifyContent: "space-between",
    alignSelf: "center",
    width: Math.round(Dimensions.get('window').width) - 55,
  },
  pageTitle: {
    fontSize: 35, 
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 2,
  },
  logout: {
    tintColor: "#6f5643",
    width: 35,
    height: 35,
    marginTop: 10
  }
});