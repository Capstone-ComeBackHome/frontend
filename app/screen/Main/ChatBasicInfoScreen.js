import React, {useState, useEffect, useRef, useContext} from 'react';
import {KeyboardAvoidingView, View, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import CustomTextInput from "../../component/CustomTextInput";
import CustomButton from "../../component/CustomButton";
import {AuthContext} from "../../context/AuthContextProviders";

const ChatBasicInfoScreen = ({navigation}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);

    const [age, setAge] = useState(null);
    const [sex, setSex] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);

    const [history, setHistory] = useState("");
    const [drugHistory, setDrugHistory] = useState("");
    const [socialHistory, setSocialHistory] = useState("");
    const [traumaHistory, setTraumaHistory] = useState("");
    const [familyHistory, setFamilyHistory] = useState("");

    const [isBasicFill, setIsBasicFill] = useState(false);

    useEffect(() => {
        if (age && sex && height && weight) {
            setIsBasicFill(true);
        } else {
            setIsBasicFill(false);
        }
    }, [age, sex, height, weight]);

    const styles = StyleSheet.create({
        infoText: {
            color: colors.mainColor,
            fontWeight: '600',
            fontSize: 18,
            marginVertical: 2
        },
        infoText2: {
            color: colors.mainColor,
            fontSize: 14,
            marginVertical: 6
        },
        textInputContainer: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: 'center',
            marginBottom: 20,
            paddingBottom: 15
        },
        textInput: {
            borderBottomWidth: 1,
            borderBottomColor: colors.mainColor,
            marginBottom: 6,
            paddingBottom: 11,
            paddingLeft: 16
        },
        inputTitle: {
            color: colors.mainColor,
            fontWeight: '700',
            marginRight: 30,
            width: '13%',
            paddingBottom: 11,
        },
        textLongInputContainer: {
            height: 70,
            flex: 1,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#4B9BCC0D",
            borderColor: "#53B3EE",
            paddingVertical: 10,
            paddingHorizontal: 16,
        },
        textLongInput: {
            color: colors.black[1],
            fontWeight: '700',
            textAlignVertical: 'top',
        },
        submitBtn: {
            backgroundColor: isBasicFill ? colors.mainColor : colors.black[3],
            marginBottom: 20
        }
    });

    const saveUserData = () => {
        // 데이터 정합성

        const data = {
            age, sex, height, weight, history, drugHistory, socialHistory, traumaHistory, familyHistory
        }
        const body = JSON.stringify(data);

        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${state.userToken.accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body : body
        }).then(response => response.json()).then((res) => {
            console.log(res);
            if(res.result === 'SUCCESS'){
                navigation.navigate('Chat');
            }
        }).catch(err => console.error(err))
    }

    return (
        <ScreenContainer>
            <NavigationTop title={"기본 정보"} backgroundColor={"#fff"} textColor={colors.mainColor}/>

            <KeyboardAvoidingView flex={1} behavior={"padding"}>
                <ScreenContainerView flex={1}>
                    <ScrollView>
                        <View flex={1}>
                            <View style={{marginVertical: 30}}>
                                <AppText style={styles.infoText}>진료를 시작하기 전에</AppText>
                                <AppText style={styles.infoText}>환자 분의 정보를 입력해주세요.</AppText>
                                <AppText style={styles.infoText2}>* 표시가 된 문항은 필수 문항입니다.</AppText>
                            </View>
                            <View>
                                <View style={styles.textInputContainer}>
                                    <AppText style={styles.inputTitle}>나이*</AppText>
                                    <CustomTextInput
                                        placeholder="20"
                                        style={styles.textInput}
                                        flex={1}
                                        onChangeText={text => setAge(text)}
                                        keyboardType={'number-pad'}
                                    />
                                </View>
                                <View style={styles.textInputContainer}>
                                    <AppText style={styles.inputTitle}>성별*</AppText>
                                    <CustomTextInput
                                        placeholder="MAN"
                                        style={styles.textInput}
                                        flex={1}
                                        onChangeText={text => setSex(text)}
                                    />
                                </View>
                                <View style={styles.textInputContainer}>
                                    <AppText style={styles.inputTitle}>신장*</AppText>
                                    <CustomTextInput
                                        placeholder="172.1"
                                        style={styles.textInput}
                                        flex={1}
                                        onChangeText={text => setHeight(text)}
                                        keyboardType={'decimal-pad'}
                                    />
                                </View>
                                <View style={styles.textInputContainer}>
                                    <AppText style={styles.inputTitle}>체중*</AppText>
                                    <CustomTextInput
                                        placeholder="60.3"
                                        style={styles.textInput}
                                        flex={1}
                                        onChangeText={text => setWeight(text)}
                                        keyboardType={'decimal-pad'}
                                    />
                                </View>
                                <View style={styles.textInputContainer}>
                                    <AppText style={styles.inputTitle}>과거력</AppText>
                                    <View style={styles.textLongInputContainer}>
                                        <CustomTextInput
                                            flex={1} multiline={true}
                                            style={styles.textLongInput}
                                            placeholder="저는 과거에 ..."
                                            onChangeText={text => setHistory(text)}
                                        />
                                    </View>
                                </View>
                                <View style={styles.textInputContainer}>
                                    <AppText style={styles.inputTitle}>가족력</AppText>
                                    <View style={styles.textLongInputContainer}>
                                        <CustomTextInput
                                            flex={1} multiline={true}
                                            style={styles.textLongInput}
                                            placeholder="가족 중에는 ..."
                                            onChangeText={text => setFamilyHistory(text)}
                                        />
                                    </View>
                                </View>
                                <View style={styles.textInputContainer}>
                                    <AppText style={styles.inputTitle}>약물 투약력</AppText>
                                    <View style={styles.textLongInputContainer}>
                                        <CustomTextInput
                                            flex={1} multiline={true}
                                            style={styles.textLongInput}
                                            placeholder="약은 ..."
                                            onChangeText={text => setDrugHistory(text)}
                                        />
                                    </View>
                                </View>
                                <View style={styles.textInputContainer}>
                                    <AppText style={styles.inputTitle}>사회력</AppText>
                                    <View style={styles.textLongInputContainer}>
                                        <CustomTextInput
                                            flex={1} multiline={true}
                                            style={styles.textLongInput}
                                            placeholder="사회력은 ..."
                                            onChangeText={text => setSocialHistory(text)}
                                        />
                                    </View>
                                </View>
                                <View style={styles.textInputContainer}>
                                    <AppText style={styles.inputTitle}>외상력</AppText>
                                    <View style={styles.textLongInputContainer}>
                                        <CustomTextInput
                                            flex={1} multiline={true}
                                            style={styles.textLongInput}
                                            placeholder="외상력은 ..."
                                            onChangeText={text => setTraumaHistory(text)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>


                    <CustomButton
                        buttonStyle={styles.submitBtn}
                        textStyle={{color: '#fff'}}
                        title={"저장하고 채팅 시작하기"}
                        disabled={!isBasicFill}
                        onPress={() => {
                            console.log(age, sex, height, weight);
                            saveUserData();
                        }}
                    />
                </ScreenContainerView>
            </KeyboardAvoidingView>
        </ScreenContainer>
    );
}


export default ChatBasicInfoScreen;