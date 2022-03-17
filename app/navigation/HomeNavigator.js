import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

import MainPage from '../screen/MainPageScreen';
import ChatScreen from "../screen/ChatScreen";
import ListScreen from "../screen/ListScreen";
import MyPageScreen from "../screen/MyPageScreen";
import CalenderScreen from "../screen/CalenderScreen";

const Tab = createBottomTabNavigator();

const HomeNavigator = ({navigation}) => {
    const {colors} = useTheme();
    return (
        <Tab.Navigator screenOptions={{
            "tabBarHideOnKeyboard": true,
            "tabBarStyle": [{"display": "flex"}, null]
        }}>
            <Tab.Screen name="main" children={() => <MainPage navigation={navigation}/>} options={{
                tabBarIcon: ({focused}) => (
                    <Icon type="ionicon" name={focused ? 'home' : 'home-outline'} size={26}
                          color={colors.mainColor}></Icon>),
                tabBarLabel: () => null
            }}/>
            <Tab.Screen name="chat" children={() => <ChatScreen navigation={navigation}/>} options={{
                tabBarIcon: ({focused}) => (
                    <Icon type="ionicon" name={focused ? 'fitness' : 'fitness-outline'} size={26}
                          color={colors.mainColor}></Icon>),
                tabBarLabel: () => null
            }}/>
            <Tab.Screen name="report" children={() => <ListScreen navigation={navigation}/>} options={{
                tabBarIcon: ({focused}) => (
                    <Icon type="ionicon" name={focused ? 'list' : 'list-outline'} size={26}
                          color={colors.mainColor}></Icon>),
                tabBarLabel: () => null
            }}/>
            <Tab.Screen name="calender" children={() => <CalenderScreen navigation={navigation}/>} options={{
                tabBarIcon: ({focused}) => (
                    <Icon type="ionicon" name={focused ? 'today' : 'today-outline'} size={26}
                          color={colors.mainColor}></Icon>),
                tabBarLabel: () => null
            }}/>
            <Tab.Screen name="mypage" children={() => <MyPageScreen navigation={navigation}/>} options={{
                tabBarIcon: ({focused}) => (
                    <Icon type="ionicon" name={focused ? 'person' : 'person-outline'} size={26}
                          color={colors.mainColor}></Icon>),
                tabBarLabel: () => null
            }}/>
        </Tab.Navigator>
    );
}

export default HomeNavigator;