import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

import HomeScreen from "../screen/Main/HomeScreen";
import HealthDiaryScreen from "../screen/HealthDiary/HealthDiaryScreen";
import SettingScreen from "../screen/Setting/SettingScreen";
import HistoryScreen from "../screen/History/HistoryScreen";

import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContextProviders";


import AIIcon from '../assets/images/tab-icon/ai.svg';
import AIIconSelectedIcon from '../assets/images/tab-icon/ai_selected.svg';
import HistoryIcon from '../assets/images/tab-icon/history.svg';
import HistorySelectedIcon from '../assets/images/tab-icon/history_selected.svg';
import DiaryIcon from '../assets/images/tab-icon/diary.svg';
import DiarySelectedIcon from '../assets/images/tab-icon/diary_seleted.svg';
import SettingIcon from '../assets/images/tab-icon/setting.svg';
import SettingSelectedIcon from '../assets/images/tab-icon/setting_seleted.svg';



const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState("");
    useEffect(() => {
        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users', {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then(response => {
            // 토큰 재발급(refresh token)
            console.log(response);
            if (response.code === 'LOGIN-401') {
                console.log('2. refresh 토큰 유효성 검증!')
                fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/reissue', {
                    method: 'post',
                    headers: {Authorization: `Bearer ${state.userToken.refreshToken}`}
                }).then(response => response.json()).then(() => {
                    if (response.code === 'LOGIN-401') {
                        token = null;
                        console.log('3. 유효하지 않은 토큰!');
                    } else {
                        token = response;
                        dispatch({type: 'RESTORE_TOKEN', token: token});
                        console.log('3. 바뀐 토큰 저장!');
                    }
                })
            } else {
                console.log('userInfo : ', response);
                setUserInfo(() => response);
            }
        })
    }, [state]);

    return (
        <Tab.Navigator screenOptions={{
            "tabBarHideOnKeyboard": true,
            "tabBarStyle": [{"display": "flex"}, null],
            "headerShown": false
        }}>
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: ({focused}) => (focused ? <AIIconSelectedIcon/> : <AIIcon/>),
                    tabBarLabel: () => null
                }}
            >
                {props => <HomeScreen {...props} userInfo={userInfo}/>}
            </Tab.Screen>
            <Tab.Screen
                name="History"
                options={{
                    tabBarIcon: ({focused}) => (focused ? <HistorySelectedIcon/> : <HistoryIcon/>),
                    tabBarLabel: () => null
                }}
            >
                {props => <HistoryScreen {...props} userInfo={userInfo}/>}
            </Tab.Screen>
            <Tab.Screen
                name="Diary"
                options={{
                    tabBarIcon: ({focused}) => (focused ? <DiarySelectedIcon/> : <DiaryIcon/>),
                    tabBarLabel: () => null
                }}
            >
                {props => <HealthDiaryScreen {...props} userInfo={userInfo}/>}
            </Tab.Screen>
            <Tab.Screen
                name="Setting"
                options={{
                    tabBarIcon: ({focused}) => (focused ? <SettingSelectedIcon/> : <SettingIcon/>),
                    tabBarLabel: () => null
                }}
                userInfo={userInfo}
            >
                {props => <SettingScreen {...props} userInfo={userInfo}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default HomeTabNavigator;