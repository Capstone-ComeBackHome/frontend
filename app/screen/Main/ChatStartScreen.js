import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import CustomButton from "../../component/CustomButton";
import * as SecureStore from 'expo-secure-store';

const checkIsFirst = async (navigation) => {
    const token = await SecureStore.getItemAsync('token');
    const {accessToken, refreshToken} = JSON.parse(token);
    fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users', {
        headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => response.json()).then((data) => {
        console.log(data);
    }).catch(err => console.error(err))
    navigation.navigate('Chat');
}

const ChatStartScreen = ({navigation}) => {
    const {colors} = useTheme();

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
                <CustomButton title={'진료 시작하기'} buttonStyle={{backgroundColor: '#fff', width: '100%'}}
                              textStyle={{color: colors.mainColor}}
                              onPress={() => checkIsFirst(navigation)}/>

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