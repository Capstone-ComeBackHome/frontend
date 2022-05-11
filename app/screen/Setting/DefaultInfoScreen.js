import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import CustomTextInput from "../../component/CustomTextInput";
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import {AuthContext} from "../../context/AuthContextProviders";

const DefaultInfoScreen = ({navigation}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);

    const [age, setAge] = useState(null);
    const [sex, setSex] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);

    const [isBasicFill, setIsBasicFill] = useState(false);

    useEffect(() => {
        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users/essential', {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then((res) => {
            if (res.result === 'SUCCESS') {
                const data = res.data;
                setAge(data.age);
                setSex(data.sex);
                setHeight(data.height);
                setWeight(data.weight);
            }
        }).catch(err => console.error(err))
    }, []);

    useEffect(() => {
        if (age && sex && height && weight) {
            setIsBasicFill(true);
        } else {
            setIsBasicFill(false);
        }
    }, [age, sex, height, weight]);

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
        textInput: {
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.mainColor,
            marginBottom: 6,
            paddingBottom: 11
        },
        submitBtn: {
            backgroundColor: isBasicFill ? colors.mainColor : colors.black[3],
            height: 48,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });

    const saveUserData = () => {
        // 데이터 정합성

        const data = {
            age, sex, height, weight
        }
        const body = JSON.stringify(data);

        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users/essential', {
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
            <NavigationTop navigation={navigation} title={"기본 정보"}/>
            <ScreenContainerView flex={1} style={{marginTop: 20, justifyContent: 'space-between'}}>
                <View>
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>나이</AppText>
                        <CustomTextInput
                            placeholder="20"
                            style={styles.textInput}
                            flex={1}
                            data={age}
                            onChangeText={text => setAge(text)}
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>성별</AppText>
                        <CustomTextInput
                            placeholder="MAN / WOMAN"
                            style={styles.textInput}
                            flex={1}
                            data={sex}
                            onChangeText={text => setSex(text)}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>신장</AppText>
                        <CustomTextInput
                            placeholder="172.1"
                            style={styles.textInput}
                            flex={1}
                            data={height}
                            onChangeText={text => setHeight(text)}
                            keyboardType={'decimal-pad'}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <AppText style={styles.inputTitle}>체중</AppText>
                        <CustomTextInput
                            placeholder="60.3"
                            style={styles.textInput}
                            flex={1}
                            data={weight}
                            onChangeText={text => setWeight(text)}
                            keyboardType={'decimal-pad'}
                        />
                    </View>
                </View>
                <View style={{marginBottom: 20}}>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        activeOpacity={0.8}
                        disabled={!isBasicFill}
                        onPress={saveUserData}
                    >
                        <AppText style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>수정하기</AppText>
                    </TouchableOpacity>
                </View>
            </ScreenContainerView>
        </ScreenContainer>
    );
}


export default DefaultInfoScreen;