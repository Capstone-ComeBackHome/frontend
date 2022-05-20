import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import CustomButton from "../../component/CustomButton";


const ChatResultScreen = ({route, navigation}) => {
    const {colors} = useTheme();
    const [diseaseList, setDiseaseList] = useState(route.params.diseaseList);

    return (
        <ScreenContainer>
            <NavigationTop title={"AI 분석 결과"}/>
            <ScreenContainerView flex={1} style={{alignItems: 'center', justifyContent: 'center'}}>
                <View style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    {
                        diseaseList.map((disease, index) =>
                            <TouchableOpacity
                                key={index}
                                style={{
                                    ...styles.buttonStyle,
                                    ...styles.textStyle,
                                    backgroundColor: colors.blue[index + 1]
                                }}
                                onPress={() => navigation.navigate('DiseaseInfo', {disease})}>
                                <View style={{alignItems: 'flex-start', width: 200}}>
                                    <AppText style={{fontSize: 20}}>{disease}</AppText>
                                    <AppText>의심이 됩니다.</AppText>
                                </View>
                            </TouchableOpacity>)
                    }
                </View>
            </ScreenContainerView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: 300,
        height: '30%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius : 10
    },
    textStyle: {
        fontSize: 18,
    }
})

export default ChatResultScreen;