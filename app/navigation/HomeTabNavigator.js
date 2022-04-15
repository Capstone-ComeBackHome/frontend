import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

import HomeScreen from "../screen/Main/HomeScreen";
import CalenderScreen from "../screen/Calender/CalenderScreen";
import SettingScreen from "../screen/Setting/SettingScreen";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AppContextProviders";

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
    const {colors} = useTheme();
    const {state} = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState("");
    useEffect(() => {
        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users', {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then(data => {
            console.log('userInfo : ', data);
            setUserInfo(() => data);
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
                    tabBarIcon: ({focused}) => (
                        <Icon type="ionicon" name={focused ? 'home' : 'home-outline'} size={26}
                              color={colors.mainColor}/>),
                    tabBarLabel: () => null
                }}
            >
                {props => <HomeScreen {...props} userInfo={userInfo}/>}
            </Tab.Screen>
            <Tab.Screen
                name="Calender"
                options={{
                    tabBarIcon: ({focused}) => (
                        <Icon type="ionicon" name={focused ? 'today' : 'today-outline'} size={26}
                              color={colors.mainColor}/>),
                    tabBarLabel: () => null
                }}
            >
                {props => <CalenderScreen {...props} userInfo={userInfo}/>}
            </Tab.Screen>
            <Tab.Screen
                name="Setting"
                options={{
                    tabBarIcon: ({focused}) => (
                        <Icon type="ionicon" name={focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline'}
                              size={26} color={colors.mainColor}/>),
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