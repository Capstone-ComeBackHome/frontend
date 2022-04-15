import React, {useState, useEffect, useContext} from "react";
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {StatusBar} from "expo-status-bar";
import {AuthContextProviders} from "./context/AuthContextProviders";
import MainStackNavigator from "./navigation/MainStackNavigator";

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

export default function App() {

    const [appIsReady, setAppIsReady] = useState(false);

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
                onError={() => {}}
            />
        );
    }

    return (
        <AuthContextProviders>
            <NavigationContainer theme={ColorTheme}>
                <StatusBar style={'black'} backgroundColor={'#fff'}/>
                <MainStackNavigator />
            </NavigationContainer>
        </AuthContextProviders>
    );
}
