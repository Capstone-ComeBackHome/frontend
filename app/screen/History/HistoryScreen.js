import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    ImageBackground, Platform, Alert, Text, Button
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Calendar} from "react-native-calendars";

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';

const HistoryScreen = ({navigation, userInfo}) => {
    const {colors} = useTheme();

    return (
        <ScreenContainer>
            <View style={{
                backgroundColor: colors.mainColor,
                paddingVertical: 20,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
            }}>
                <ScreenContainerView>
                    <AppText style={{color: "#fff", fontSize: 20, fontWeight : '700'}}>{userInfo.name + ' 님의 AI 진료 내역'}</AppText>
                </ScreenContainerView>
            </View>
            <ScreenContainerView>
                <Button title={"임시 이동 버튼"} onPress={() => {navigation.navigate('DiagnosisTop3')}}/>
            </ScreenContainerView>
        </ScreenContainer>
    );
}


export default HistoryScreen;