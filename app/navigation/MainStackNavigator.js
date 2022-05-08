import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeTabNavigator from "./HomeTabNavigator";

import ChatStartScreen from "../screen/Main/ChatStartScreen";
import ChatScreen from "../screen/Main/ChatScreen";
import ChatBasicInfoScreen from "../screen/Main/ChatBasicInfoScreen";
import ChatResultScreen from "../screen/Main/ChatResultScreen";
import DiseaseInfoScreen from "../screen/Main/DiseaseInfoScreen";

import DefaultInfoScreen from "../screen/Setting/DefaultInfoScreen";
import MedicalInfoScreen from "../screen/Setting/MedicalInfoScreen";
import HealthDiaryCreateScreen from "../screen/HealthDiary/HealthDiaryCreateScreen";
import HealthDiarySelectPain from "../screen/HealthDiary/HealthDiarySelectPain"
import AuthStackNavigator from "./AuthStackNavigator";
import DiagnosisTop3Screen from "../screen/Diagnosis/DiagnosisTop3Screen";
import DiagnosisDetailScreen from "../screen/Diagnosis/DiagnosisDetailScreen";
import * as SecureStore from "expo-secure-store";
import {AuthContext} from "../context/AuthContextProviders";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {

    const {state, dispatch} = useContext(AuthContext);
    const getToken = async () => {
        let token = null;
        try {
            const tokenFromAsync = await SecureStore.getItemAsync('token');
            if (tokenFromAsync !== 'null') { // 토큰이 저장되어 있을 때(로그인 기록 O && 로그아웃 X)
                token = JSON.parse(tokenFromAsync);
                console.log("token : ", token);

                // 토큰 유효성 검증
                console.log('1. 토큰 유효성 검증!')
                const response = await fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users', {
                    headers: {Authorization: `Bearer ${token.accessToken}`}
                }).then(response => response.json());

                // 토큰 재발급(refresh token)
                if (response.result === 'FAIL') {
                    console.log('2. refresh 토큰 유효성 검증!')
                    const response = await fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/reissue', {
                        method: 'post',
                        headers: {Authorization: `Bearer ${token.refreshToken}`}
                    }).then(response => response.json());

                    if (response.result === 'FAIL') {
                        token = null;
                        console.log('3. 유효하지 않은 토큰!');
                    } else {
                        token = response;
                        dispatch({type: 'RESTORE_TOKEN', token: token});
                        console.log('3. 바뀐 토큰 저장!');
                    }
                }
            }
        } catch (e) {
            // Restoring token failed
            console.log('[error] secure store 에러 발생!');
            console.error(e);
        }
        dispatch({type: 'RESTORE_TOKEN', token: token});
    };

    useEffect(() => {
        getToken();
    }, [])

    return (
        <Stack.Navigator initialRouteName="Auth" screenOptions={{headerShown: false}}>
            {state.userToken === null ? <Stack.Screen name="Auth" component={AuthStackNavigator}/> :
                <Stack.Group navigationKey={state.userToken ? 'user' : 'guest'}>
                    <Stack.Screen name="HomeTab" component={HomeTabNavigator}/>

                    <Stack.Screen name="ChatStart" component={ChatStartScreen}/>
                    <Stack.Screen name="ChatBasicInfo" component={ChatBasicInfoScreen}/>
                    <Stack.Screen name="Chat" component={ChatScreen}/>
                    <Stack.Screen name="ChatResult" component={ChatResultScreen}/>
                    <Stack.Screen name="DiseaseInfo" component={DiseaseInfoScreen}/>

                    {/* 캘린더나 설정 관련 페이지 있으면 추가하기. */}
                    <Stack.Screen name="DefaultInfo" component={DefaultInfoScreen}/>
                    <Stack.Screen name="MedicalInfo" component={MedicalInfoScreen}/>

                    {/*건강일기 페이지*/}
                    <Stack.Screen name="HealthDiaryCreate" component={HealthDiaryCreateScreen}/>
                    <Stack.Screen name="HealthDiarySelectPain" component={HealthDiarySelectPain}/>

                    {/*AI 진단 페이지*/}
                    <Stack.Screen name="DiagnosisTop3" component={DiagnosisTop3Screen}/>
                    <Stack.Screen name="DiagnosisDetail" component={DiagnosisDetailScreen}/>
                </Stack.Group>
            }
        </Stack.Navigator>
    );
};

export default MainStackNavigator;