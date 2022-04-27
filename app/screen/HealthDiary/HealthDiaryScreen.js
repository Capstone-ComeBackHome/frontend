import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    ImageBackground, Platform, Alert, Text, Button,
    SafeAreaView
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Calendar} from "react-native-calendars";

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import score1 from "../../assets/images/disease/score1.png";
import CustomButton from "../../component/CustomButton";

const HealthDiaryScreen = ({navigation, userInfo}) => {
    const {colors} = useTheme();

    return (
        <ScreenContainer>
            <View style={{
                backgroundColor: colors.mainColor,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
            }}>
                <ScreenContainerView style={{height : 101,marginBottom : 23,}}>
                    <AppText style={{marginTop : 70,color: "#fff", fontSize: 20, fontWeight : '700'}}>{userInfo.name + ' 님의 건강일기'}</AppText>
                </ScreenContainerView>
            </View>
            <ScrollView>
                <ScreenContainerView>
                    <View style={{
                        backgroundColor: colors.blue[4],
                        width: '100%',
                        borderRadius: 10,
                        padding: 20,
                        marginBottom : 20
                    }}>
                        <AppText style={{fontWeight: '700', fontSize: 20, paddingBottom: 20}}>13일</AppText>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={score1} style={{marginRight: 20}}/>
                            <View flex={1}>
                                <View style={{flexDirection: 'row', flexWrap : 'wrap', marginBottom : 20}}>
                                    <View style={styles.diseaseTag}><AppText
                                        style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                    <View style={styles.diseaseTag}><AppText
                                        style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                    <View style={styles.diseaseTag}><AppText
                                        style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                    <View style={styles.diseaseTag}><AppText
                                        style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                    <View style={styles.diseaseTag}><AppText
                                        style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                </View>
                                <View>
                                    <AppText>오늘은 적당히 아파요</AppText>
                                </View>
                            </View>
                        </View>
                    </View>
                    <CustomButton title={"건강일기 쓰기"} onPress={() => navigation.navigate('HealthDiaryCreate')}/>
                </ScreenContainerView>
            </ScrollView>

        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#fff',
        width: 300,
        height: '20%'
    },
    diseaseTag: {
        borderRadius: 6,
        backgroundColor: '#13540f',
        height: 24,
        width: 60,
        alignItems: "center",
        justifyContent: 'center',
        marginRight : 10,
        marginBottom : 6
    }
})
export default HealthDiaryScreen;
