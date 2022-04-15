import React, {useState, useEffect} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {useTheme} from '@react-navigation/native';

import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import CustomButton from '../../component/CustomButton';
import AppText from "../../component/AppText";
import ScreenDivideLine from "../../component/ScreenDivideLine";

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
                paddingVertical: 20,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
            }}>
                <ScreenContainerView>
                    <AppText style={{color: "#fff", fontSize: 20}}>{userInfo.name + ' 님'}</AppText>
                </ScreenContainerView>
            </View>
            <ScrollView>
                <ScreenContainerView style={{marginVertical: 10}}>
                    <AppText style={{color: colors.mainColor, fontSize: 16, marginVertical: 20}}>AI 진료실</AppText>
                    <View style={{alignItems: 'center'}}>
                        <Image source={mainBanner}/>
                        <CustomButton title={"AI 진료받기"}
                                      buttonStyle={{position: 'absolute', width: '90%', bottom: 10}}
                                      onPress={() => navigation.navigate('ChatStart')}
                        />
                    </View>
                </ScreenContainerView>
                <ScreenDivideLine/>
                <ScreenContainerView>
                    <AppText style={{color: colors.mainColor, fontSize: 16, marginVertical: 20}}>건강일기</AppText>
                    <View style={{alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: colors.blue[4],
                            width: '100%',
                            borderRadius: 10,
                            padding: 20,
                            marginBottom : 20
                        }}>
                            <AppText style={{fontWeight: '700', fontSize: 20, paddingBottom: 20}}>13일</AppText>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={score1} style={{marginRight: 20}}/>
                                <View flex={1}>
                                    <View style={{flexDirection: 'row', flexWrap : 'wrap', marginBottom : 20}}>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                    </View>
                                    <View>
                                        <AppText>오늘은 적당히 아파요</AppText>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            backgroundColor: colors.blue[4],
                            width: '100%',
                            borderRadius: 10,
                            padding: 20,
                            marginBottom : 20
                        }}>
                            <AppText style={{fontWeight: '700', fontSize: 20, paddingBottom: 20}}>13일</AppText>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={score1} style={{marginRight: 20}}/>
                                <View flex={1}>
                                    <View style={{flexDirection: 'row', flexWrap : 'wrap', marginBottom : 20}}>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                    </View>
                                    <View>
                                        <AppText>오늘은 적당히 아파요</AppText>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            backgroundColor: colors.blue[4],
                            width: '100%',
                            borderRadius: 10,
                            padding: 20,
                            marginBottom : 20
                        }}>
                            <AppText style={{fontWeight: '700', fontSize: 20, paddingBottom: 20}}>13일</AppText>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={score1} style={{marginRight: 20}}/>
                                <View flex={1}>
                                    <View style={{flexDirection: 'row', flexWrap : 'wrap', marginBottom : 20}}>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                        <View style={styles.diseaseTag}><AppText
                                            style={{color: '#fff', fontWeight: '700'}}>후두염</AppText></View>
                                    </View>
                                    <View>
                                        <AppText>오늘은 적당히 아파요</AppText>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <CustomButton title={"건강일기 쓰기"} buttonStyle={{width: '90%', marginVertical : 20}}/>
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
    },
    textStyle: {
        fontSize: 18,
    },
    diseaseTag: {
        borderRadius: 6,
        backgroundColor: '#13540f',
        height: 24,
        width: 60,
        alignItems: "center",
        justifyContent: 'center',
        marginRight : 10,
        marginBottom : 6
    }
})

export default HomeScreen;