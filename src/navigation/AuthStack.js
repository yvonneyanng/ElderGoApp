import { createStackNavigator } from '@react-navigation/stack';
import { withInAppNotification } from '@chatkitty/react-native-in-app-notification';
import React, { useContext, useState, useEffect } from 'react';

import { AuthContext } from './AuthProvider';
import { getChannelDisplayName, kitty } from '../chatkitty';
import Loading from '../components/Loading';
import { IconButton } from 'react-native-paper';

// ================= chat screens ================= //
import HomeScreen from '../ChatScreens/HomeScreen';
import BrowseChannelsScreen from '../ChatScreens/BrowseChannelsScreen';
import ChatScreen from '../ChatScreens/ChatScreen';
import CreateChannelScreen from '../ChatScreens/CreateChannelScreen';
import PhotoHome from '../ChatScreens/PhotoHome';
import PhotoEdit from '../ChatScreens/PhotoEdit';

// ================= shared screens ================= //
import SignIn from '../SharedScreens/SignIn';
import SignUp from '../SharedScreens/SignUp';
import Settings from '../SharedScreens/Settings';

// ================= screens for elderly ================= //
import Home from '../ElderScreens/Home';
import ServiceRoot from '../ElderScreens/ServiceRoot';
import ServiceType from '../ElderScreens/ServiceType';
import ServiceList from '../ElderScreens/ServiceList';
import OrderDetail from '../ElderScreens/OrderDetail';
import Chat from '../ElderScreens/Chat';
import OrderRecord from '../ElderScreens/OrderRecord';
import GameStart from '../GameScreens/GameStart';
import GameScreen from '../GameScreens/Game';
import AddImagePage from '../GameScreens/AddImagePage';

// ================= screens for volunteer ================= //
import VolunteerHome from '../VolunteerScreens/VolunteerHome';
import UnpickedOrders from '../VolunteerScreens/UnpickedOrders';
import ServiceDetail from '../VolunteerScreens/ServiceDetail';
import ServiceRecord from '../VolunteerScreens/ServiceRecord';
import RecordDetail from "../VolunteerScreens/RecordDetail";

const Stack = createStackNavigator();
const url = "https://da9d-2001-b011-800c-1e2b-59c7-284d-d996-2d8e.jp.ngrok.io"

export default function AuthStack() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    return kitty.onCurrentUserChanged((currentUser) => {
      setUser(currentUser);
      if (initializing) { setInitializing(false); }
      setLoading(false);
    });
  }, [initializing, setUser]);

  // if(user){
    useEffect(() => {
      registerForPushNotificationsAsync().then((token) => {
        kitty.updateCurrentUser((user) => {
          user.properties = {
            ...user.properties,
            'expo-push-token': token,
          };
  
          return user;
        });
      });
    }, []);
  // }

  if (loading) {
    return <Loading />;
  }

  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="VolunteerHome" component={VolunteerHome} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="ServiceRoot" component={ServiceRoot} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="ServiceType" component={ServiceType} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="ServiceList" component={ServiceList} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="OrderRecord" component={OrderRecord} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="UnpickedOrders" component={UnpickedOrders} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="ServiceRecord" component={ServiceRecord} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="RecordDetail" component={RecordDetail} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="聊天室" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateChannel" component={CreateChannelScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="圖片DIY"
        component={PhotoHome}
        options={{
          headerStyle: { backgroundColor: '#6f5643' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="編輯圖片"
        component={PhotoEdit}
        options={{
          headerStyle: { backgroundColor: '#6f5643' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen name="公共聊天室" component={BrowseChannelsScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Chat"
        component={withInAppNotification(ChatScreen)}
        options={({ route }) => ({
          title: getChannelDisplayName(route.params.channel),
          headerStyle: { backgroundColor: '#6f5643' },
          headerTintColor: '#fff',
        })}
      />
      <Stack.Screen name="紙牌遊戲" component={GameStart} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="Game" component={GameScreen} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
      <Stack.Screen name="AddImage" component={AddImagePage} initialParams={{ baseUrl: url }} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Constants.isDevice && Platform.OS !== 'web') {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  // if (Platform.OS === 'android') {
  //   await Notifications.setNotificationChannelAsync('default', {
  //     name: 'default',
  //     importance: Notifications.AndroidImportance.MAX,
  //     vibrationPattern: [0, 250, 250, 250],
  //     lightColor: '#FF231F7C',
  //   });
  // }

  return token;
}
