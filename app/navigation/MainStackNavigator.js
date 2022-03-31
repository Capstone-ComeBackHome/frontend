import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeTabNavigator from "./HomeTabNavigator";

import ChatScreen from "../screen/Main/ChatScreen";
import ChatResultScreen from "../screen/Main/ChatResultScreen";
import DiseaseInfoScreen from "../screen/Main/DiseaseInfoScreen";


const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown : false}}>
            <Stack.Screen name="HomeTab" component={HomeTabNavigator}/>

            <Stack.Screen name="Chat" component={ChatScreen}/>
            <Stack.Screen name="ChatResult" component={ChatResultScreen}/>
            <Stack.Screen name="DiseaseInfo" component={DiseaseInfoScreen}/>

            {/* 캘린더나 설정 관련 페이지 있으면 추가하기. */}
        </Stack.Navigator>
    );
};

export default MainStackNavigator;