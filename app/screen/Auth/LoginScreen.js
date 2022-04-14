import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {WebView} from 'react-native-webview';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';

import KakaoLogo from '../../assets/images/login/kakaotalk.svg';
import NaverLogo from '../../assets/images/login/naver.svg';
import GoogleLogo from '../../assets/images/login/google.svg';


const LoginScreen = ({navigation}) => {
    const {colors} = useTheme();

    const styles = StyleSheet.create({
        loginText: {
            textAlign: 'center',
            paddingVertical: 14,
            paddingHorizontal: 10,
            fontSize: 16,
            fontWeight: '700',
            flex: 1
        },
        socialLoginBtnContainer: {
            borderStyle: 'solid',
            borderColor: colors.black[3],
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 8,
            // shadowOffset: {
            //     width: 6,
            //     height: 6
            // },
            // shadowOpacity: 0.8,
            // shadowColor: 'rgba(203, 180, 180, 0.3)',
        },
        socialLoginBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: 10
        },
        socialLoginBtnTxt: {
            color: colors.blue[1],
            fontSize: 25,
            fontWeight: "700",
        },
        buttonLogo: {
            position: "absolute",
            marginLeft: 20
        }
    });

    const loginKakao = () => {

    }

    return (
        <ScreenContainer>
            <ScreenContainerView flex={1}>
                <View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('HomeTab')}>
                        <AppText style={{color: colors.blue[1]}}>둘러보기</AppText>
                    </TouchableOpacity>
                </View>
                <View flex={1} style={{justifyContent: 'center'}}>
                    <View style={{height: '60%', justifyContent: 'space-between'}}>
                        <View>
                            <AppText style={styles.socialLoginBtnTxt}>간편하게 로그인하고</AppText>
                            <AppText style={styles.socialLoginBtnTxt}>아프지마</AppText>
                        </View>
                        <View>
                            <View style={styles.socialLoginBtnContainer}>
                                <TouchableOpacity style={{
                                    ...styles.socialLoginBtn,
                                    backgroundColor: '#FEE500'
                                }} activeOpacity={0.8} onPress={() => {
                                    navigation.navigate('KakaoWebview')
                                }}>
                                    <KakaoLogo style={styles.buttonLogo} width={23} height={23}/>
                                    <AppText style={{...styles.loginText, color: colors.defaultColor}}>카카오로 로그인</AppText>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.socialLoginBtnContainer}>
                                <TouchableOpacity style={{
                                    ...styles.socialLoginBtn,
                                    backgroundColor: '#03c75a'
                                }} activeOpacity={0.8} onPress={() => navigation.navigate('NaverWebview')}>
                                    <NaverLogo style={styles.buttonLogo} width={20} height={20}/>
                                    <AppText style={{...styles.loginText, color: '#fff'}}>네이버로 로그인</AppText>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.socialLoginBtnContainer}>
                                <TouchableOpacity style={{
                                    ...styles.socialLoginBtn,
                                    backgroundColor: '#fff'
                                }} activeOpacity={0.8} onPress={() => navigation.navigate('GoogleWebview')}>
                                    <GoogleLogo style={styles.buttonLogo} width={20} height={20}/>
                                    <AppText style={{...styles.loginText, color: colors.defaultColor}}>Google로 로그인</AppText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScreenContainerView>
        </ScreenContainer>
    );
}


export default LoginScreen;