import React, {useState, useEffect, useContext} from 'react';
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
import CustomButton from "../../component/CustomButton";

import {List} from 'react-native-paper';

import score1 from '../../assets/images/disease/score1.png';
import score2 from '../../assets/images/disease/score2.png';
import score3 from '../../assets/images/disease/score3.png';
import score4 from '../../assets/images/disease/score4.png';
import score5 from '../../assets/images/disease/score5.png';
import {AuthContext} from "../../context/AuthContextProviders";

const AccordionView = ({title, dairyDatas}) => {
    const {colors} = useTheme();

    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(state => !state);
    const [year, month] = title.split('-');

    return (
        <List.Section>
            <List.Accordion
                title={`${year}년 ${month}월`}
                titleStyle={{color: colors.mainColor, fontSize: 16, fontWeight: '700'}}
                theme={{colors: {text: colors.mainColor, primary: '#53B3EE'}}}
                expanded={expanded}
                onPress={handlePress}
                style={{backgroundColor: 'rgba(243,251,255,0.84)', paddingHorizontal: 0}}>
                {
                    dairyDatas.map((diaryData, index) => {
                        return <DiaryData key={index} diaryData={diaryData}/>
                    })
                }
            </List.Accordion>
        </List.Section>
    )
}

const DiaryData = ({diaryData}) => {
    const {colors} = useTheme();
    const styles = StyleSheet.create({
        diseaseTag: {
            borderRadius: 6,
            backgroundColor: '#13540f',
            height: 24,
            width: 60,
            alignItems: "center",
            justifyContent: 'center',
            marginRight: 10,
            marginBottom: 6
        }
    })


    const Keyword = ({keyword}) => {
        return (
            <View style={styles.diseaseTag}>
                <AppText style={{color: '#fff', fontWeight: '700', fontSize : 12}}>{keyword}</AppText>
            </View>
        )
    }

    return (
        <View style={{
            backgroundColor: colors.blue[4],
            width: '100%',
            borderRadius: 10,
            padding: 20,
            marginVertical: 20
        }}>
            <AppText style={{fontWeight: '600', fontSize: 16, paddingBottom: 20}}>{diaryData.localDate}</AppText>
            <View style={{flexDirection: 'row'}}>
                <Image source={score1} style={{marginRight: 20}}/>
                <View flex={1}>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}}>
                        <Keyword keyword={"후두염"}/>
                        <Keyword keyword={"후두염"}/>
                        <Keyword keyword={"후두염"}/>
                        <Keyword keyword={"후두염"}/>
                        <Keyword keyword={"후두염"}/>
                    </View>
                    <View>
                        <AppText>오늘은 적당히 아파요</AppText>
                    </View>
                </View>
            </View>
        </View>
    )
}

const HealthDiaryScreen = ({navigation, userInfo}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);

    const [diaryDates, setDiaryDates] = useState([]);
    const [diaryList, setDiaryList] = useState([]);

    useEffect(() => {
        const lastTwelveMonths = [];
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        for (let i = 0; i < 12; i++) {
            const yearMonth = `${year}-${String(month).padStart(2, '0')}`;
            lastTwelveMonths.push(yearMonth);
            if (month === 1) {
                month = 12;
                year -= 1;
            } else {
                month--;
            }
        }
        setDiaryDates(lastTwelveMonths);

        // 수정해야될 것 같은데...
        const promises = lastTwelveMonths.map(yearMonth => {
            return fetch(`http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/calendars?yearMonth=${yearMonth}`, {
                headers: {
                    Authorization: `Bearer ${state.userToken.accessToken}`,
                }
            }).then(res => res.json())
        })


        Promise.all(promises).then(results => {
            const diaryList = results.map(result => result.data.simpleScheduleResponseList);
            setDiaryList(diaryList);
        })

    }, [])

    return (
        <ScreenContainer>
            <View style={{
                backgroundColor: colors.mainColor,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
            }}>
                <ScreenContainerView style={{height: 101, marginBottom: 23,}}>
                    <AppText style={{
                        marginTop: 70,
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: '700'
                    }}>{userInfo.name + ' 님의 건강일기'}</AppText>
                </ScreenContainerView>
            </View>
            <ScrollView>
                <ScreenContainerView style={{marginTop: 20}}>
                    {
                        diaryList && diaryList.map((diaryDatas, index) => {
                            //// 있는 것만 보여주기
                            // if(diaryDatas.length > 0){
                            //     return <AccordionView key={index} title={diaryDates[index]} dairyDatas={diaryDatas}/>
                            // }

                            return <AccordionView key={index} title={diaryDates[index]} dairyDatas={diaryDatas}/>
                        })
                    }
                </ScreenContainerView>
            </ScrollView>

            <ScreenContainerView style={{marginBottom: 25}}>
                <CustomButton title={"새로운 건강일기 쓰기"} onPress={() => navigation.navigate('HealthDiaryCreate')}/>
            </ScreenContainerView>
        </ScreenContainer>
    );
}


export default HealthDiaryScreen;
