import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import CustomTextInput from "../../component/CustomTextInput";
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import {AuthContext} from "../../context/AuthContextProviders";

const MedicalInfoScreen = ({navigation}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);

    const [history, setHistory] = useState("");
    const [drugHistory, setDrugHistory] = useState("");
    const [socialHistory, setSocialHistory] = useState("");
    const [traumaHistory, setTraumaHistory] = useState("");
    const [familyHistory, setFamilyHistory] = useState("");

    useEffect(() => {
        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users/medicine', {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then((res) => {
            if (res.result === 'SUCCESS') {
                const data = res.data;
                setHistory(data.history);
                setDrugHistory(data.drugHistory);
                setSocialHistory(data.socialHistory);
                setTraumaHistory(data.traumaHistory);
                setFamilyHistory(data.familyHistory);
            }
        }).catch(err => console.error(err))
    }, []);

    const styles = StyleSheet.create({
        textInputContainer: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: 'center',
            marginVertical: 10,
        },
        inputTitle: {
            color: colors.mainColor,
            fontWeight: '700',
            marginRight: 30,
            width: '13%',
            paddingBottom: 15
        },
        textLongInputContainer: {
            height: 90,
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
            backgroundColor: colors.mainColor,
            height: 48,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });
    const saveUserData = () => {
        // 데이터 정합성

        const data = {
            history, drugHistory, socialHistory, traumaHistory, familyHistory
        }
        const body = JSON.stringify(data);

        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users/medicine', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${state.userToken.accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: body
        }).then(response => response.json()).then((res) => {
            if (res.result === 'SUCCESS') {
                console.log('유저 정보 수정 완료');
                alert('수정이 완료되었습니다.');
                navigation.pop();
            }
        }).catch(err => console.error(err))
    }

    return (
        <ScreenContainer backgroundColor={colors.backgroundColor}>
            <NavigationTop navigation={navigation} title={"의료 정보"}/>
            <ScreenContainerView flex={1} style={{marginTop: 20, justifyContent: 'space-between'}}>
                <View>
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>과거력</AppText>
                        <View style={styles.textLongInputContainer}>
                            <CustomTextInput
                                flex={1} multiline={true}
                                style={styles.textLongInput}
                                placeholder="저는 과거에 ..."
                                onChangeText={text => setHistory(text)}
                                data={history}
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
                                data={familyHistory}
                            />
                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>약물   투약력</AppText>
                        <View style={styles.textLongInputContainer}>
                            <CustomTextInput
                                flex={1} multiline={true}
                                style={styles.textLongInput}
                                placeholder="약은 ..."
                                onChangeText={text => setDrugHistory(text)}
                                data={drugHistory}
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
                                data={socialHistory}
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
                                data={traumaHistory}
                            />
                        </View>
                    </View>
                </View>

                <View style={{marginBottom: 20}}>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        activeOpacity={0.8}
                        onPress={saveUserData}
                    >
                        <AppText style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>수정하기</AppText>
                    </TouchableOpacity>
                </View>
            </ScreenContainerView>
        </ScreenContainer>
    )
}


export default MedicalInfoScreen;