import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import NavigationTopWhite from "../../component/NavigationTop";
import ScreenDivideLineLight from "../../component/ScreenDivideLineLight";
import CustomButton from "../../component/CustomButton";
import {AuthContext} from "../../context/AuthContextProviders";

const diseaseExample = [
    {
        symptoms: "너무 너무 아프다 너무 아프다 진짜 아프다 거짓말 아니다",
        cause: "모른다",
        cure: "불치병이다",
    }
]


const DiagnosisDetailScreen = ({route, navigation}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);
    const [diseaseInfo, setDiseaseInfo] = useState(null);

    useEffect(() => {
        const {diseaseId} = route.params;
        console.log(diseaseId);
        fetch(`http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/diseases/${diseaseId}`, {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then((res) => {
            if (res.result === 'SUCCESS') {
                console.log(res.data);
                setDiseaseInfo(res.data);
            }
        }).catch(err => console.error(err))
    }, [])

    const styles = StyleSheet.create({
        inputTitle: {
            color: colors.black,
            fontWeight: '700',
            fontSize: 16,
            marginLeft : 10
        },
        otherText: {
            color: colors.mainColor,
            fontWeight: '700',
            fontSize: 16,
            marginRight : 10
        },
        titleText: {
            color: "#303030",
            fontSize: 18,
            fontWeight: '700',
        },
        boxText2: {
            color: "#303030", fontSize: 15, fontWeight: '400',
            lineHeight : 22
        },
        submitBtn: {
            backgroundColor: colors.mainColor,
            height: 48,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        container: {
            backgroundColor: "rgba(75, 155, 204, 0.05)",
            height: 250,
            borderRadius: 5,
            paddingHorizontal: 17.07,
        },
        // titleText: {
        //     color: "#303030",
        //     fontSize: 16,
        //     fontWeight: '700'
        // },
        box: {
            flex: 1,
            height: 40,
            backgroundColor: "#53B3EE",
            borderRadius: 5,
            paddingLeft: 14.9,
            justifyContent: "center",

        },
        boxText: {
            color: "#FFFFFF", fontSize: 14, fontWeight: '700'
        }
    })
    if(diseaseInfo){
        const departmants = diseaseInfo.recommendDepartment.split(',');

        return (
            <ScreenContainer backgroundColor={colors.backgroundColor}>
                <NavigationTop navigation={navigation} title={`질환 상세 정보 : ${diseaseInfo.name}`} backgroundColor={"#ffffff"} textColor={"#53B3EE"}/>
                <ScreenContainerView flex={1} style={{justifyContent: 'space-between'}}>
                    <ScrollView>
                        <View>
                            <View style={{flexDirection: "row", justifyContent: 'space-between', marginTop: 31, }}>
                                <AppText style={styles.inputTitle}>{diseaseInfo.name}</AppText>
                                <AppText style={styles.otherText}>이(가) 의심됩니다.</AppText>
                            </View>
                            <BlueDivideLine/>
                        </View>
                        <View style={{flexDirection: "column", marginTop: 34}}>
                            <View>
                                <AppText style={styles.titleText}>정의</AppText>
                                <AppText style={styles.boxText2}>{diseaseInfo.definition}</AppText>
                            </View>
                            <View>
                                <AppText style={styles.titleText}>진료과</AppText>
                                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 8}}>
                                    <View style={styles.box}>
                                        <AppText style={styles.boxText}>{departmants[0]}</AppText>
                                    </View>
                                    <View style={{marginHorizontal: 4}}/>
                                    <View style={styles.box}>
                                        <AppText style={styles.boxText}>{departmants[1]}</AppText>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <ScreenDivideLineLight/>
                        <AppText style={styles.titleText}>증상</AppText>
                        <View style={{marginTop: 8}}/>
                        <AppText style={styles.boxText2}>{diseaseInfo.symptom}</AppText>
                        <ScreenDivideLineLight/>
                        <AppText style={styles.titleText}>원인</AppText>
                        <View style={{marginTop: 8}}/>
                        <AppText style={styles.boxText2}>{diseaseInfo.cause}</AppText>
                        <ScreenDivideLineLight/>
                        <AppText style={styles.titleText}>치료</AppText>
                        <View style={{marginTop: 8}}/>
                        <AppText style={styles.boxText2}>{diseaseInfo.hospitalCare}</AppText>
                        <View style={{marginTop: 108}}/>
                        <CustomButton title={"네, 다 읽었어요"}/>
                        <View style={{marginTop: 38}}/>
                    </ScrollView>
                </ScreenContainerView>
            </ScreenContainer>
        );
    }else{
        return null;
    }
}
{/*height 1 보다는 2가 좀 더 이뻐보이는데...*/
}
const BlueDivideLine = (props) => {
    const {colors} = useTheme();

    return (

        <View style={{
            height: 1,
            backgroundColor: colors.blue[1],
            borderRadius: 1,
            marginTop : 16
        }}/>
    )
}

const DiseaseTouchable = ({information, department1, department2}) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "rgba(75, 155, 204, 0.05)",
            height: 250,
            borderRadius: 5,
            paddingHorizontal: 17.07,
        },
        titleText: {
            color: "#303030",
            fontSize: 16,
            fontWeight: '700'
        },
        box: {
            flex: 1,
            height: 40,
            backgroundColor: "#53B3EE",
            borderRadius: 5,
            paddingLeft: 14.9,
            justifyContent: "center",

        },
        boxText: {
            color: "#FFFFFF", fontSize: 14, fontWeight: '700'
        }
    })

    return (
        <View>

        </View>
    )
};

export default DiagnosisDetailScreen;