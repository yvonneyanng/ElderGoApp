import React from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import back from '../assets/back.png'
import memory from '../assets/memory.gif'

export default function GameStart({ route, navigation }) {
    console.log(route);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={back} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>遊戲</Text>
            </View>

            <View style={styles.mainContent}>
                <Image source={memory} style={styles.memory} />
                <Text style={styles.rule}>【遊戲規則】</Text>
                <Text style={styles.rule}>翻開兩張相同的牌，得1分</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.navigate("Game", {
                        username: route.params.name
                    })
                }}>
                    <Text style={styles.buttonText}>開 始 遊 戲</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>查 看 排 行 榜</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>教 學 指 南</Text>
                </TouchableOpacity> */}
            </View>
        </View>
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
    mainContent: {
        marginTop: 15
    },
    button: {
        backgroundColor: "#d2a24c",
        height: 70,
        width: Math.round(Dimensions.get('window').width) - 200,
        marginBottom: 25,
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 20
    },
    buttonText: {
        fontSize: 30,
        fontFamily: "Avenir Next",
        fontWeight: "600",
        color: "#6f5643",
        alignSelf: "center",
    },
    memory: {
        width: Math.round(Dimensions.get('window').width) - 200,
        height: 200,
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
