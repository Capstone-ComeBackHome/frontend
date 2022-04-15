import React, {useState, useEffect, useContext} from 'react';
import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import {AuthContext} from "../../context/AppContextProviders";

const SettingScreen = ({navigation, userInfo}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);
    return (
        <ScreenContainer>
            <View style={{
                backgroundColor: colors.mainColor,
                paddingVertical: 20,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
            }}>
                <ScreenContainerView>
                    <AppText style={{color: "#fff", fontSize: 20}}>{userInfo.name + ' 님'}</AppText>
                </ScreenContainerView>
            </View>
            <ScreenContainerView>
                <View style={{marginVertical : 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical : 20}}>
                        <AppText style={styles.title}>소셜 로그인 정보</AppText>
                        <Button title={'로그아웃'} onPress={() => dispatch({type: 'SIGN_OUT'})}/>
                    </View>
                    <View styles={{flexDirection : 'row', alignItems: 'center', marginVertical : 20}}>
                        <AppText style={styles.infoText}>{userInfo.authProvider}</AppText>
                        <AppText style={styles.infoText}>{'(' + userInfo.email + ')'}</AppText>
                    </View>
                </View>
                <View style={{width : '100%', height : 2, backgroundColor : colors.mainColor, marginVertical : 20}}/>
                <TouchableOpacity style={{justifyContent : 'center', marginVertical : 20}} onPress={() => navigation.navigate('DefaultInfo')}>
                    <AppText style={styles.title}>사용자 정보</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent : 'center', marginVertical : 20}} onPress={() => navigation.navigate('MedicalInfo')}>
                    <AppText style={styles.title}>의료 정보</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent : 'center', marginVertical : 20}} onPress={() => navigation.navigate('MedicalInfo')}>
                    <AppText style={styles.title}>이용약관 정보</AppText>
                </TouchableOpacity>
            </ScreenContainerView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '700',
        fontSize: 18
    },
    infoText: {
        fontSize: 18
    }
})

export default SettingScreen;