import React, {useState, useEffect, useContext} from 'react';
import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import {AuthContext} from "../../context/AuthContextProviders";
import ChartIcon from "../../assets/images/bar-chart-alt.svg";

const SettingScreen = ({navigation, userInfo}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);
    return (
        <ScreenContainer>
            <View style={{
                backgroundColor: colors.mainColor,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
            }}>
                <ScreenContainerView style={{height: 101, marginBottom: 23, paddingTop : 70, justifyContent: 'space-between', flexDirection : 'row', alignItems: 'center'}}>
                    <AppText style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: '700'
                    }}>{userInfo.name} 님</AppText>
                </ScreenContainerView>
            </View>
            <ScreenContainerView>
                <View style={{marginVertical: 10}}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginVertical: 20
                    }}>
                        <AppText style={styles.title}>소셜 로그인 정보</AppText>
                        <Button title={'로그아웃'} onPress={() =>
                            fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/logout', {
                                method: 'POST',
                                headers: {
                                    Authorization: `Bearer ${state.userToken.accessToken}`,
                                    refreshToken: `Bearer ${state.userToken.refreshToken}`,
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json; charset=UTF-8'
                                }
                            }).then(response => response.json()).then((res) => {
                                if (res.result === 'SUCCESS') {
                                    dispatch({type: 'SIGN_OUT'});
                                }
                            }).catch(err => console.error(err))
                        }/>
                    </View>
                    <View styles={{flexDirection: 'row', alignItems: 'center', marginVertical: 20}}>
                        <AppText style={styles.infoText}>{userInfo.authProvider}</AppText>
                        <AppText style={styles.infoText}>{'(' + userInfo.email + ')'}</AppText>
                    </View>
                </View>
                <View style={{width: '100%', height: 2, backgroundColor: colors.mainColor, marginVertical: 20}}/>
                <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('DefaultInfo')}>
                    <AppText style={{...styles.title, flex : 1}}>사용자 정보</AppText>
                    <Icon type="ionicon" name={'chevron-forward-outline'} size={26} color={colors.mainColor}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('MedicalInfo')}>
                    <AppText style={{...styles.title, flex : 1}}>의료 정보</AppText>
                    <Icon type="ionicon" name={'chevron-forward-outline'} size={26} color={colors.mainColor}/>
                </TouchableOpacity>
                {/*<TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('MedicalInfo')}>*/}
                {/*    <AppText style={{...styles.title, flex : 1}}>이용약관 정보</AppText>*/}
                {/*    <Icon type="ionicon" name={'chevron-forward-outline'} size={26} color={colors.mainColor}/>*/}
                {/*</TouchableOpacity>*/}
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
    },
    menu: {
        justifyContent: 'center',
        marginVertical: 20,
        flexDirection: 'row',
        width: '100%'
    }
})

export default SettingScreen;