import React, {useState, useEffect} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    Text,
    FlatList,
    SafeAreaView
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';

import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import ScreenDivideLineLight from "../../component/ScreenDivideLineLight"
import CustomButton from '../../component/CustomButton';

{/*Images*/
}
import score1 from '../../assets/images/disease/score1.png';
import score2 from '../../assets/images/disease/score2.png';
import score3 from '../../assets/images/disease/score3.png';
import score4 from '../../assets/images/disease/score4.png';
import score5 from '../../assets/images/disease/score5.png';
import { MaterialIcons } from '@expo/vector-icons';


const HealthDiaryScreen = ({navigation}) => {
    const {colors} = useTheme();
    const [text, onChangeText] = React.useState("시간이 줄줄 흐른다");
    const DATA = [
        {
            id: '0',
            title: '건망증',
        },
        {
            id: '1',
            title: '기민상태',
        },
        {
            id: '2',
            title: '재채기',
        },
        {
            id: '3',
            title: '후두염',
        },
        {
            id: '4',
            title: '가슴 답답',
        },
        {
            id: '5',
            title: '속이 쓰림',
        },
    ];

    const styles = StyleSheet.create({
        inputTitle: {
            color: colors.black[1],
            fontWeight: '700',
            fontSize: 16
        },
        inputSubTitle: {
            color: colors.black[1],
            fontWeight: '700',
            fontSize: 14,
            marginBottom: 14,
        },
        inputBox: {
            height: 92,
            flex: 1,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#4B9BCC0D",
            borderColor: "#53B3EE",
            marginBottom: 66,
            color: colors.black[1],
            fontWeight: '700',
            textAlignVertical: 'top',
            paddingTop: 10,
            paddingLeft: 16,
        },
        item: {
            backgroundColor: '#7ACCB5',
            flex : 1,
            height : 47,
            marginHorizontal : 4,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
        },
        title: {
            fontSize: 14,
            color: "#FFFFFF",
        },


    })
    const Item = ({title}) => (
        <View style={styles.item}>
            <AppText style={styles.title}>{title}</AppText>
        </View>
    );
    const renderItem = ({item}) => (
        <Item title={item.title}/>
    );
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
                    <View style={{flexDirection:'row', justifyContent:'space-between',alignItems : 'center'}}>
                        <AppText style={styles.inputTitle}>증상부위 및 질환선택</AppText>
                        <TouchableOpacity onPress={() => navigation.navigate('HealthDiaryEdit')}>
                            <MaterialIcons name="keyboard-arrow-right" size={32} color="#53B3EE"/>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginBottom : 17}}/>
                    <FlatList
                        columnWrapperStyle={{justifyContent: 'space-around', marginBottom: 8}}
                        data={DATA}
                        renderItem={renderItem}
                        key={2}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                        numColumns={2}
                    />
                </ScreenContainerView>
                <ScreenDivideLineLight/>
                <ScreenContainerView style={{flexDirection: "column",}}>
                    <View style={{marginBottom: 14}}>
                        <AppText style={styles.inputSubTitle}>메모</AppText>
                        <TextInput
                            style={styles.inputBox}
                            onChangeText={onChangeText}
                            value={text}
                        />
                    </View>
                    <CustomButton title={"수정하기"}
                                  buttonStyle={{width: '100%', bottom: 0}}/>
                    <View style={{marginTop: 38}}/>
                </ScreenContainerView>
            </ScrollView>
        </ScreenContainer>
    );
}

{/*토글 기능을 쓰려면 뭘로 바꿔야 하나요? 우선은 TouchableOpacity로 사용해봤습니다 (껍데기만 만드려고 해서)*/
}

const ImageWithText = ({imageName, text, color, ...props}) => {
    const [toggle, setToggle] = useState(false);
    const toggleFunction = () => {
        setToggle(!toggle);
    };
    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            backgroundColor: toggle  ? color : '#ffffff',
            borderColor : toggle ? color : '#4D303030',
            borderWidth: 1,
            width: 60,
            height: 16.9,
            marginTop: 12,
            borderRadius: 5,
        },
        switchText: {
            fontSize: 11,
            color: toggle  ? "#ffffff" : "#4D303030"
        },
    })
    return (
        <View style={{flexDirection: "column", alignItems: "center"}}>
            <Image source={imageName}/>
            <TouchableOpacity style={styles.container} onPress={() => toggleFunction()}>
                <AppText style={styles.switchText}>{text}</AppText>
            </TouchableOpacity>
        </View>
    )
};

export default HealthDiaryScreen;