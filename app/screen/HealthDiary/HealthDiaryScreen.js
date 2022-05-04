import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    ImageBackground, Platform, Alert, Text, Button,
    SafeAreaView
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Calendar} from "react-native-calendars";

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import CustomButton from "../../component/CustomButton";

import {List} from 'react-native-paper';

import score1 from '../../assets/images/disease/score1.png';
import score2 from '../../assets/images/disease/score2.png';
import score3 from '../../assets/images/disease/score3.png';
import score4 from '../../assets/images/disease/score4.png';
import score5 from '../../assets/images/disease/score5.png';

const AccordionView = () => {
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(state => !state);
    return (
        <List.Section>
            <List.Accordion
                title="2022년 5월"
                titleStyle={{color: '#53B3EE', fontSize: 16, fontWeight: '700'}}
                theme={{colors: {text: '#53B3EE', primary: '#53B3EE'}}}
                expanded={expanded}
                onPress={handlePress}
                style={{backgroundColor: "#ffffff", padding: -10, margin: -8}}>
                <DiaryData />
            </List.Accordion>
        </List.Section>
    )
}

const DiaryData = () => {
    const {colors} = useTheme();
    const styles = StyleSheet.create({
        diseaseTag: {
            borderRadius: 6,
            backgroundColor: '#13540f',
            height: 24,
            width: 60,
            alignItems: "center",
            justifyContent: 'center',
            marginRight: 10,
            marginBottom: 6
        }
    })


    const Keyword = ({keyword}) => {
        return (
            <View style={styles.diseaseTag}>
                <AppText style={{color: '#fff', fontWeight: '700'}}>{keyword}</AppText>
            </View>
        )
    }

    return (
        <View style={{
            backgroundColor: colors.blue[4],
            width: '100%',
            borderRadius: 10,
            padding: 20,
            marginBottom: 20
        }}>
            <AppText style={{fontWeight: '700', fontSize: 20, paddingBottom: 20}}>13일</AppText>
            <View style={{flexDirection: 'row'}}>
                <Image source={score1} style={{marginRight: 20}}/>
                <View flex={1}>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}}>
                        <Keyword keyword={"후두염"} />
                        <Keyword keyword={"후두염"} />
                        <Keyword keyword={"후두염"} />
                        <Keyword keyword={"후두염"} />
                        <Keyword keyword={"후두염"} />
                    </View>
                    <View>
                        <AppText>오늘은 적당히 아파요</AppText>
                    </View>
                </View>
            </View>
        </View>
    )
}

const HealthDiaryScreen = ({navigation, userInfo}) => {
    const {colors} = useTheme();

    return (
        <ScreenContainer>
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
                        fontWeight: '700'
                    }}>{userInfo.name + ' 님의 건강일기'}</AppText>
                </ScreenContainerView>
            </View>
            <ScrollView>
                <ScreenContainerView style={{marginTop: 20}}>
                    <AccordionView/>
                    <AccordionView/>
                    <AccordionView/>

                </ScreenContainerView>
            </ScrollView>

            <ScreenContainerView style={{marginBottom: 25}}>
                <CustomButton title={"새로운 건강일기 쓰기"} onPress={() => navigation.navigate('HealthDiaryCreate')}/>
            </ScreenContainerView>
        </ScreenContainer>
    );
}


export default HealthDiaryScreen;
