import React, {useEffect} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import AppText from './AppText';
import BackIcon from '../assets/images/back-icon.svg';
import {StatusBar} from "expo-status-bar";
// ** customize 한 스택 네비게이션 헤더 입니다.
// ** props 로 navigation(navigation 객체), title(String) 을 받습니다.

const NavigationTop = ({title, backgroundColor, textColor}) => {
    const {colors} = useTheme();
    const navigation = useNavigation();

    return (
        <>

            <View style={{
                backgroundColor: backgroundColor ? backgroundColor :colors.mainColor,
                justifyContent: 'center',
                paddingVertical: 8,
            }}>
                <StatusBar style={Platform.OS === 'android' && "light"} backgroundColor={'rgba(83,179,238, 1.0)'}/>
                <View flexDirection="row" style={{
                    marginHorizontal: 20,
                    marginVertical: 13,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{justifyContent: 'center', position: 'absolute', left: 0}}>
                        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
                            <BackIcon width={24} height={24} style={{color: textColor ? textColor : '#fff'}}/>
                        </TouchableOpacity>
                    </View>
                    <AppText style={{color: textColor ? textColor : '#fff', fontSize: 18, fontWeight: 'bold'}}>
                        {title}
                    </AppText>
                </View>

            </View>
        </>

    );
};

export default NavigationTop;