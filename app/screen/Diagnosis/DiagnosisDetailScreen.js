import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import ScreenDivideLineLight from "../../component/ScreenDivideLineLight";
import CustomButton from "../../component/CustomButton";
import {AuthContext} from "../../context/AuthContextProviders";


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
        diagnosisTitle: {
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
        information: {
            marginTop : 8,
            fontSize: 15,
            fontWeight: '400',
            lineHeight : 22
        },
        department: {
            backgroundColor: colors.blue[1],
            borderRadius: 5,
            padding: 12,
            justifyContent: "center",
            width : '47%'
        },
        departmentText: {
            color: "#FFFFFF", fontSize: 14, fontWeight: '700'
        }
    })
    if(diseaseInfo){
        const departmants = diseaseInfo.recommendDepartment.split(',');

        return (
            <ScreenContainer backgroundColor={colors.backgroundColor}>
                <NavigationTop navigation={navigation} title={`질환 상세 정보 : ${diseaseInfo.name}`} backgroundColor={"#fff"} textColor={colors.blue[1]}/>
                <ScreenContainerView flex={1} style={{justifyContent: 'space-between'}}>
                    <ScrollView>
                        <View style={{flexDirection: "row", justifyContent: 'space-between', marginTop: 31}}>
                            <AppText style={styles.diagnosisTitle}>{diseaseInfo.name}</AppText>
                            <AppText style={styles.otherText}>이(가) 의심됩니다.</AppText>
                        </View>

                        <BlueDivideLine/>

                        <View style={{marginTop: 30}}>
                            <View>
                                <AppText style={styles.titleText}>정의</AppText>
                                <AppText style={styles.information}>{diseaseInfo.definition}</AppText>
                            </View>
                            <View style={{marginTop : 20}}>
                                <AppText style={styles.titleText}>진료과</AppText>
                                <View style={{flexDirection: "row", justifyContent: "space-around", marginTop : 12}}>
                                    <View style={styles.department}>
                                        <AppText style={styles.departmentText}>{departmants[0]}</AppText>
                                    </View>
                                    <View style={styles.department}>
                                        <AppText style={styles.departmentText}>{departmants[1]}</AppText>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <ScreenDivideLineLight/>

                        <AppText style={styles.titleText}>증상</AppText>
                        <AppText style={styles.information}>{diseaseInfo.symptom}</AppText>

                        <ScreenDivideLineLight/>

                        <AppText style={styles.titleText}>원인</AppText>
                        <AppText style={styles.information}>{diseaseInfo.cause}</AppText>

                        <ScreenDivideLineLight/>

                        <AppText style={styles.titleText}>치료</AppText>
                        <AppText style={styles.information}>{diseaseInfo.hospitalCare}</AppText>

                        <View style={{marginTop: 26}}/>
                        <CustomButton title={"다 읽었어요"} onPress={() => navigation.goBack()}/>
                        <View style={{marginTop: 20}}/>
                    </ScrollView>
                </ScreenContainerView>
            </ScreenContainer>
        );
    }else{
        return null;
    }
}

const BlueDivideLine = (props) => {
    const {colors} = useTheme();
    return (
        <View style={{
            height: 2,
            backgroundColor: colors.blue[1],
            borderRadius: 1,
            marginTop : 16
        }}/>
    )
}

export default DiagnosisDetailScreen;