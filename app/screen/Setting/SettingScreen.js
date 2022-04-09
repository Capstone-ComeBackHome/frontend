import React, {useState, useEffect} from 'react';
import {Button, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';

const SettingScreen = ({navigation}) => {
    const {colors} = useTheme();

    return (
        <ScreenContainer>
            <ScrollView>
                <ScreenContainerView>
                    <Button title={'기본 정보'} onPress={() => navigation.navigate('DefaultInfo')}/>
                    <Button title={'의료 정보'} onPress={() => navigation.navigate('MedicalInfo')}/>
                </ScreenContainerView>
            </ScrollView>
        </ScreenContainer>
    );
}


export default SettingScreen;