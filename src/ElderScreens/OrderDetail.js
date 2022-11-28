import { 
  SafeAreaView, 
  Text, 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  Dimensions, 
  Alert, 
  KeyboardAvoidingView, 
  ScrollView, 
 } from 'react-native'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'

import home from '../assets/home.png'
import back from '../assets/back.png'
import colon from '../assets/colon.png'
import slash from '../assets/slash.png'
import lena from '../assets/lena.jpg'
import camera from '../assets/camera.png'
import clock from '../assets/clock.png'
import address from '../assets/address.png'
import memo from '../assets/memo.png'
import photo from '../assets/photo.png'
import upload from '../assets/upload.png'
import service from '../assets/service.png'

export default function OrderDetail({ route, navigation }) {
  console.log("[DETAIL] userID: " + route.params.userID)
  // order info
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [month, setMonth] = useState('')
  const [date, setDate] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')

  // image variable
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [image, setImage] = useState(null)
  const [imageName, setImageName] = useState(null)
  const [imageType, setImageType] = useState(null)

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted')
    })()
  })

  // input section for month, date, hour, minute
  const timeInputBlock = (placeholder, onChangeText, value) => {
    return(
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ebecf0"
        onChangeText={onChangeText}
        value={value}
        style={styles.timeInput}
        maxLength={2}
        keyboardType="numeric"
      />
    )
  }

  console.log("location HERE: " + location)
  // submit the order, passing order information to server
  const submit = () => {
    const url = route.params.baseUrl + '/Orders/PostOrder';
    const formData = new FormData();
    if(month === '' || date === '' || hour === '' || minute === '' || location === '') {
      Alert.alert(
        "再檢查一下", 
        "請確認必填欄位是否漏填!",
        [{text: "好", onPress: () => console.log("OK Pressed")}]
      )
    } else{
      // console.log("ADDR: " + location)
      formData.append('ElderId', route.params.userID);
      formData.append('OrderType', route.params.orderId);
      formData.append('Place', location);
      formData.append('Descript', description);
      formData.append('Month', month);
      formData.append('Day', date);
      formData.append('Hour', hour);
      formData.append('Min', minute);
      formData.append('Image', {type: "image", uri: image, name: imageName});
      // formData.append('Image', {uri: image});

      fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
        .then((response) => {
          // console.log('succeses')
          console.log("submit: " + response)
        })

      // for image
      navigation.navigate("Home", {msg: route.params.userID})
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log(result)
    if (!result.cancelled) {
      setImage(result.uri)
      var temp = (result.uri).toString();
      console.log(temp);
      const arr = temp.split('/');
      console.log(arr);
      setImageName(arr[arr.length - 1]);
      setImageType(result.type)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={back} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>訂單內容</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.pop(3)}>
          <Image source={home} style={styles.homeIcon}/>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0}>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          style={{
            width: Math.round(Dimensions.get('window').width), 
            paddingHorizontal: 25,
            // marginBottom: 130,
          }}
        >  
          {/* print selected service type and detail */}
          <View style={styles.detailView}>
            <View style={styles.detailTitleView}>
              <Image source={service} style={styles.detailIcon}/>
              <Text style={styles.detailTitle}>項目</Text>
            </View>
            <View style={[styles.inputBlock, {height: 55, paddingTop: 10}]}>
              <Text style={styles.service}>
                {/* 類別 → 項目 */}
                {route.params.mType} → {route.params.detail}
              </Text>
            </View>
          </View>

          {/* pick a time */}
          <View style={styles.detailView}>
            <View style={styles.detailTitleView}>
              <Image source={clock} style={styles.detailIcon}/>
              <Text style={styles.detailTitle}>時間【必填】</Text>
            </View>
            <View style={styles.timeInputBlock}>
              {timeInputBlock("月", setMonth, month)}
              <Image source={slash} style={styles.icon} />
              {timeInputBlock("日", setDate, date)}
              <View style={{width: 50}}></View>
              {timeInputBlock("時", setHour, hour)}
              <Image source={colon} style={styles.icon} />
              {timeInputBlock("分", setMinute, minute)}
            </View>
          </View>

          {/* specify location */}
          <View style={styles.detailView}>
            <View style={styles.detailTitleView}>
              <Image source={address} style={styles.detailIcon}/>
              <Text style={styles.detailTitle}>地點【必填】</Text>
            </View>
            <TextInput
              placeholder="輸入地址或地標"
              placeholderTextColor="#ebecf0"
              onChangeText={setLocation}
              value={location}
              style={styles.inputBlock}
              multiline={true}
              maxLength={100}
            />
          </View>

          {/* for detail desscription */}
          <View style={styles.detailView}>
            <View style={styles.detailTitleView}>
              <Image source={memo} style={styles.detailIcon}/>
              <Text style={styles.detailTitle}>備註</Text>
            </View>
            <TextInput
              placeholder="上限50字"
              placeholderTextColor="#ebecf0"
              onChangeText={setDescription}
              value={description}
              style={styles.inputBlock}
              multiline={true}
              maxLength={50}
            />
          </View>

          <View style={styles.detailView}>
            <TouchableOpacity style={styles.detailTitleView}>
              <Image source={photo} style={styles.detailIcon}/>
              <Text style={styles.detailTitle}>地點預覽照片</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage()}>
              {/* <Image source={upload} style={styles.imageContainerText}>點擊此處打開相簿</Image> */}
              <Text style={styles.imageContainerText}>點擊此處打開相簿</Text>
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </TouchableOpacity>
          </View>

          {/* submit button */}
          <TouchableOpacity style={styles.submit} onPress={submit}>
            <Text style={styles.submitText}>送出訂單</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginRight: 130,
    justifyContent: "center",
  },
  homeIcon: {
    tintColor: "#6f5643",
    width: 35,
    height: 35,
    marginTop: 8
  },
  backIcon: {
    tintColor: "#6f5643",
    width: 20,
    height: 30,
    marginRight: 10,
    marginTop: 11,
  },
  submit: {
    backgroundColor: "#cc6b49",
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    width: Math.round(Dimensions.get('window').width) - 50,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 35,
    marginBottom: 170
  },
  submitText: {
    fontSize: 30,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "white",
    letterSpacing: 30,
    marginLeft: 30
  },
  timeInputBlock: {
    flexDirection: "row", 
    justifyContent: "center", 
    backgroundColor: "#d2a24c",
    borderRadius: 10,
    width: Math.round(Dimensions.get('window').width) - 50,
  },
  timeInput: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#6f5643",
    letterSpacing: 1,
    shadowColor: "black",
    flexDirection: "row",
    width: 63,
    height: 55,
    alignSelf: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
    textAlign: "center",
  },
  icon: {
    width: 20,
    height: 50,
    alignSelf: "center",
    tintColor: "#6f5643"
  },
  detailView: {
    alignItems: "flex-start",
    marginTop: 20,
    borderRadius: 10,
    // backgroundColor: "#d2a24c",
  },
  inputBlock: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#6f5643",
    letterSpacing: 1,
    flexDirection: "row",
    width: Math.round(Dimensions.get('window').width) - 50,
    height: 105,
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingTop: 15,
    borderRadius: 10,
    justifyContent: "flex-start",
    backgroundColor: "#d2a24c"
  },
  service: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#6f5643",
    letterSpacing: 1,
  },
  imageContainer: {
    width: Math.round(Dimensions.get('window').width) - 50,
    height: 200, 
    padding: 10, 
    borderRadius: 15, 
    backgroundColor: "#d2a24c", 
    alignSelf: "center" 
  },
  imageContainerText:{
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#ebecf0",
    letterSpacing: 1,
    flexDirection: "row",
    width: Math.round(Dimensions.get('window').width) - 50,
    height: 105,
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingTop: 5,
    borderRadius: 10,
  },
  image: {
    width: Math.round(Dimensions.get('window').width) - 70,
    height: 180, 
    alignSelf: "center", 
    borderRadius: 10,
    position: "absolute",
    top: 10,
  },
  detailIcon: {
    tintColor: "#cc6b49",
    height: 30, 
    width: 30,
    marginLeft: 5
  },
  detailTitle: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#cc6b49",
    letterSpacing: 1,
    // alignSelf: "flex-start",
    // padding: 10,
    marginLeft: 10,
  },
  detailTitleView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  upload: {
    width: 30,
    height: 30,
    tintColor: "#cc6b49",
  }
})