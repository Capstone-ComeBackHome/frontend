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
import {Calendar} from "react-native-calendars";

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';

const CalenderScreen = ({navigation}) => {
    const {colors} = useTheme();

    return (
        <ScreenContainer>
            <ScrollView>
                <ScreenContainerView>
                    <Calendar
                        // Initially visible month. Default = Date()
                        current={'2022-03-01'}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        minDate={'2012-01-01'}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={'2030-12-31'}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={day => {
                            console.log('selected day', day);
                        }}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'yyyy MM'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={month => {
                            console.log('month changed', month);
                        }}
                        // Hide month navigation arrows. Default = false
                        hideArrows={false}
                        // Do not show days of other months in month page. Default = false
                        hideExtraDays={true}
                        // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                        disableMonthChange={true}
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                        firstDay={1}
                    />
                </ScreenContainerView>
            </ScrollView>
        </ScreenContainer>
    );
}


export default CalenderScreen;