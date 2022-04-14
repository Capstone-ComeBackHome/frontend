import React, {useState, useEffect, useContext} from 'react';
import {Button, ScrollView, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import {AuthContext} from "../../context/AppContextProviders";

const SettingScreen = ({navigation}) => {
    const {colors} = useTheme();
    const [userName, setUserName] = useState('오다혜');
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
                    <AppText style={{color: "#fff", fontSize: 20}}>{userName + ' 님'}</AppText>
                </ScreenContainerView>
            </View>
            <ScreenContainerView>
                <Button title={'로그아웃'} onPress={() => {
                    dispatch({type: 'SIGN_OUT'})
                }}/>
                <Button title={'기본 정보'} onPress={() => navigation.navigate('DefaultInfo')}/>
                <Button title={'의료 정보'} onPress={() => navigation.navigate('MedicalInfo')}/>
            </ScreenContainerView>
        </ScreenContainer>
    );
}


export default SettingScreen;