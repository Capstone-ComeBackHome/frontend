import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";


const DiseaseInfoScreen = ({route, navigation}) => {
    const {colors} = useTheme();
    const {disease} = route.params;
    const styles = StyleSheet.create({

        titleContainer : {
            width : '100%',
            height : 200,
            paddingHorizontal: 20,
            justifyContent: "center",
            backgroundColor : colors.blue[4],
            borderRadius : 10,
        },
        container : {
            backgroundColor: colors.blue[2],
            marginVertical : 20,
            paddingVertical : 20,
            paddingHorizontal : 20,
            borderRadius : 10,

            justifyContent : "center"
        },
        diseaseName : {
            fontSize : 18,
        },
        title : {
            fontSize : 20
        },
        info : {
            fontSize : 18
        }
    })

    return (
        <ScreenContainer>
            <NavigationTop navigation={navigation}/>
            <ScrollView>
                <ScreenContainerView>
                    <View style={styles.titleContainer}>
                        <AppText style={styles.title}>병명</AppText>
                        <AppText style={styles.diseaseName}>{disease}</AppText>
                    </View>
                    <View style={styles.container}>
                        <AppText style={styles.title}>질병 정보</AppText>
                        <AppText style={styles.diseaseName}>부정맥</AppText>
                    </View>
                    <View style={styles.container}>
                        <AppText style={styles.title}>증상</AppText>
                        <AppText style={styles.diseaseName}>부정맥</AppText>
                    </View>
                    <View style={styles.container}>
                        <AppText style={styles.title}>발병 원인</AppText>
                        <AppText style={styles.diseaseName}>부정맥</AppText>
                    </View>
                    <View style={styles.container}>
                        <AppText style={styles.title}>병원 치료 방법</AppText>
                        <AppText style={styles.diseaseName}>부정맥</AppText>
                    </View>
                    <View style={styles.container}>
                        <AppText style={styles.title}>자가 치료 방법</AppText>
                        <AppText style={styles.diseaseName}>부정맥</AppText>
                    </View>
                    <View style={styles.container}>
                        <AppText style={styles.title}>합병증</AppText>
                        <AppText style={styles.diseaseName}>부정맥</AppText>
                    </View>
                </ScreenContainerView>
            </ScrollView>
        </ScreenContainer>
    );
}


export default DiseaseInfoScreen;