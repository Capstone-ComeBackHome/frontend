import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Button, FlatList
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Calendar} from "react-native-calendars";

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import {List} from 'react-native-paper';

const HistoryScreen = ({navigation, userInfo}) => {
    const {colors} = useTheme();
    const [expanded, setExpanded] = React.useState(false);

    const handlePress = () => setExpanded(!expanded);
    const DATA = [
        {
            id: '0',
            time: '오후 9:10',
            title: '부정맥',
            department1: '이승',
            department2: '저승',
            other1: '죽음',
            other2: '삶',
        },
        {
            id: '1',
            time: '오후 9:10',
            title: '학교 기피증',
            department1: '이승',
            department2: '저승',
            other1: '죽음',
            other2: '삶',
        },
        {
            id: '2',
            time: '오후 9:10',
            title: '무지성 결제병',
            department1: '이승',
            department2: '저승',
            other1: '죽음',
            other2: '삶',
        },
    ];
    const styles = StyleSheet.create({
        month: {
            marginTop: 30,
            color: colors.blue[1],
            fontSize: 16,
            fontWeight: '700',
        }
    })
    return (
        <ScreenContainer>
            <ScrollView>
                <View style={{
                    backgroundColor: colors.mainColor,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                }}>
                    <ScreenContainerView style={{height: 101, marginBottom: 23,}}>
                        <AppText style={{
                            marginTop: 70,
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: '700',
                        }}>{userInfo.name + ' 님의 AI 진료 내역'}</AppText>
                    </ScreenContainerView>
                </View>
                <ScreenContainerView>
                    <View style={{marginVertical: 30}}>
                        <List.Section>
                            <List.Accordion
                                title="2022년 5월"
                                titleStyle={{color: '#53B3EE', fontSize: 16, fontWeight: '700'}}
                                theme={{colors: {text: '#53B3EE', primary: '#53B3EE'}}}
                                expanded={expanded}
                                onPress={handlePress}
                                style={{backgroundColor: "#ffffff", padding: -10, margin: -8}}>
                                <DiseasScrollHorizontal DATA={DATA} day={17} time={2}/>
                            </List.Accordion>
                        </List.Section>
                    </View>
                    <Button title={"임시 이동 버튼"} onPress={() => {
                        navigation.navigate('DiagnosisTop3')
                    }}/>
                </ScreenContainerView>

            </ScrollView>

        </ScreenContainer>
    );
}

const DiseasScrollHorizontal = ({DATA, day, time}) => {
    const styles = StyleSheet.create({
        item: {
            backgroundColor: 'rgba(75, 155, 204, 0.05)',
            height: 110,
            borderRadius: 10,
            width: 283,
            marginRight: 8,
            paddingHorizontal: 20,
            paddingTop: 8,
        },
        smallBorder: {
            borderRadius: 5,
            backgroundColor: "#53B3EE",
            width: 60,
            height: 17,
            justifyContent: "center",
            alignItems: "center"
        },
        smallText: {
            color: "#ffffff",
            fontSize: 11,
            fontWeight: '700',
        }
    })
    const Item = ({title, time, department1, department2, other1, other2}) => (
        <View style={styles.item}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <AppText style={{
                    fontSize: 16,
                    color: "#303030",
                    fontWeight: '700',
                }}>{time}</AppText>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.smallBorder}><AppText style={styles.smallText}>{department1}</AppText></View>
                    <View style={{marginLeft: 8}}/>
                    <View style={styles.smallBorder}><AppText style={styles.smallText}>{department2}</AppText></View>
                </View>
            </View>
            <AppText style={{
                fontSize: 16,
                color: "#303030",
                fontWeight: '700',
                marginTop: 16,
            }}>{title}</AppText>
            <View style={{
                height: 1,
                backgroundColor: 'rgba(48, 48, 48, 0.1)',
                marginTop: 16,
                marginBottom: 4,
            }}/>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <AppText style={{
                    fontSize: 11,
                    color: "rgba(48, 48, 48, 0.3)",
                    fontWeight: '700',
                }}>다른 진료결과</AppText>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <AppText style={{
                        fontSize: 11,
                        color: "rgba(48, 48, 48, 0.3)",
                        fontWeight: '700',
                    }}>{other1}, </AppText>
                    <AppText style={{
                        fontSize: 11,
                        color: "rgba(48, 48, 48, 0.3)",
                        fontWeight: '700',
                    }}>{other2}</AppText>
                </View>
            </View>
        </View>
    );
    const renderItem = ({item}) => (
        <Item title={item.title} time={item.time} department1={item.department1} department2={item.department2}
              other1={item.other1} other2={item.other2}/>
    );
    return (
        <View>
            <View style={{flexDirection: "row", marginTop: 17, marginBottom: 20}}>
                <AppText style={{fontSize: 14, fontWeight: '700'}}>{day}일</AppText>
                <AppText style={{
                    marginLeft: 16,
                    fontSize: 14,
                    fontWeight: '700',
                    color: "rgba(48, 48, 48, 0.3)"
                }}>진단 {time}회</AppText>
            </View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                key={3}
                keyExtractor={item => item.id}
                horizontal={true}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
            />
        </View>

    );
}

export default HistoryScreen;