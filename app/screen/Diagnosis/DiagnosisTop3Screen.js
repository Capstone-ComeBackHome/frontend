import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import ScreenDivideLineLight from "../../component/ScreenDivideLineLight";
import {AuthContext} from "../../context/AuthContextProviders";

const DiagnosisTop3Screen = ({route, navigation}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);
    const [diseaseList, setDiseaseList] = useState(route.params.diseaseList);
    const [diseaseInfoList, setDiseaseInfoList] = useState(null);

    useEffect(() => {
        fetch(`http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/diseases?diseaseNameList=${diseaseList[0]},${diseaseList[1]},${diseaseList[2]}`, {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then((res) => {
            if (res.result === 'SUCCESS') {
                console.log(res.data);
                setDiseaseInfoList(res.data.simpleDiseaseList);
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
        textInput: {
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.mainColor,
            marginBottom: 6,
            paddingBottom: 11
        },
        submitBtn: {
            backgroundColor: colors.mainColor,
            height: 48,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    return (
        <ScreenContainer backgroundColor={colors.backgroundColor}>
            <NavigationTop navigation={navigation} title={"진단 결과"}/>
            <ScreenContainerView flex={1} style={{justifyContent: 'space-between'}}>
                <ScrollView>
                    <View>
                        <View style={{flexDirection: "row", justifyContent: 'space-between', marginTop: 31}}>
                            <AppText style={styles.inputTitle}>{diseaseList[0]}</AppText>
                            <AppText style={styles.otherText}>이(가) 의심됩니다.</AppText>
                        </View>
                        <BlueDivideLine/>
                    </View>
                    <View style={{flexDirection: "column", marginTop: 24}}>
                        {/*space for disease info*/}
                        {diseaseInfoList && diseaseInfoList.map((diseaseInfo) => {
                            const departments = diseaseInfo.recommendDepartment.split(',');
                                return (
                                    <DiseaseTouchable disease={diseaseInfo.name} percentage={"100"}
                                                      information={diseaseInfo.definition}
                                                      department1={departments[0]}
                                                      department2={departments[1]}
                                                      navigation={navigation}
                                                      diseaseId={diseaseInfo.diseaseId}
                                    />
                                )
                            }
                        )}

                    </View>
                    <ScreenDivideLineLight/>
                </ScrollView>
            </ScreenContainerView>
        </ScreenContainer>
    );
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

const DiseaseTouchable = ({disease, information, department1, department2, navigation, diseaseId}) => {
    const {colors} = useTheme();
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "rgba(75, 155, 204, 0.05)",
            borderRadius: 5,
            paddingHorizontal: 17.07,
            marginVertical : 10,
            paddingVertical : 20
        },
        titleText: {
            color: "#303030",
            fontSize: 18,
            fontWeight: '700'
        },
        nonTitleText: {
            fontSize : 15,
            fontWeight: 'bold',
            marginVertical : 5
        },
        informationText : {
            color: '#444',
            fontSize: 14,
            fontWeight: '500',
            lineHeight : 20
        },
        box: {
            flex: 1,
            height: 40,
            backgroundColor: "#53B3EE",
            borderRadius: 5,
            padding : 10,
            justifyContent: "center",
        },
        boxText: {
            color: "#FFFFFF", fontSize: 14, fontWeight: '700'
        }
    })
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('DiagnosisDetail', {diseaseId})}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <AppText style={styles.titleText}>{disease}</AppText>
            </View>
            <View style={{marginVertical: 16}}>
                <AppText style={styles.nonTitleText}>정의</AppText>
                <AppText style={styles.informationText}>{information}</AppText>
            </View>
            <View>
                <AppText style={styles.nonTitleText}>진료과</AppText>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 8}}>
                    <View style={styles.box}>
                        <AppText style={styles.boxText}>{department1}</AppText>
                    </View>
                    <View style={{marginHorizontal: 4}}/>
                    <View style={styles.box}>
                        <AppText style={styles.boxText}>{department2}</AppText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
};

export default DiagnosisTop3Screen;