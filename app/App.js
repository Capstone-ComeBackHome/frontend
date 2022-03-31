import React, {useEffect, useState, useCallback} from "react";
import {Platform, View, StatusBar} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import AppContextProviders from "./context/AppContextProviders";
import AppStackNavigator from "./navigation/AppStackNavigator";

// 자주 사용하는 색 지정
const ColorTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        mainColor : '#606A77',
        backgroundColor : '#FDF6EC',
        beige : {
            1 : '#FDF6EC',
            2 : '#E3DBD0',
            3 : '#CAC1B4',
            4 : '#B0A79A',
            5 : '#978E81',
            6 : '#7E7569'
        },
        brown : {
            1 : '#FFFBF6',
            2 : '#FFEBD0',
            3 : '#FCD8A7',
            4 : '#DAB88B',
            5 : '#B89970',
            6 : '#967B58',
            7 : '#745E41',
            8 : '#52412C'
        },
        blue : {
            1 : '#FDFEFF',
            2 : '#EBF3FF',
            3 : '#D4DEEC',
            4 : '#B5C0CE',
            5 : '#97A2B1',
            6 : '#7B8694',
            7 : '#606A77',
            8 : '#464F5A'
        },
        gray : {
            1 : '#818792',
            2 : '#90969F',
            3 : '#9DA2AB',
            4 : '#AFB3BB',
            5 : '#BABFC8',
            6 : '#C9CFD9',
            7 : '#BDC2CA',
            8 : '#929292',
            9 : '#C4C4C4'
        }
    }
};

export default function App() {

    const [appIsReady, setAppIsReady] = useState(false);

    // 폰트 불러오기
    useEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();

                // Pre-load fonts, make any API calls you need to do here
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

                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

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
            style={{ flex: 1, backgroundColor: "pink"}}
            onLayout={onLayoutRootView}>
            <AppContextProviders>
                <NavigationContainer theme={ColorTheme}>
                    {Platform.OS === 'ios' && <StatusBar barStyle={'dark-content'} />}
                    <AppStackNavigator/>
                </NavigationContainer>
            </AppContextProviders>
        </View>
    );
}
