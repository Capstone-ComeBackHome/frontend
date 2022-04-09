import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import CustomTextInput from "../../component/CustomTextInput";
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";

const DefaultInfoScreen = ({navigation}) => {
    const {colors} = useTheme();
    const styles = StyleSheet.create({
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
    })
    return (
        <ScreenContainer backgroundColor={colors.backgroundColor}>
            <NavigationTop navigation={navigation} title={"기본 정보"}/>
            <ScreenContainerView flex={1} style={{marginTop : 20, justifyContent: 'space-between'}}>
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
                <View style={{marginBottom: 20}}>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        activeOpacity={0.8}
                    >
                        <AppText style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>수정하기</AppText>
                    </TouchableOpacity>
                </View>
            </ScreenContainerView>
        </ScreenContainer>
    );
}


export default DefaultInfoScreen;