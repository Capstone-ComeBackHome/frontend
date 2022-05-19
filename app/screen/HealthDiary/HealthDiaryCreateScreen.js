import React, {useContext, useState} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import ScreenDivideLineLight from "../../component/ScreenDivideLineLight"
import CustomButton from '../../component/CustomButton';

{/*Images*/
}
import score1 from '../../assets/images/disease/score1.png';
import score2 from '../../assets/images/disease/score2.png';
import score3 from '../../assets/images/disease/score3.png';
import score4 from '../../assets/images/disease/score4.png';
import score5 from '../../assets/images/disease/score5.png';
import {MaterialIcons} from '@expo/vector-icons';
import {AuthContext} from "../../context/AuthContextProviders";
import CustomTextInput from "../../component/CustomTextInput";

const HealthDiaryCreateScreen = ({navigation}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [painType, setPainType] = useState(0);
    const [conditionState, setConditionState] = useState([
        {painType: 'GOOD', selected: true, color: '#7ACCB5', text: '괜찮아짐', image: score1},
        {painType: 'BETTER', selected: false, color: '#B1E5AA', text: '신경쓰임', image: score2},
        {painType: 'NORMAL', selected: false, color: '#F7BCD8', text: '아픔', image: score3},
        {painType: 'BAD', selected: false, color: '#FF7189', text: '너무 아픔', image: score4},
        {painType: 'WORST', selected: false, color: '#CE325B', text: '심한 고통', image: score5},
    ])
    const [memo, setMemo] = useState("");
    const [disease, setDisease] = useState([]);

    const changeConditionState = (index) => {
        setConditionState((state) => {
            const nextState = [...state];
            nextState[painType].selected = false;
            nextState[index].selected = true;
            setPainType(index);

            return nextState;
        });
    }

    const styles = StyleSheet.create({
        inputTitle: {
            color: colors.black[1],
            fontWeight: '700',
            fontSize: 16
        },
        inputBox: {
            marginTop: 17,
            height: 100,
            flex: 1,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#4B9BCC0D",
            borderColor: "#53B3EE",
            paddingVertical: 10,
            paddingHorizontal: 16,
        },
        item: {
            backgroundColor: '#7ACCB5',
            width: '49%',
            height: 47,
            marginVertical: 4,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
        },
        title: {
            fontSize: 14,
            color: "#FFFFFF",
        },

        // 컨디션 버튼
        container: {
            alignItems: "center",
            backgroundColor: '#ffffff',
            borderColor: colors.black[2],
            borderWidth: 1,
            width: 60,
            height: 16.9,
            marginTop: 12,
            borderRadius: 5,
        },
        switchText: {
            fontSize: 12,
            fontWeight: 'bold'
        },
    })


    // 날짜 계산
    function leftPad(value) {
        if (value >= 10) {
            return value;
        }
        return `0${value}`;
    }

    function toStringByFormatting(source, delimiter = '-') {
        const year = source.getFullYear();
        const month = leftPad(source.getMonth() + 1);
        const day = leftPad(source.getDate());
        return [year, month, day].join(delimiter);
    }

    // 저장 누르면 fetch
    const saveInfo = () => {
        const data = {
            diseaseTagRequestList: disease,
            dailyNote: memo,
            painType: conditionState[painType].painType,
            localDate: toStringByFormatting(date),
        }
        const body = JSON.stringify(data);
        console.log(data);
        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/calendars', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${state.userToken.accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: body
        }).then(response => response.json()).then((res) => {
            if(res.result === 'SUCCESS'){
                console.log('일기 등록 완료!');
                navigation.pop();
            }
        }).catch(err => console.error(err))
    }

    const getDataFromOtherScreen = (data) => {
        setDisease(data);
    }

    return (
        <>
            <ScreenContainer backgroundColor={colors.backgroundColor}>
                <NavigationTop navigation={navigation} title={"건강일기"}/>
                <KeyboardAvoidingView flex={1} behavior={"padding"}>
                    <ScrollView>
                        <ScreenContainerView style={{marginTop: 20}}>
                            <AppText style={styles.inputTitle}>날짜</AppText>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                display={"spinner"}
                                mode={'date'}
                                minimumDate={new Date(2020, 0, 1)}
                                maximumDate={new Date(2030, 11, 31)}

                                onChange={(_, selectDate) => setDate(selectDate)}
                            />
                        </ScreenContainerView>
                        <ScreenDivideLineLight/>
                        <ScreenContainerView>
                            <AppText style={styles.inputTitle}>전반적인 컨디션</AppText>
                            <View style={{marginTop: 24, flexDirection: "row", justifyContent: "space-between"}}>
                                {conditionState.map(({painType, selected, color, text, image}, index) => {
                                    return (
                                        <TouchableOpacity key={index} style={{alignItems: "center"}} activeOpacity={0.8}
                                                          onPress={() => changeConditionState(index)}>
                                            <Image source={image}/>
                                            <View
                                                style={{
                                                    ...styles.container,
                                                    borderColor: selected ? color : colors.black[2],
                                                    backgroundColor: selected ? color : '#fff'
                                                }}>
                                                <AppText style={{
                                                    ...styles.switchText,
                                                    color: selected ? '#fff' : colors.black[2]
                                                }}>{text}</AppText>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </ScreenContainerView>
                        <ScreenDivideLineLight/>
                        <ScreenContainerView>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 17
                            }}>
                                <AppText style={styles.inputTitle}>증상부위 및 질환선택</AppText>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('HealthDiarySelectPain', {
                                        params: {
                                            disease,
                                            goBackFunc: getDataFromOtherScreen
                                        }
                                    })}>
                                    <MaterialIcons name="keyboard-arrow-right" size={32} color="#53B3EE"/>
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                justifyContent: 'space-between',
                                marginBottom: 8,
                                flexDirection: 'row',
                                flexWrap: "wrap"
                            }}>
                                {disease.map(({name}, index) => {
                                    return (
                                        <View style={styles.item} key={index}>
                                            <AppText style={styles.title}>{name}</AppText>
                                        </View>
                                    )
                                })}
                            </View>

                        </ScreenContainerView>

                        <ScreenDivideLineLight/>

                        <ScreenContainerView style={{flexDirection: "column"}}>
                            <AppText style={styles.inputTitle}>메모</AppText>
                            <View style={styles.inputBox}>
                                <CustomTextInput flex={1} multiline={true} style={{
                                    color: colors.black[1],
                                    fontWeight: '700',
                                    textAlignVertical: 'top',
                                }} onChangeText={(text) => {
                                    setMemo(text)
                                }} value={memo}/>
                            </View>
                            <CustomButton buttonStyle={{marginVertical: 20}}
                                          title={"저정하기"}
                                          onPress={saveInfo}/>
                        </ScreenContainerView>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ScreenContainer>
        </>
    );
}


export default HealthDiaryCreateScreen;