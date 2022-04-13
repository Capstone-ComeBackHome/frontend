import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Image, TextInput,ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';

import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import ScreenDivideLineLight from "../../component/ScreenDivideLineLight"
import CustomButton from '../../component/CustomButton';

{/*Native DatePicker deprecated => use community one(Dev's recommendation)*/
}

{/*Images*/
}
import score1 from '../../assets/images/disease/score1.png';
import score2 from '../../assets/images/disease/score2.png';
import score3 from '../../assets/images/disease/score3.png';
import score4 from '../../assets/images/disease/score4.png';
import score5 from '../../assets/images/disease/score5.png';


const HealthDiaryScreen = ({navigation}) => {
    const {colors} = useTheme();
    const [text, onChangeText] = React.useState("시간이 줄줄 흐른다");
    const styles = StyleSheet.create({
        inputTitle: {
            color: colors.black[1],
            fontWeight: '700',
            fontSize: 16
        },
        inputSubTitle: {
            color: colors.black[1],
            fontWeight: '700',
            fontSize: 14
        },
        inputBox: {
            height: 92,
            borderWidth: 1,
            backgroundColor : "#4B9BCC",
            opacity : 0.05,
        },
        container: {
            alignItems: "center",
            backgroundColor: "#53B3EE",
            width: 60,
            height: 16.9,
            marginTop: 12,
        }
    })
    return (
        <ScreenContainer backgroundColor={colors.backgroundColor}>
            <NavigationTop navigation={navigation} title={"건강일기"}/>
            <ScrollView>
                <ScreenContainerView style={{marginTop: 20}}>
                    <AppText style={styles.inputTitle}>날짜</AppText>
                </ScreenContainerView>
                <ScreenDivideLineLight/>
                <ScreenContainerView>
                    <View>
                        <AppText style={styles.inputTitle}>전반적인 컨디션</AppText>
                    </View>
                    <View style={{marginTop: 24, flexDirection: "row", justifyContent: "space-between"}}>
                        <ImageWithText imageName={score1} text={"괜찮아짐"} color="#7ACCB5"/>
                        <ImageWithText imageName={score2} text={"신경쓰임"} color="#B1E5AA"/>
                        <ImageWithText imageName={score3} text={"아픔"} color="#F7BCD8"/>
                        <ImageWithText imageName={score4} text={"너무 아픔"} color="#FF7189"/>
                        <ImageWithText imageName={score5} text={"심한 고통"} color="#CE325B"/>
                    </View>
                </ScreenContainerView>
                <ScreenDivideLineLight/>
                <ScreenContainerView>
                    <AppText style={styles.inputTitle}>증상부위 및 질환선택</AppText>
                </ScreenContainerView>
                <ScreenDivideLineLight/>
                <ScreenContainerView style={{flexDirection: "column",}}>
                    <View style={{marginBottom : 14}}>
                        <AppText style={styles.inputSubTitle}>메모</AppText>
                    </View>
                    <View>
                        <View style={{borderColor:"#53B3EE",borderRadius : 5,borderWidth : 1,marginBottom:66}}>
                            <View>{/*
                        <TextInput
                                style={{color:"#4B9BCC",backgroundColor:"#4B9BCC",opacity:0.05}}
                                onChangeText={onChangeText}
                                value={text}
                            />
                        */}{/*이 부분이 계속 원하는 색이 안나와서 패스..*/}
                            </View>
                            <View style={styles.inputBox}/>
                        </View>
                    </View>
                    <CustomButton title={"수정하기"}
                                  buttonStyle={{width: '100%', bottom: 0}}/>
                </ScreenContainerView>
            </ScrollView>
        </ScreenContainer>
    );
}

{/*토글 기능을 쓰려면 뭘로 바꿔야 하나요? 우선은 TouchableOpacity로 사용해봤습니다 (껍데기만 만드려고 해서)*/
}

const ImageWithText = ({imageName, text, color, ...props}) => {
    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            backgroundColor: color,
            width: 60,
            height: 16.9,
            marginTop: 12,
            borderRadius: 5,
        },
        switchText: {
            fontSize: 11,
            color: "#ffffff"
        },
    })
    return (
        <View style={{flexDirection: "column", alignItems: "center"}}>
            <Image source={imageName}/>
            <TouchableOpacity style={styles.container}>
                <AppText style={styles.switchText}>{text}</AppText>
            </TouchableOpacity>
        </View>
    )
};

export default HealthDiaryScreen;