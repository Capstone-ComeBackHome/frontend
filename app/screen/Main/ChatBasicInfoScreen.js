import React, {useState, useEffect} from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import CustomTextInput from "../../component/CustomTextInput";
import CustomButton from "../../component/CustomButton";

const ChatBasicInfoScreen = ({navigation}) => {
    const {colors} = useTheme();
    const styles = StyleSheet.create({
        infoText : {
            color : colors.mainColor,
            fontWeight : '600',
            fontSize : 18,
            marginVertical : 2
        },
        textInputContainer: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: 'center',
            marginVertical : 10,
        },
        inputTitle: {
            color: colors.mainColor,
            fontWeight: '700',
            marginRight: 30,
            width : '13%',
            paddingBottom: 15
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
    });

    return (
        <ScreenContainer>
            <NavigationTop title={"기본 정보"} backgroundColor={"#fff"} textColor={colors.mainColor}/>
            <ScreenContainerView>
                <View style={{marginVertical: 30}}>
                    <AppText style={styles.infoText}>진료를 시작하기 전에</AppText>
                    <AppText style={styles.infoText}>환자 분의 정보를 입력해주세요.</AppText>
                </View>
                <View>
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>이메일</AppText>
                        <CustomTextInput
                            placeholder="apzima@gmail.com"
                            style={styles.textInput}
                            flex={1}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>이름</AppText>
                        <CustomTextInput
                            placeholder="홍길동"
                            style={styles.textInput}
                            flex={1}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>나이</AppText>
                        <CustomTextInput
                            placeholder="20"
                            style={styles.textInput}
                            flex={1}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>성별</AppText>
                        <CustomTextInput
                            placeholder="apzima@gmail.com"
                            style={styles.textInput}
                            flex={1}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>신장</AppText>
                        <CustomTextInput
                            placeholder="apzima@gmail.com"
                            style={styles.textInput}
                            flex={1}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>체중</AppText>
                        <CustomTextInput
                            placeholder="apzima@gmail.com"
                            style={styles.textInput}
                            flex={1}
                        />
                    </View>
                </View>
                <CustomButton
                    buttonStyle={{backgroundColor: colors.mainColor}}
                    textStyle={{color : '#fff'}}
                    title={"다음으로"}
                    onPress={() => {
                        navigation.navigate('ChatAdditionalInfo');
                    }}
                />
            </ScreenContainerView>
        </ScreenContainer>
    );
}



export default ChatBasicInfoScreen;