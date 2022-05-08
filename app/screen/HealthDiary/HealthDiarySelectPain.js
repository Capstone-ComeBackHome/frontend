import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTopWhite from "../../component/NavigationTop";
import ScreenDivideLineLight from "../../component/ScreenDivideLineLight";
import CustomButton from "../../component/CustomButton";
import {AntDesign} from '@expo/vector-icons';
import {AuthContext} from "../../context/AuthContextProviders";
import CustomTextInput from "../../component/CustomTextInput";

const DiseaseButton = ({diseaseType, name: title, selectedSymptoms, setSelectedSymptoms}) => {
    const {colors} = useTheme();
    const [isSelected, setIsSelected] = useState(false);
    const styles = StyleSheet.create({
        button: {
            borderWidth: 1,
            borderColor: "#53B3EE",
            paddingVertical: 14,
            justifyContent: "center",
            borderRadius: 5,
            backgroundColor: isSelected ? colors.blue[1] : "rgba(83, 179, 238, 0.05)",
            width: '48%',
            marginBottom: 10
        },
        text: {
            marginLeft: 20,
            fontWeight: 'bold',
            fontSize: 16,
            color: isSelected ? '#fff' : colors.blue[1]
        }
    })

    return (
        <TouchableOpacity
            onPress={() => {
                if (isSelected === true) { // 선택 취소
                    setIsSelected(state => !state);
                    setSelectedSymptoms(arr => {
                        const newArr = arr.filter((item) => item.name !== title);
                        return newArr;
                    });
                } else { // 선택
                    if (selectedSymptoms.length < 5) {
                        setIsSelected(state => !state);
                        setSelectedSymptoms(arr => {
                            const newArr = [...arr];
                            newArr.push({diseaseType, name: title})
                            return newArr;
                        });
                    } else {
                        console.log('5개 이미 선택!');
                    }
                }
            }}
            style={styles.button}
        >
            <AppText style={styles.text}>{title}</AppText>
        </TouchableOpacity>
    );
};

const HealthDiarySelectPain = ({navigation, route}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);
    const [text, onChangeText] = useState("");
    const [symptom, setSymptom] = useState();
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    useEffect(() => {
        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/diseaseTags', {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then((res) => {
            if (res.result === 'SUCCESS') {
                const data = Object.entries(res.data);
                console.log(data);
                setSymptom(data);
            }
        }).catch(err => console.error(err))

        // ** 이전 state 복원 (나중에 개발하기)
        // setSelectedSymptoms(route.params.params.disease);

    }, [])

    const styles = StyleSheet.create({
        inputTitle: {
            color: colors.black[1],
            fontWeight: '700',
            fontSize: 16
        },
        inputBox: {
            height: 46,
            flex: 1,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#4B9BCC0D",
            borderColor: "#53B3EE",
            paddingVertical: 10,
            paddingHorizontal: 16,
            justifyContent: "center"
        },
        title: {
            fontSize: 14,
            color: "#53B3EE",
        },
    })
    const sendSelectedSymptom = () => {
        route.params.params.goBackFunc(selectedSymptoms);
        navigation.pop();
    }

    return (
        <ScreenContainer backgroundColor={colors.backgroundColor}>
            <NavigationTopWhite navigation={navigation} title={"증상부위 및 질환 선택"} backgroundColor={"#ffffff"}
                                textColor={"#53B3EE"}/>
            <KeyboardAvoidingView flex={1} behavior={"padding"}>
                <ScrollView>
                    <ScreenContainerView>
                        {
                            symptom && symptom.map(([key, {diseaseTagNameList, diseaseTypeDescription}], index) => {
                                return (
                                    <View key={index}>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginTop: 20
                                        }}>
                                            <AppText style={styles.inputTitle}>{diseaseTypeDescription}</AppText>
                                        </View>
                                        <View style={{marginBottom: 17}}/>
                                        <View style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-around'
                                        }}>
                                            {
                                                diseaseTagNameList.map((diseaseName, index) => {
                                                    return (<DiseaseButton key={index}
                                                                           name={diseaseName}
                                                                           diseaseType={key}
                                                                           selectedSymptoms={selectedSymptoms}
                                                                           setSelectedSymptoms={setSelectedSymptoms}/>)
                                                })
                                            }
                                        </View>

                                    </View>
                                )
                            })
                        }
                    </ScreenContainerView>
                    <ScreenDivideLineLight/>
                    <ScreenContainerView>
                        <View style={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: 14
                        }}>
                            <AppText style={styles.inputTitle}>증상 추가</AppText>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: "center",
                            marginBottom: 50
                        }}>
                            <View style={styles.inputBox}>
                                <CustomTextInput
                                    style={{
                                        fontSize: 16,
                                        color: colors.black[1],
                                        fontWeight: '700',
                                    }}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>
                            <View style={{marginLeft: 14}}/>
                            <AntDesign name="plussquare" size={45} color="#53B3EE"/>
                        </View>
                        <CustomButton title={"선택하기"}
                                      buttonStyle={{width: "100%", bottom: 0, marginBottom: 37}}
                                      onPress={sendSelectedSymptom}
                        />
                    </ScreenContainerView>
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenContainer>
    );
}


export default HealthDiarySelectPain;