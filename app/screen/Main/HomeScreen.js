import React, {useState, useEffect, useContext} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View,Button} from "react-native";
import {useTheme} from '@react-navigation/native';

import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import CustomButton from '../../component/CustomButton';
import AppText from "../../component/AppText";
import ScreenDivideLine from "../../component/ScreenDivideLine";

import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import mainBanner from '../../assets/images/main/banner.jpg';
import score1 from '../../assets/images/disease/score1.png';
import score2 from '../../assets/images/disease/score2.png';
import score3 from '../../assets/images/disease/score3.png';
import score4 from '../../assets/images/disease/score4.png';
import score5 from '../../assets/images/disease/score5.png';
import {AuthContext} from "../../context/AuthContextProviders";


const HomeScreen = ({navigation, userInfo}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);
    const [diagnoses, setDiagnoses] = useState({});

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/diagnoses', {
                headers: {
                    Authorization: `Bearer ${state.userToken.accessToken}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(response => response.json()).then((res) => {
                if (res.result === 'SUCCESS') {
                    const diagnosisData = {};
                    res.data.diagnosisResponseList.forEach(({diagnosisId, createdDate, diseaseNameList}) => {
                        let date = new Date(createdDate);
                        date.setTime(date.getTime() + 9 * 60 * 60 * 1000);
                        console.log(date.toLocaleString("ko-KR"));
                        // let timeString = dateObj.toLocaleString("ko-KR").split('.')[3];
                        // console.log(timeString);
                        // const yearMonth = createdDate.substring(0, 7);
                        // const date = createdDate.substring(8,10);
                        // const time = timeString.substring(1);
                        // const data = {
                        //     diagnosisId,
                        //     time,
                        //     diseaseNameList
                        // }
                        //
                        // if (yearMonth in diagnosisData) {
                        //     if(date in diagnosisData[yearMonth]){
                        //         diagnosisData[yearMonth][date].push(data);
                        //     }else{
                        //         diagnosisData[yearMonth][date] = [data];
                        //     }
                        // } else {
                        //     diagnosisData[yearMonth] = {};
                        //     diagnosisData[yearMonth][date] = [data];
                        // }
                    })

                    setDiagnoses(diagnosisData);
                }
            }).catch(err => console.error(err))
        })

        return unsubscribe;
    }, [navigation])

    return (
        <ScreenContainer>
            <View style={{
                backgroundColor: colors.mainColor,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
            }}>
                <ScreenContainerView style={{height: 101, marginBottom: 23, paddingTop : 70, justifyContent: 'space-between', flexDirection : 'row', alignItems: 'center'}}>
                    <AppText style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: '700'
                    }}>{userInfo.name} 님</AppText>
                </ScreenContainerView>
            </View>
            <ScrollView>
                <ScreenContainerView style={{marginVertical: 10}}>
                    <AppText style={{color: colors.mainColor, fontSize: 18, marginVertical: 20, fontWeight : '700'}}>AI 진료실</AppText>
                    <View style={{alignItems: 'center'}}>
                        <Image source={mainBanner} style={{width : '100%', borderRadius : 10}}/>
                        <CustomButton title={"AI 진료받기"}
                                      buttonStyle={{position: 'absolute', width: '90%', bottom: 10}}
                                      onPress={() => navigation.navigate('ChatStart')}
                        />
                    </View>
                </ScreenContainerView>
                <ScreenDivideLine/>
                <ScreenContainerView>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        {/* 안드로이드의 경우 화면 전환시 너무 안이쁜데요?*/}
                        <AppText style={{color: colors.mainColor, fontSize: 18, fontWeight : '700'}}>최근 진단 내역</AppText>
                    </View>
                    <TouchableOpacity style={{backgroundColor : colors.blue[4], borderRadius : 10, padding : 20, marginVertical : 20}}>
                        <View style={{flexDirection : "row", alignItems : "flex-start", justifyContent : "space-between"}}>
                            <View style={{flexDirection : "row", alignItems : 'center'}}>
                                <AppText style={{fontSize : 18, fontWeight : '600'}}>부정맥</AppText>
                                <MaterialIcons name="keyboard-arrow-right" size={32} color={colors.blue[1]}/>
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <AppText>5월 13일 금요일</AppText>
                                <AppText>오후 9:10</AppText>
                            </View>
                        </View>
                        <View style={{width : '100%', height : 2, backgroundColor : colors.black[3], marginTop : 20, marginBottom : 8}}></View>
                        <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                            <AppText style={{color : colors.black[2]}}>다른 진료 결과</AppText>
                            <AppText style={{color : colors.black[2]}}>여드름, 홍조</AppText>
                        </View>
                    </TouchableOpacity>
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
    }
})

export default HomeScreen;