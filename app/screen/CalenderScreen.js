import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    ImageBackground, Platform, Alert, Text
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

import AppText from '../component/AppText';
import ScreenContainer from '../component/ScreenContainer';
import ScreenContainerView from '../component/ScreenContainerView';

const CalenderScreen = ({navigation}) => {
    const {colors} = useTheme();

    return (
        <ScreenContainer backgroundColor={colors.backgroundColor}>
            <ScrollView>
                <ScreenContainerView>
                    <AppText>calender screen</AppText>
                </ScreenContainerView>
            </ScrollView>
        </ScreenContainer>
    );
}


export default CalenderScreen;