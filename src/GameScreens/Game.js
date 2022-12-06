import React, { Component, useState, useEffect, useRef } from "react";
import { View, FlatList, Image, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import Question from '../assets/question.png';
import back from '../assets/back.png';

export default function GameScreen({ route, navigation }) {
    const username = route.params.username;
    const [cards, setCards] = useState([]);
    const [selected_pairs, setSelected_pairs] = useState([]);
    const [score, setScore] = useState(0);
    const [currentS, setCurrentS] = useState([]);
    const [start, setStart] = useState(new Date());
    const [time, setTime] = useState(0);
    const timeRef = useRef();
    const getCards = () => {
        console.log(route.params.userID)
        var number = (route.params.difficulty == '簡單' ? 4 : 8)
        const url = route.params.baseUrl + '/Game/GetRandomImages?' + new URLSearchParams({
            ElderId: route.params.userID,
            num: number,
            type: route.params.type
        });
        console.log(url);
        fetch(url, { method: 'GET' })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                setCards(responseData)
            })
            .catch((error) => {
                console.log('error  ' + error);
            })
    }

    const renderCard = ({ item }) => {
        var src;
        if (item.isOpen == true) {
            var imageUrl = route.params.baseUrl + item.url;
            src = { uri: imageUrl };
        }
        else {
            src = Question;
        }
        if (route.params.difficulty != '簡單') {
            return (
                <View style={styles.card}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => clickCard({ item }, item.num)}
                        key={item.num}
                    >
                        <Image style={styles.tinyLogo} source={src} />
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return (
                <View style={styles.card}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => clickCard({ item }, item.num)}
                        key={item.num}
                    >
                        <Image style={styles.tinyLogo} source={src} />
                    </TouchableOpacity>
                </View>
            );
        }
    };

    //點擊後邏輯
    const clickCard = (onclick, num) => {
        var temp = [...cards];
        let select = [...selected_pairs];
        var current = [...currentS];
        if (current.length >= 2) {
            clearTimeout()
            close(current)
        }
        if (onclick.item.isOpen == false) {
            temp[num].isOpen = true;
            current = current.concat(num);
            setCards(temp);
            setCurrentS(current);
            console.log(current.length);
            if (current.length == 2) {
                if (cards[current[0]].url == cards[current[1]].url) {
                    var number = (route.params.difficulty == '簡單' ? 4 : 8)
                    if (score == number - 1) {
                        setScore(0);

                        Alert.alert("你是最棒的!", "這次耗時" + Math.floor(timeRef.current / 60) + '分' + Math.floor(timeRef.current % 60) + '秒');

                        stopTheGame();
                        navigation.goBack()
                        return;
                    }
                    setScore(score + 1);
                    setSelected_pairs(select.concat(cards[current[1]].url));
                    setCurrentS([])
                }
                else {
                    setTimeout(() => {
                        while (current.length > 0) {
                            var index = current[current.length - 1];
                            temp[index].isOpen = false;
                            current.pop();
                        }
                        cards.forEach((item) => {
                            renderCard({ item })
                        });
                    }, 500);
                }
            } if (current.length > 2) {
                close(current)
                clickCard(onclick, num)
            }
        }
    }
    const stopTheGame = () => {
        const body = JSON.stringify({
            userId: route.params.userId,
            time: time
        })
        const url = route.params.baseUrl + '/Game/UpdateRecord'
        fetch(url,
            {
                method: "POST",
                body: body
            }
        ).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
            })
            .catch((error) => {
                console.log('[GAME] error: ' + error);
            })
    }
    const close = (current) => {
        var temp = [...cards];
        while (current.length > 0) {
            var index = current[current.length - 1];
            temp[index].isOpen = false;
            current.pop();
        }
        setCards(temp)
        setCurrentS([])

    }

    const elapseTime = () => {
        var currentTime = new Date();
        setTime((currentTime - start) / 1000);
    }

    useEffect(() => {
        getCards();
        setStart(new Date())
        const interval = setInterval(() => {
            elapseTime();
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        cards.forEach((item) => {
            renderCard({ item })
        });
    }, [cards]);
    useEffect(() => {
        timeRef.current = time
    }, [time]);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={back} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>紙牌遊戲</Text>

            </View>
            <View style={styles.body}>
                <FlatList
                    data={cards}
                    renderItem={renderCard}
                    numColumns={route.params.difficulty == '簡單' ? 2 : 4}
                    keyExtractor={item => item.num}
                    columnWrapperStyle={styles.flatlistRow}
                />
            </View>
            <View style={styles.bottomContent}>
                <View style={styles.score_container}>
                    {/* <Text style={styles.username}>【{username}】</Text>  */}
                    <Text style={styles.score}>【分數】{score}</Text>
                </View>
            </View>
            <View style={[styles.score_container]}>
                <Text style={styles.score} >【花費時間】{Math.floor(timeRef.current / 60)}:{Math.floor(timeRef.current % 60)}</Text>
            </View>
        </View>
    )
}

const styles = {
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

};
