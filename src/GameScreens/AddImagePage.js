import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker'
import back from '../assets/back.png'
import tutorial from '../assets/tutorial.gif'
export default function AddImagePage({ route, navigation }) {
    // image variable
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState(null)
    const [imageType, setImageType] = useState(null)

    const [image2, setImage2] = useState(null)
    const [imageName2, setImageName2] = useState(null)
    const [imageType2, setImageType2] = useState(null)

    const [image3, setImage3] = useState(null)
    const [imageName3, setImageName3] = useState(null)
    const [imageType3, setImageType3] = useState(null)

    const [image4, setImage4] = useState(null)
    const [imageName4, setImageName4] = useState(null)
    const [imageType4, setImageType4] = useState(null)

    const [image5, setImage5] = useState(null)
    const [imageName5, setImageName5] = useState(null)
    const [imageType5, setImageType5] = useState(null)

    const [image6, setImage6] = useState(null)
    const [imageName6, setImageName6] = useState(null)
    const [imageType6, setImageType6] = useState(null)

    const [image7, setImage7] = useState(null)
    const [imageName7, setImageName7] = useState(null)
    const [imageType7, setImageType7] = useState(null)

    const [image8, setImage8] = useState(null)
    const [imageName8, setImageName8] = useState(null)
    const [imageType8, setImageType8] = useState(null)

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermission(galleryStatus.status === 'granted')
        })()
    })
    const pickImage = async (seti, setin, setit) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            selectionLimit: 6,
            aspect: [4, 3],
            quality: 1,
        })
        console.log(result)
        if (!result.cancelled) {
            seti(result.uri)
            var temp = (result.uri).toString();
            console.log(temp);
            const arr = temp.split('/');
            console.log(arr);
            setin(arr[arr.length - 1]);
            setit(result.type)
        }
    }


    const submit = () => {
        const url = route.params.baseUrl + '/Game/AddImage';
        const formData = new FormData();


        // console.log("ADDR: " + location)
        console.log('1' + imageName)
        console.log(image)
        console.log(imageType)
        formData.append('ElderId', route.params.userID);
        if (image != null && imageType != null) {
            formData.append('Image', { type: imageType, uri: image, name: imageName });
        } if (image2 != null && imageType2 != null) {
            console.log('2' + imageName2)
            formData.append('Image2', { type: imageType2, uri: image2, name: imageName2 });
        } if (image3 != null && imageType3 != null) {
            console.log('3' + imageName3)
            formData.append('Image3', { type: imageType3, uri: image3, name: imageName3 });
        } if (image4 != null && imageType4 != null) {
            console.log('4' + imageName4)
            formData.append('Image4', { type: imageType4, uri: image4, name: imageName4 });
        } if (image5 != null && imageType5 != null) {
            console.log('5' + imageName5)
            formData.append('Image5', { type: imageType5, uri: image5, name: imageName5 });
        } if (image6 != null && imageType6 != null) {
            console.log('6' + imageName6)
            formData.append('Image6', { type: imageType6, uri: image6, name: imageName6 });
        } if (image7 != null && imageType7 != null) {
            console.log('7' + imageName7)
            formData.append('Image7', { type: imageType7, uri: image7, name: imageName7 });
        } if (image8 != null && imageType8 != null) {
            console.log('7' + imageName8)
            formData.append('Image8', { type: imageType8, uri: image8, name: imageName8 });
        }

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
        navigation.navigate("Home", { msg: route.params.userID })
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={back} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>遊戲</Text>
                </View>
                <View style={styles.flexContainer}>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage(setImage, setImageName, setImageType)}>
                        {/* <Image source={upload} style={styles.imageContainerText}>點擊此處打開相簿</Image> */}
                        <Text style={styles.imageContainerText}>點擊此處打開相簿</Text>
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage(setImage2, setImageName2, setImageType2)}>
                        {/* <Image source={upload} style={styles.imageContainerText}>點擊此處打開相簿</Image> */}
                        <Text style={styles.imageContainerText}>點擊此處打開相簿</Text>
                        {image2 && <Image source={{ uri: image2 }} style={styles.image} />}
                    </TouchableOpacity>
                </View>
                <View style={styles.flexContainer}>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage(setImage3, setImageName3, setImageType3)}>
                        {/* <Image source={upload} style={styles.imageContainerText}>點擊此處打開相簿</Image> */}
                        <Text style={styles.imageContainerText}>點擊此處打開相簿</Text>
                        {image3 && <Image source={{ uri: image3 }} style={styles.image} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage(setImage4, setImageName4, setImageType4)}>
                        {/* <Image source={upload} style={styles.imageContainerText}>點擊此處打開相簿</Image> */}
                        <Text style={styles.imageContainerText}>點擊此處打開相簿</Text>
                        {image4 && <Image source={{ uri: image4 }} style={styles.image} />}
                    </TouchableOpacity>
                </View>
                <View style={styles.flexContainer}>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage(setImage5, setImageName5, setImageType5)}>
                        {/* <Image source={upload} style={styles.imageContainerText}>點擊此處打開相簿</Image> */}
                        <Text style={styles.imageContainerText}>點擊此處打開相簿</Text>
                        {image5 && <Image source={{ uri: image5 }} style={styles.image} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage(setImage6, setImageName6, setImageType6)}>
                        {/* <Image source={upload} style={styles.imageContainerText}>點擊此處打開相簿</Image> */}
                        <Text style={styles.imageContainerText}>點擊此處打開相簿</Text>
                        {image6 && <Image source={{ uri: image6 }} style={styles.image} />}
                    </TouchableOpacity>
                </View>
                <View style={styles.flexContainer}>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage(setImage7, setImageName7, setImageType7)}>
                        {/* <Image source={upload} style={styles.imageContainerText}>點擊此處打開相簿</Image> */}
                        <Text style={styles.imageContainerText}>點擊此處打開相簿</Text>
                        {image7 && <Image source={{ uri: image7 }} style={styles.image} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage(setImage8, setImageName8, setImageType8)}>
                        {/* <Image source={upload} style={styles.imageContainerText}>點擊此處打開相簿</Image> */}
                        <Text style={styles.imageContainerText}>點擊此處打開相簿</Text>
                        {image8 && <Image source={{ uri: image8 }} style={styles.image} />}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.submit} onPress={submit}>
                    <Text style={styles.submitText}>送出訂單</Text>
                </TouchableOpacity>
            </View >
        </ScrollView>
    )
}

