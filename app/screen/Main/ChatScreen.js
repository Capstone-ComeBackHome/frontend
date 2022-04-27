import React, {useState, useEffect} from 'react';
import {Button, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";

const ChatScreen = ({navigation}) => {
    const {colors} = useTheme();

    return (
        <ScreenContainer>
            <NavigationTop title={"채팅"}/>
            <ScrollView>
                <ScreenContainerView>
                    <AppText>Chat screen</AppText>
                    <Button title={'go to chat result'} onPress={() => {navigation.navigate('Main', {screen : 'ChatResult'})}}/>
                </ScreenContainerView>
            </ScrollView>
        </ScreenContainer>
    );
}


export default ChatScreen;