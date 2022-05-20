import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import CustomButton from "../../component/CustomButton";


const ChatResultScreen = ({route, navigation}) => {
    const {colors} = useTheme();
    const {diseaseList} = route.params;

    return (
        <ScreenContainer>
            <NavigationTop title={"AI 분석 결과"}/>
            <ScreenContainerView flex={1} style={{alignItems: 'center', justifyContent: 'center'}}>
                <View style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <CustomButton buttonStyle={{...styles.buttonStyle, backgroundColor: colors.blue[2]}}
                                  textStyle={styles.textStyle}
                                  onPress={() => navigation.navigate('Main', {
                                      screen: 'DiseaseInfo',
                                      params: {disease: '부정맥'}
                                  })}>
                        <View style={{alignItems: 'flex-start', width: 200}}>
                            <AppText style={{fontSize: 20}}>부정맥</AppText>
                            <AppText>의심이 됩니다.</AppText>
                        </View>
                    </CustomButton>
                    <CustomButton buttonStyle={{...styles.buttonStyle, backgroundColor: colors.blue[3]}}
                                  textStyle={styles.textStyle}
                                  onPress={() => navigation.navigate('Main', {
                                      screen: 'DiseaseInfo',
                                      params: {disease: '두통'}
                                  })}>
                        <View style={{alignItems: 'flex-start', width: 200}}>
                            <AppText style={{fontSize: 20}}>두통</AppText>
                            <AppText>의심이 됩니다.</AppText>
                        </View>
                    </CustomButton>
                    <CustomButton buttonStyle={{...styles.buttonStyle, backgroundColor: colors.blue[4]}}
                                  textStyle={styles.textStyle}
                                  onPress={() => navigation.navigate('Main', {
                                      screen: 'DiseaseInfo',
                                      params: {disease: '복통'}
                                  })}>
                        <View style={{alignItems: 'flex-start', width: 200}}>
                            <AppText style={{fontSize: 20}}>복통</AppText>
                            <AppText>의심이 됩니다.</AppText>
                        </View>
                    </CustomButton>
                </View>
            </ScreenContainerView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: 300,
        height: '30%',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    textStyle: {
        fontSize: 18,
    }
})

export default ChatResultScreen;