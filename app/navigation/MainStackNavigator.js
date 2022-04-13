import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//test
import HomeTabNavigator from "./HomeTabNavigator";

import ChatScreen from "../screen/Main/ChatScreen";
import ChatResultScreen from "../screen/Main/ChatResultScreen";
import DiseaseInfoScreen from "../screen/Main/DiseaseInfoScreen";

import DefaultInfoScreen from "../screen/Setting/DefaultInfoScreen";
import MedicalInfoScreen from "../screen/Setting/MedicalInfoScreen";
import HealthDiaryScreen from "../screen/HealthDiary/HealthDiaryScreen"
const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown : false}}>
            <Stack.Screen name="HomeTab" component={HomeTabNavigator}/>

            <Stack.Screen name="Chat" component={ChatScreen}/>
            <Stack.Screen name="ChatResult" component={ChatResultScreen}/>
            <Stack.Screen name="DiseaseInfo" component={DiseaseInfoScreen}/>

            {/* 캘린더나 설정 관련 페이지 있으면 추가하기. */}
            <Stack.Screen name="DefaultInfo" component={DefaultInfoScreen} />
            <Stack.Screen name="MedicalInfo" component={MedicalInfoScreen} />

            {/*건강일기 페이지*/}
            <Stack.Screen name="HealthDiary" component={HealthDiaryScreen}/>
        </Stack.Navigator>
    );
};

export default MainStackNavigator;