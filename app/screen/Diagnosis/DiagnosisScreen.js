import React, {useState, useEffect, useContext} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import {List} from 'react-native-paper';
import {AuthContext} from "../../context/AuthContextProviders";

const AccordionView = ({yearMonth, monthlyDiagnoses}) => {
    const {colors} = useTheme();

    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(state => !state);
    const [year, month] = yearMonth.split('-');

    return (
        <List.Section>
            <List.Accordion
                title={`${year}년 ${month}월`}
                titleStyle={{color: colors.mainColor, fontSize: 16, fontWeight: '700'}}
                theme={{colors: {text: colors.mainColor, primary: '#53B3EE'}}}
                expanded={expanded}
                onPress={handlePress}
                style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 0,
                    borderBottomColor: colors.mainColor,
                    borderBottomWidth: 1
                }}>
                {
                    Object.entries(monthlyDiagnoses).map(([day, dailyDiagnosis], index) =>
                        <DiseaseScrollHorizontal key={index} day={day} dailyDiagnosis={dailyDiagnosis}/>
                    )
                }
            </List.Accordion>
        </List.Section>
    )
}

const DiagnosisScreen = ({navigation, userInfo}) => {
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
                    console.log(res.data.diagnosisResponseList);
                    res.data.diagnosisResponseList.forEach(({diagnosisId, createdDate, diseaseNameList}) => {
                        let dateObj = new Date(createdDate.substring(0,19) + '+00:00');
                        let timeString = dateObj.toLocaleString("ko-KR").split('.')[3];

                        const yearMonth = createdDate.substring(0, 7);
                        const date = createdDate.substring(8,10);
                        const time = timeString.substring(1);
                        const data = {
                            diagnosisId,
                            time,
                            diseaseNameList
                        }

                        if (yearMonth in diagnosisData) {
                            if(date in diagnosisData[yearMonth]){
                                diagnosisData[yearMonth][date].push(data);
                            }else{
                                diagnosisData[yearMonth][date] = [data];
                            }
                        } else {
                            diagnosisData[yearMonth] = {};
                            diagnosisData[yearMonth][date] = [data];
                        }
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
                <ScreenContainerView style={{height: 101, marginBottom: 23,}}>
                    <AppText style={{
                        marginTop: 70,
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: '700',
                    }}>{userInfo.name + ' 님의 AI 진료 내역'}</AppText>
                </ScreenContainerView>
            </View>
            <ScrollView>
                <ScreenContainerView>
                    <View style={{marginVertical: 30}}>
                        {
                            diagnoses && Object.entries(diagnoses).map(([yearMonth, monthlyDiagnoses], index) =>
                                <AccordionView key={index} yearMonth={yearMonth} monthlyDiagnoses={monthlyDiagnoses}/>
                            )
                        }
                    </View>
                </ScreenContainerView>

            </ScrollView>

        </ScreenContainer>
    );
}

const DiseaseScrollHorizontal = ({day, dailyDiagnosis}) => {
    const navigation = useNavigation();
    const {colors} = useTheme();
    const styles = StyleSheet.create({
        item: {
            backgroundColor: 'rgba(75, 155, 204, 0.05)',
            borderRadius: 10,
            width: 283,
            marginRight: 8,
            padding : 22
        },
        smallBorder: {
            borderRadius: 5,
            backgroundColor: "#53B3EE",
            width: 60,
            height: 17,
            justifyContent: "center",
            alignItems: "center"
        },
        smallText: {
            color: "#ffffff",
            fontSize: 11,
            fontWeight: '700',
        },
        time: {
            fontSize: 14,
            fontWeight: '700',
        },
        day: {
            fontSize: 16,
            fontWeight: '700',
        },
        dayCnt: {
            marginLeft: 16,
            fontSize: 14,
            fontWeight: '700',
            color: "rgba(48, 48, 48, 0.3)"
        },
        diseaseName : {
            fontSize: 20,
            fontWeight: '700',
            marginVertical : 13
        },
        otherText : {
            fontSize: 13,
            color: colors.black[2],
            fontWeight: '700',
        }
    })

    const Item = ({diagnosis}) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DiagnosisTop3', {diseaseList : diagnosis.diseaseNameList})}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <AppText style={styles.time}>{diagnosis.time}</AppText>
                {/*<View style={{flexDirection: "row"}}>*/}
                {/*    <View style={styles.smallBorder}><AppText style={styles.smallText}>"11"</AppText></View>*/}
                {/*    <View style={{marginLeft: 8}}/>*/}
                {/*    <View style={styles.smallBorder}><AppText style={styles.smallText}>"11"</AppText></View>*/}
                {/*</View>*/}
            </View>
            <AppText style={styles.diseaseName}>{diagnosis.diseaseNameList[0]}</AppText>
            <View style={{
                height: 1,
                backgroundColor: colors.black[2],
                marginVertical : 10
            }}/>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <AppText style={styles.otherText}>다른 진료결과</AppText>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <AppText style={styles.otherText}>{diagnosis.diseaseNameList[1]}, </AppText>
                    <AppText style={styles.otherText}>{diagnosis.diseaseNameList[2]}</AppText>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{marginVertical: 16}}>
            <View style={{flexDirection: "row", alignItems : 'center', marginVertical: 10}}>
                <AppText style={styles.day}>{day}일</AppText>
                <AppText style={styles.dayCnt}>진단 {dailyDiagnosis.length}회</AppText>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    dailyDiagnosis.map((diagnosis, index) => <Item key={index} diagnosis={diagnosis}/>)
                }
            </ScrollView>
        </View>

    );
}

export default DiagnosisScreen;