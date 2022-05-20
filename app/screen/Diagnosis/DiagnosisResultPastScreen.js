import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import ScreenDivideLineLight from "../../component/ScreenDivideLineLight";
import {AuthContext} from "../../context/AuthContextProviders";

const DiagnosisResultPastScreen = ({navigation}) => {
    const {colors} = useTheme();
    const styles = StyleSheet.create({
        inputTitle: {
            color: colors.black,
            fontWeight: '700',
            fontSize: 16,
            paddingBottom: 21
        },
        otherText: {
            color: colors.mainColor,
            fontWeight: '700',
            fontSize: 16,
            paddingBottom: 21
        },
        textInput: {
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.mainColor,
            marginBottom: 6,
            paddingBottom: 11
        },
        submitBtn: {
            backgroundColor: colors.mainColor,
            height: 48,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })
    return (
        <ScreenContainer backgroundColor={colors.backgroundColor}>
            <NavigationTop navigation={navigation} title={"진단 결과"} />
            <ScreenContainerView flex={1} style={{marginTop: 31, justifyContent: 'space-between'}}>
                <ScrollView>
                    <View>
                        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                            <AppText style={styles.inputTitle}>부정맥</AppText>
                            <AppText style={styles.otherText}>이(가) 의심됩니다.</AppText>
                        </View>
                        <BlueDivideLine/>
                    </View>
                    <View style={{flexDirection: "column", marginTop: 24}}>
                        {/*space for disease info*/}
                        <DiseaseTouchable disease={"부정맥"} percentage={"100"}
                                          information={"너무 아프다. 진짜 너무 아프다 왜 아픈지 모르겠지만 진짜 너무너무 아프다"}
                                          department1={"저세상"}
                                          department2={"이승"}
                                          navigation={navigation}
                                          testDisease={"DiagnosisDetail"}
                        />
                    </View>
                    <ScreenDivideLineLight/>
                </ScrollView>
            </ScreenContainerView>
        </ScreenContainer>
    );
}
{/*height 1 보다는 2가 좀 더 이뻐보이는데...*/
}
const BlueDivideLine = (props) => {
    const {colors} = useTheme();

    return (

        <View style={{
            height: 1,
            backgroundColor: colors.blue[1],
            borderRadius: 1
        }}/>
    )
}

const DiseaseTouchable = ({disease, percentage, information, department1, department2,navigation,testDisease}) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "rgba(75, 155, 204, 0.05)",
            height: 250,
            borderRadius: 5,
            paddingHorizontal: 17.07,
        },
        titleText: {
            color: "#303030", fontSize: 16, fontWeight: '700'
        },
        nonTitleText: {},
        box: {
            flex: 1,
            height: 40,
            backgroundColor: "#53B3EE",
            borderRadius: 5,
            paddingLeft : 14.9,
            justifyContent: "center",

        },
        boxText:{
            color: "#FFFFFF", fontSize: 14, fontWeight: '700'
        }
    })
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(testDisease)}>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 24}}>
                <AppText style={styles.titleText}>{disease}</AppText>
                <AppText style={{color: "#53B3EE", fontWeight: '700'}}>{percentage}%</AppText>
            </View>
            <View style={{marginVertical: 16}}>
                <AppText style={styles.titleText}>정의</AppText>
                <AppText style={{
                    color: "#303030",
                    fontSize: 14,
                    fontWeight: '500',
                    marginTop: 8,
                    marginBottom: 16
                }}>{information}</AppText>
            </View>
            <View>
                <AppText style={styles.titleText}>진료과</AppText>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 8}}>
                    <View style={styles.box}>
                        <AppText style={styles.boxText}>{department1}</AppText>
                    </View>
                    <View style={{marginHorizontal : 4}}/>
                    <View style={styles.box}>
                        <AppText style={styles.boxText}>{department2}</AppText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
};

export default DiagnosisResultPastScreen;