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

export default function GameStart({ route, navigation }) {
    console.log("[GS] userID: " + route.params.userID)
    return (
        // <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={back} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>遊戲</Text>
                </View>

                <View>
                    <Image source={tutorial} style={styles.memory} />
                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.rule}>【遊戲規則】</Text>
                        <Text style={styles.rule}>翻開兩張相同的牌，得1分</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate("Game", {
                            username: route.params.name,
                            userID: route.params.userID
                        })
                    }}>
                        <Text style={styles.buttonText}>開 始 遊 戲</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate("AddImage", {
                            username: route.params.name,
                            userID: route.params.userID
                        })
                    }}>
                        <Text style={styles.buttonText} >更 換 卡 牌</Text>
                    </TouchableOpacity>
                </View>
            </View >
        // </ScrollView>
    );
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
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
    button: {
        backgroundColor: "#d2a24c",
        height: 70,
        width: Math.round(Dimensions.get('window').width) - 200,
        marginBottom: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 10
    },
    buttonText: {
        fontSize: 30,
        fontFamily: "Avenir Next",
        fontWeight: "600",
        color: "#6f5643",
        alignSelf: "center",
    },
    imageContainer: {
        width: Math.round(Dimensions.get('window').width) - 50,
        height: 200,
        padding: 10,
        borderRadius: 15,
        backgroundColor: "#d2a24c",
        alignSelf: "center"
    },
    imageContainerText: {
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
        width: (Math.round(Dimensions.get('window').width) - 70) / 2,
        height: 90,
        alignSelf: "center",
        borderRadius: 10,
        position: "absolute",
        top: 10,
    },
    memory: {
        width: Math.round(Dimensions.get('window').width) - 190,
        height: 220,
        marginBottom: 25,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 100
    },
    rule: {
        fontSize: 25,
        alignSelf: "center",
        fontFamily: "Avenir Next",
        color: "#6f5643",
        marginBottom: 10,
        fontWeight: "600"
    }
};
