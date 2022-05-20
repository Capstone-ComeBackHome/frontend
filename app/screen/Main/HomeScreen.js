import React, {useState, useEffect} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View,Button} from "react-native";
import {useTheme} from '@react-navigation/native';

import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import CustomButton from '../../component/CustomButton';
import AppText from "../../component/AppText";
import ScreenDivideLine from "../../component/ScreenDivideLine";

import { AntDesign } from '@expo/vector-icons';
import mainBanner from '../../assets/images/main/banner.jpg';
import score1 from '../../assets/images/disease/score1.png';
import score2 from '../../assets/images/disease/score2.png';
import score3 from '../../assets/images/disease/score3.png';
import score4 from '../../assets/images/disease/score4.png';
import score5 from '../../assets/images/disease/score5.png';


const HomeScreen = ({navigation, userInfo}) => {
    const {colors} = useTheme();
    const [userName, setUserName] = useState('오다혜');

    useEffect(() => {
        // 사용자 정보 가져오기
    }, [])

    return (
        <ScreenContainer>
            <View style={{
                backgroundColor: colors.mainColor,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
            }}>
                <ScreenContainerView style={{height : 101 ,marginBottom : 23,}}>
                    <AppText style={{marginTop : 70,color: "#fff", fontSize: 20, fontWeight : '700'}}>{userInfo.name + ' 님'}</AppText>
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
                        {/*<TouchableOpacity onPress={() => navigation.navigate('HealthDiary')}>*/}
                        {/*    <AntDesign name="plus" size={16} color="#53B3EE"/>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                    <View style={{alignItems: 'center',marginTop:18}}>


                    </View>
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