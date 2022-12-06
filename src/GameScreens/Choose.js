import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker'
import back from '../assets/back.png'
import tutorial from '../assets/tutorial.gif'

export default function Choose({ route, navigation }) {
    const username = route.params.username;
    const [difficulty, setDifficulty] = useState('簡單');
    const [deck, setDeck] = useState('預設');
    const RadioButton = (props) => (
        <TouchableOpacity
            style={{
                backgroundColor: props.activeTab === props.text ? "#cc6b49" : "transparent",
                borderColor: props.activeTab === props.text ? "transparent" : "#cc6b49",
                paddingVertical: 13,
                paddingHorizontal: 20,
                borderRadius: 10,
                marginHorizontal: 10
            }}
            onPress={() => props.setActiveTab(props.text)}
        >
            <Text style={{ color: props.activeTab === props.text ? "#fff" : "#cc6b49", fontSize: 25, fontWeight: "600", letterSpacing: 2.5, marginLeft: 2.5 }}>{props.text}</Text>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={back} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>遊戲前選擇</Text>

            </View>

            <View style={styles.detailView}>
                <View style={styles.detailTitleView}>
                    <Text style={styles.detailTitle}>牌組:</Text>
                </View>
                <View style={{ flexDirection: "row", alignSelf: "center", marginBottom: 25 }}>
                    <RadioButton
                        text="預設"
                        btnColor="#cc6b49"
                        textColor="white"
                        activeTab={deck}
                        setActiveTab={setDeck}
                    />
                    <RadioButton
                        text="自訂"
                        btnColor="white"
                        textColor="#cc6b49"
                        activeTab={deck}
                        setActiveTab={setDeck}
                    />
                </View>
            </View>
            <View style={styles.detailView}>
                <View style={styles.detailTitleView}>
                    <Text style={styles.detailTitle}>難度:</Text>
                </View>

                <View style={{ flexDirection: "row", alignSelf: "center", marginBottom: 25 }}>
                    <RadioButton
                        text="簡單"
                        btnColor="#cc6b49"
                        textColor="white"
                        activeTab={difficulty}
                        setActiveTab={setDifficulty}
                    />
                    <RadioButton
                        text="困難"
                        btnColor="white"
                        textColor="#cc6b49"
                        activeTab={difficulty}
                        setActiveTab={setDifficulty}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.submit} onPress={() => {
                if (deck == '' || difficulty == '') {
                    Alert.alert(
                        "再檢查一下",
                        "請確認必填欄位是否漏填!",
                        [{ text: "好", onPress: () => console.log("OK Pressed") }]
                    )
                }
                else {
                    navigation.navigate("Game", {
                        username: route.params.username,
                        userID: route.params.userID,
                        type: deck,
                        difficulty: difficulty
                    })
                }
            }}>
                <Text style={styles.bigText}>開始遊戲</Text>
            </TouchableOpacity>
        </View>
    )

}
const styles = {
    flexContainer: {
        // flex: 1,
        flexDirection: "row",
        marginHorizontal: 30
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
    backIcon: {
        tintColor: "#6f5643",
        width: 20,
        height: 30,
        marginRight: 10,
        marginTop: 11,
    },
    flatlistRow: {
        flex: 1,
        padding: 10
    },
    topContent: {
        flex: 1,
        justifyContent: "center"
    },
    bigText: {
        fontSize: 25,
        fontWeight: "bold"
    },
    mainContent: {
        flex: 1
    },
    tinyLogo: {
        width: 65,
        height: 65,
        margin: 2,
        borderRadius: 8,
    },
    card: {
        backgroundColor: "#d2a24c",
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: 75,
        height: 80,
    },
    text_field: {
        width: 200,
        height: 40,
        borderColor: "#bfbfbf",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    container: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: '#ece6c2'
    },
    body: {
        marginTop: 10,
        width: Math.round(Dimensions.get('window').width) - 20,
        alignSelf: "center",
    },
    bottomContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    },
    flatlistRow: {
        flex: 1,
        padding: 10
    },
    username: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#6f5643",
        marginTop: 10,
    },
    score: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#6f5643",
        marginTop: 10
    },
    score_container: {
        flex: 1,
        alignItems: "center"
    },
    detailTitle: {
        fontSize: 25,
        fontFamily: "Avenir Next",
        fontWeight: "600",
        color: "#cc6b49",
        letterSpacing: 1,
        // alignSelf: "flex-start",
        // padding: 10,
        marginLeft: 40,
    },
    detailView: {
        alignItems: "flex-start",
        marginTop: 20,
        borderRadius: 10,
        // backgroundColor: "#d2a24c",
    }, imageContainer: {
        width: (Math.round(Dimensions.get('window').width) - 50) / 2,
        height: 130,
        padding: 10,
        // marginHorizontal: 20,
        borderRadius: 15,
        backgroundColor: "#d2a24c",
        flex: 1,
        marginTop: 25,
        margin: 10
    },
    imageContainerText: {
        fontSize: 25,
        fontFamily: "Avenir Next",
        fontWeight: "600",
        color: "#ebecf0",
        letterSpacing: 1,
        flexDirection: "row",
        // width: (Math.round(Dimensions.get('window').width) - 50) / 2,
        height: 100,
        alignSelf: "center",
        paddingHorizontal: 15,
        paddingTop: 5,
        borderRadius: 10,
        fontWeight: "bold",
    }, submit: {
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
};
