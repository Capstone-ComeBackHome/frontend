import React, {useState, useEffect} from 'react';
import {Button, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';

const RegisterScreen = ({navigation}) => {

    return (
        <ScreenContainer>
            <ScrollView>
                <ScreenContainerView>
                    <Button title={'go to login'} onPress={() => {navigation.navigate('Auth', {screen : 'Login'})}}/>
                    <Button title={'go to main'} onPress={() => {navigation.navigate('Main')}}/>
                </ScreenContainerView>
            </ScrollView>
        </ScreenContainer>
    );
}


export default RegisterScreen;