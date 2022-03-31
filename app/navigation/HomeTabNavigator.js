import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

import HomeScreen from "../screen/Main/HomeScreen";
import CalenderScreen from "../screen/Calender/CalenderScreen";
import SettingScreen from "../screen/Setting/SettingScreen";

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
    const {colors} = useTheme();

    return (
        <Tab.Navigator screenOptions={{
            "tabBarHideOnKeyboard": true,
            "tabBarStyle": [{"display": "flex"}, null],
            "headerShown": false
        }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Icon type="ionicon" name={focused ? 'home' : 'home-outline'} size={26} color={colors.mainColor}/>),
                    tabBarLabel: () => null
                }}
            />
            <Tab.Screen
                name="Calender"
                component={CalenderScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Icon type="ionicon" name={focused ? 'today' : 'today-outline'} size={26} color={colors.mainColor}/>),
                    tabBarLabel: () => null
                }}/>
            <Tab.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Icon type="ionicon" name={focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline'} size={26} color={colors.mainColor}/>),
                    tabBarLabel: () => null
                }}/>
        </Tab.Navigator>
    );
}

export default HomeTabNavigator;