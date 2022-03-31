import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from "react-native";
import {useTheme} from '@react-navigation/native';

import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import CustomButton from '../../component/CustomButton';

const HomeScreen = ({navigation}) => {
    const {colors} = useTheme();

    return (
        <ScreenContainer>
            <ScreenContainerView flex={1} style={{alignItems: 'center', justifyContent: 'center'}}>
                <View style={{height: '70%', alignItems: 'center', justifyContent: 'space-around'}}>
                    <CustomButton buttonStyle={styles.buttonStyle} textStyle={styles.textStyle}
                                  onPress={() => navigation.navigate('Main', {screen: 'Chat'})}>AI 진료</CustomButton>
                    <CustomButton buttonStyle={styles.buttonStyle} textStyle={styles.textStyle}
                                  onPress={() => navigation.navigate('HomeTab', {screen: 'Calender'})}>아픔 캘린더</CustomButton>
                    <CustomButton buttonStyle={styles.buttonStyle} textStyle={styles.textStyle}
                                  onPress={() => navigation.navigate('HomeTab', {screen: 'Setting'})}>설정</CustomButton>
                </View>
            </ScreenContainerView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#fff',
        width: 300,
        height: '20%'
    },
    textStyle: {
        fontSize: 18,
    }
})

export default HomeScreen;