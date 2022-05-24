import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import CustomButton from "../../component/CustomButton";
import * as SecureStore from 'expo-secure-store';
import {AuthContext} from "../../context/AuthContextProviders";


const ChatStartScreen = ({navigation}) => {
    const {colors} = useTheme();
    const [moveScreen, setMoveScreen] = useState('');
    const {state, dispatch} = useContext(AuthContext);

    useEffect(() => {
        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users/essential', {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then((res) => {
            if(res.result === 'SUCCESS'){
                if (res.data.age === 0) { // 처음인지 확인
                    setMoveScreen('ChatBasicInfo');
                } else {
                    setMoveScreen('Chat');
                }
            }
        }).catch(err => console.error(err))
    }, [])

    return (
        <ScreenContainer backgroundColor={colors.mainColor}>
            <ScreenContainerView flex={1} style={{alignItems: 'center', justifyContent: 'center'}}>
                <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 40}}>
                    <AppText style={styles.infoText}>안녕하세요?</AppText>
                    <AppText style={styles.infoText}>Apzima는 채팅으로 병을 분석하는</AppText>
                    <AppText style={styles.infoText}>의료 AI 챗봇입니다.</AppText>
                    <AppText style={{...styles.infoText, marginTop: 30}}>예상 소요시간은 12분이며</AppText>
                    <AppText style={styles.infoText}>중간에 뒤로가거나 화면을 나가게 되면</AppText>
                    <AppText style={styles.infoText}>기록이 저장되지 않습니다.</AppText>
                </View>
                <CustomButton disabled={moveScreen.length === 0}
                              title={'진료 시작하기'} buttonStyle={{backgroundColor: '#fff', width: '100%'}}
                              textStyle={{color: colors.mainColor}}
                              onPress={() => navigation.replace(moveScreen)}/>
            </ScreenContainerView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    infoText: {
        color: '#fff',
        fontSize: 18,
        marginVertical: 2
    }
})

export default ChatStartScreen;