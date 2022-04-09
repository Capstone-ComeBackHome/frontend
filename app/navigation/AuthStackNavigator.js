import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// 각 페이지들
import LoginScreen from '../screen/Auth/LoginScreen';
import RegisterScreen from "../screen/Auth/RegisterScreen";
import KakaoWebviewScreen from "../screen/Auth/KakaoWebviewScreen";
import GoogleWebviewScreen from "../screen/Auth/GoogleWebviewScreen";
import NaverWebviewScreen from "../screen/Auth/NaverWebviewScreen";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown : false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="KakaoWebview" component={KakaoWebviewScreen} />
            <Stack.Screen name="GoogleWebview" component={GoogleWebviewScreen} />
            <Stack.Screen name="NaverWebview" component={NaverWebviewScreen} />
        </Stack.Navigator>
    );
};

export default AuthStackNavigator;