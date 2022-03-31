import React, {useState, useEffect} from 'react';
import {Button, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';

const LoginScreen = ({navigation}) => {
    const {colors} = useTheme();

    return (
        <ScreenContainer>
            <ScrollView>
                <ScreenContainerView>
                    <AppText>Login screen</AppText>
                    <Button title={'go to register'} onPress={() => {navigation.navigate('Auth', {screen : 'Register'})}}/>
                    <Button title={'go to main'} onPress={() => {navigation.navigate('Main')}}/>
                </ScreenContainerView>
            </ScrollView>
        </ScreenContainer>
    );
}


export default LoginScreen;