const styles = {
    flexContainer: {
        flex: 1,
        flexDirection: "row",
    },
    container: {
        flex: 1,
        backgroundColor: '#ece6c2',
    },
    header: {
        flexDirection: "row",
        marginTop: 65,
        // backgroundColor: "black",
        justifyContent: "flex-start",
        alignSelf: "center",
        width: Math.round(Dimensions.get('window').width) - 55,
    },
    pageTitle: {
        fontSize: 35,
        fontWeight: "bold",
        fontFamily: "Avenir Next",
        color: "#6f5643",
        letterSpacing: 2,
        // marginRight: 190,
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
    imageContainer: {
        width: (Math.round(Dimensions.get('window').width) - 50) / 2,
        height: 100,
        padding: 10,
        margin: 20,
        borderRadius: 15,
        backgroundColor: "#d2a24c",
        flex: 1,
    },
    imageContainerText: {
        fontSize: 25,
        fontFamily: "Avenir Next",
        fontWeight: "600",
        color: "#ebecf0",
        letterSpacing: 1,
        flexDirection: "row",
        width: (Math.round(Dimensions.get('window').width) - 50) / 2,
        height: 100,
        alignSelf: "center",
        paddingHorizontal: 15,
        paddingTop: 5,
        borderRadius: 10,
    },
    image: {
        width: (Math.round(Dimensions.get('window').width) - 90) / 2,
        height: 80,
        alignSelf: "center",
        borderRadius: 10,
        position: "absolute",
        top: 10,
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
}