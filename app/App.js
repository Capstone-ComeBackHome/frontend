import React, {useEffect, useState, useCallback} from "react";
import {View} from 'react-native';
import {DefaultTheme, NavigationContainer, useTheme} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {StatusBar} from "expo-status-bar";

import AppContextProviders from "./context/AppContextProviders";
import AppStackNavigator from "./navigation/AppStackNavigator";

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
            3: 'rgba(83,179,238,0.5)'
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

    function prepare() {

        const splashHidePromise = SplashScreen.preventAutoHideAsync();

        // Pre-load fonts, make any API calls you need to do here
        const fontPromise = Font.loadAsync({
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

        Promise.all([splashHidePromise, fontPromise])
            .then(() =>
                setAppIsReady(true)
            ).catch(error => {
            prepare();
        })
    }

    // 폰트 불러오기
    useEffect(() => {
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View
            flex={1}
            onLayout={onLayoutRootView}>
            <AppContextProviders>
                <NavigationContainer theme={ColorTheme}>
                    <StatusBar style={'black'} backgroundColor={'#fff'}/>
                    <AppStackNavigator/>
                </NavigationContainer>
            </AppContextProviders>
        </View>
    );
}
