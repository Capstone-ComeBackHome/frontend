import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// 각 페이지들
import LoginScreen from '../screen/Auth/LoginScreen';
import RegisterScreen from "../screen/Auth/RegisterScreen";
const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown : false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

export default AuthStackNavigator;