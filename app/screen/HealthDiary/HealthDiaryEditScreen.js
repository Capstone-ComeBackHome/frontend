import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView, FlatList, LogBox, TextInput} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTopWhite from "../../component/NavigationTop";
import ScreenDivideLineLight from "../../component/ScreenDivideLineLight";
import CustomButton from "../../component/CustomButton";
import {AntDesign} from '@expo/vector-icons';

const DATA = [
    {
        id: '0',
        title: '강박증',
        toggle: false,
    },
    {
        id: '1',
        title: '건망증',
        toggle: false,
    },
    {
        id: '2',
        title: '두통', toggle: false,
    },
    {
        id: '3',
        title: '두피건조', toggle: false,
    },
    {
        id: '4',
        title: '두피열상', toggle: false,
    },
    {
        id: '5',
        title: '어지러움', toggle: false,
    },
    {
        id: '6',
        title: '코막힘', toggle: false,
    },
    {
        id: '7',
        title: '재채기', toggle: false,
    },
    {
        id: '8',
        title: '콧물', toggle: false,
    },
    {
        id: '9',
        title: '기침', toggle: false,
    },
    {
        id: '10',
        title: '편도선 비대', toggle: false,
    },
    {
        id: '11',
        title: '가래', toggle: false,
    },
    {
        id: '12',
        title: '가슴 통증', toggle: false,
    },
    {
        id: '13',
        title: '가슴 답답', toggle: false,
    },
    {
        id: '14',
        title: '호흡 곤란', toggle: false,
    },
    {
        id: '15',
        title: '천식', toggle: false,
    },
    {
        id: '16',
        title: '부정맥', toggle: false,
    },
    {
        id: '17',
        title: '폐렴', toggle: false,
    },
];

const HealthDiaryEditScreen = ({navigation}) => {
    const {colors} = useTheme();
    const [text, onChangeText] = React.useState("너무 졸림");
    const [symptom, setSymptom] = React.useState(DATA);
    const [selectedSymptoms, setSelectedSymptoms] = React.useState([]);
    {/*Dummy data*/
    }

    const styles = StyleSheet.create({
        inputTitle: {
            color: colors.black[1],
            fontWeight: '700',
            fontSize: 16
        },
        inputBox: {
            height: 40,
            flex: 1,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#4B9BCC0D",
            borderColor: "#53B3EE",
            color: colors.black[1],
            fontWeight: '700',
            textAlignVertical: 'top',
            paddingTop: 10,
            paddingLeft: 16,
        },
        title: {
            fontSize: 14,
            color: "#53B3EE",
        },
    })
    const renderBrands = ({item, index}) => {
        const {title, id} = item;

        const isSelected = selectedSymptoms.filter((i) => i === id).length > 0; // checking if the item is already selected

        return (
            <TouchableOpacity
                onPress={() => {
                    if (isSelected) {
                        setSelectedSymptoms((prev) => prev.filter((i) => i !== id));
                    } else {
                        setSelectedSymptoms(prev => [...prev, id])
                    }
                }}
                style={{
                    backgroundColor: isSelected ? "#53B3EE" : "rgba(83, 179, 238, 0.05)",
                    borderWidth: 1,
                    borderColor: "#53B3EE",
                    flex: 1,
                    height: 47,
                    marginHorizontal: 4,
                    paddingLeft: 16,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    borderRadius: 5,
                }}
                delayPressIn={0}
            >
                <AppText style={{color: isSelected ? "#ffffff" : "#53B3EE",fontWeight : "700"}}>{title}</AppText>
            </TouchableOpacity>
        );
    };
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    return (
        <ScreenContainer backgroundColor={colors.backgroundColor}>
            <NavigationTopWhite navigation={navigation} title={"증상부위 및 질환 선택"} backgroundColor={"#ffffff"} textColor={"#53B3EE"}/>
            <ScrollView>
                <ScreenContainerView>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 20
                    }}>
                        <AppText style={styles.inputTitle}>머리</AppText>
                    </View>
                    <View style={{marginBottom: 17}}/>
                    <FlatList

                        columnWrapperStyle={{justifyContent: "space-around", marginBottom: 8}}
                        data={DATA.slice(0, 6)}
                        renderItem={renderBrands}

                        scrollEnabled={false}
                        numColumns={2}
                    />
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: 24
                    }}>
                        <AppText style={styles.inputTitle}>기관지</AppText>
                    </View>
                    <View style={{marginBottom: 17}}/>
                    <FlatList
                        columnWrapperStyle={{justifyContent: "space-around", marginBottom: 8}}
                        data={DATA.slice(6, 12)}
                        renderItem={renderBrands}

                        scrollEnabled={false}
                        numColumns={2}
                    />
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 24
                    }}>
                        <AppText style={styles.inputTitle}>가슴</AppText>
                    </View>
                    <View style={{marginBottom: 17}}/>
                    <FlatList
                        columnWrapperStyle={{justifyContent: "space-around", marginBottom: 8}}
                        data={DATA.slice(12, 18)}
                        renderItem={renderBrands}

                        scrollEnabled={false}
                        numColumns={2}
                    />
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
                        <TextInput
                            style={styles.inputBox}
                            onChangeText={onChangeText}
                            value={text}
                        />
                        <View style={{marginLeft: 14}}/>
                        <AntDesign name="plussquare" size={45} color="#53B3EE"/>
                    </View>
                    <CustomButton title={"수정하기"}
                                  buttonStyle={{width: "100%", bottom: 0}}/>
                    <View style={{marginBottom: 37}}/>
                </ScreenContainerView>
            </ScrollView>
        </ScreenContainer>
    );
}


export default HealthDiaryEditScreen;