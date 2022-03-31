import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// 각 페이지들
import AuthStackNavigator from "./AuthStackNavigator";
import MainStackNavigator from "./MainStackNavigator";

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Auth" component={AuthStackNavigator}/>
            <Stack.Screen name="Main" component={MainStackNavigator}/>
        </Stack.Navigator>
    );
};

export default AppStackNavigator;