import React, {useState, useEffect, useReducer, useMemo} from "react";
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {StatusBar} from "expo-status-bar";
import * as SecureStore from 'expo-secure-store';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStackNavigator from './navigation/AuthStackNavigator'
import MainStackNavigator from "./navigation/MainStackNavigator";
import HomeTabNavigator from "./navigation/HomeTabNavigator";
import ChatStartScreen from "./screen/Main/ChatStartScreen";
import ChatScreen from "./screen/Main/ChatScreen";
import ChatResultScreen from "./screen/Main/ChatResultScreen";
import DiseaseInfoScreen from "./screen/Main/DiseaseInfoScreen";
import DefaultInfoScreen from "./screen/Setting/DefaultInfoScreen";
import MedicalInfoScreen from "./screen/Setting/MedicalInfoScreen";

const Stack = createNativeStackNavigator();


// 자주 사용하는 색 지정
const ColorTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        mainColor: 'rgba(83,179,238, 1.0)',
        backgroundColor: '#ffffff',
        blue: {
            1: 'rgba(83,179,238,1.0)',
            2: 'rgba(83,179,238,0.4)',
            3: 'rgba(83,179,238,0.5)',
            4: 'rgba(75,155,204,0.05)',
        },
        black: {
            1: 'rgba(48,48,48,1.0)',
            2: 'rgba(48,48,48,0.3)',
            3: 'rgba(48,48,48,0.1)',
            4: 'rgba(48,48,48,0.05)'
        }
    }
};
const AuthContext = React.createContext();
export default function App() {

    const [appIsReady, setAppIsReady] = useState(false);
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignOut: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignOut: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignOut: false,
            userToken: null,
        },
        () => {
            return {
                isLoading: true,
                isSignOut: false,
                userToken: null,
            }
        }
    );

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const getToken = async () => {
            let token = null;
            try {
                const tokenFromAsync = await SecureStore.getItemAsync('token');
                if (tokenFromAsync) { // 토큰이 저장되어 있을 때(로그인 기록 O && 로그아웃 X)
                    token = JSON.parse(tokenFromAsync);

                    // 토큰 유효성 검증
                    console.log('토큰 유효성 검증!')
                    const response = await fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users', {
                        headers: {Authorization: `Bearer ${token.accessToken}`}
                    }).then(response => response.json());

                    // 토큰 재발급(refresh token)
                    if (response.code === 'LOGIN-401') {
                        console.log('토큰 재발급!')
                        const response = await fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/reissue', {
                            method: 'post',
                            headers: {Authorization: `Bearer ${token.refreshToken}`}
                        }).then(response => response.json());

                        if (response.code === 'LOGIN-401') {
                            token = null;
                        } else {
                            console.log(response);
                            token = response;
                        }
                    }
                }
            } catch (e) {
                // Restoring token failed
                console.log('secure store 에러 발생!');
                console.error(e);
            }

            dispatch({type: 'RESTORE_TOKEN', token: token});
        };


        getToken();
    }, []);

    const authContext = useMemo(
        () => ({
            signIn: async (data) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
            },
            signOut: () => dispatch({type: 'SIGN_OUT'}),
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
            },
        }),
        []
    );

    const LoadFonts = async () => {
        await Font.loadAsync({
            'Pretendard-Thin': require('./assets/fonts/Pretendard-Thin.otf'),
            'Pretendard-ExtraLight': require('./assets/fonts/Pretendard-ExtraLight.otf'),
            'Pretendard-Light': require('./assets/fonts/Pretendard-Light.otf'),
            'Pretendard-Regular': require('./assets/fonts/Pretendard-Regular.otf'),
            'Pretendard-Medium': require('./assets/fonts/Pretendard-Medium.otf'),
            'Pretendard-SemiBold': require('./assets/fonts/Pretendard-SemiBold.otf'),
            'Pretendard-Bold': require('./assets/fonts/Pretendard-Bold.otf'),
            'Pretendard-ExtraBold': require('./assets/fonts/Pretendard-ExtraBold.otf'),
            'Pretendard-Black': require('./assets/fonts/Pretendard-Black.otf'),
        });
    }
    if (!appIsReady) {
        return (
            <AppLoading
                startAsync={LoadFonts}
                onFinish={() => setTimeout(() => setAppIsReady(true), 2000)}
                onError={() => {
                }}
            />
        );
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer theme={ColorTheme}>
                <StatusBar style={'black'} backgroundColor={'#fff'}/>
                <Stack.Navigator initialRouteName="Auth" screenOptions={{headerShown: false}}>
                    {state.userToken === null && <Stack.Screen name="Auth" component={AuthStackNavigator}/>}
                    <Stack.Group navigationKey={state.userToken ? 'user' : 'guest'}>
                        <Stack.Screen name="HomeTab" component={HomeTabNavigator}/>

                        <Stack.Screen name="ChatStart" component={ChatStartScreen}/>
                        <Stack.Screen name="Chat" component={ChatScreen}/>
                        <Stack.Screen name="ChatResult" component={ChatResultScreen}/>
                        <Stack.Screen name="DiseaseInfo" component={DiseaseInfoScreen}/>

                        {/* 캘린더나 설정 관련 페이지 있으면 추가하기. */}
                        <Stack.Screen name="DefaultInfo" component={DefaultInfoScreen}/>
                        <Stack.Screen name="MedicalInfo" component={MedicalInfoScreen}/>
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
