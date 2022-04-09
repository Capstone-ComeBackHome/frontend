import React, {useEffect} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import AppText from './AppText';
import BackIcon from '../assets/images/back-icon.svg';
import {StatusBar} from "expo-status-bar";
// ** customize 한 스택 네비게이션 헤더 입니다.
// ** props 로 navigation(navigation 객체), title(String) 을 받습니다.

const NavigationTop = props => {
    const {colors} = useTheme();
    const navigation = useNavigation();

    useEffect(() => {

    }, [])
    return (
        <>

            <View style={{
                backgroundColor: colors.mainColor,
                justifyContent: 'center',
                paddingVertical: 5,
            }}>
                <StatusBar style={Platform.OS === 'android' && "light"} backgroundColor={'rgba(83,179,238, 1.0)'} />
                <View flexDirection="row" style={{
                    marginHorizontal: 20,
                    marginVertical: 13,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{justifyContent: 'center', position: 'absolute', left: 0}}>
                        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
                            <BackIcon width={24} height={24} style={{color: '#fff'}}/>
                        </TouchableOpacity>
                    </View>
                    <AppText style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                        {props.title}
                    </AppText>
                </View>

            </View>
        </>

    );
};

export default NavigationTop;