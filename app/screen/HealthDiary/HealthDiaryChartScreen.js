import React, {useContext, useEffect, useState} from 'react';
import {
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import ScreenContainerView from '../../component/ScreenContainerView';
import NavigationTop from "../../component/NavigationTop";
import ScreenDivideLineLight from "../../component/ScreenDivideLineLight"


{/*Images*/
}
import score1 from '../../assets/images/disease/score1.png';
import score2 from '../../assets/images/disease/score2.png';
import score3 from '../../assets/images/disease/score3.png';
import score4 from '../../assets/images/disease/score4.png';
import score5 from '../../assets/images/disease/score5.png';
import {AuthContext} from "../../context/AuthContextProviders";
import {VictoryChart, VictoryScatter, VictoryLine, VictoryTheme} from "victory-native";

const HealthDiaryChartScreen = ({navigation}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);
    const [bubbleData, setBubbleData] = useState(null);
    const [lineData, setLineData] = useState(null);

    const styles = StyleSheet.create({
        title: {
            color: colors.black[1],
            fontWeight: '700',
            fontSize: 16,
            marginBottom: 20
        },
        chartContainer: {
            marginVertical: 30,
            alignItems: 'center'
        }
    })
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        // 꺾은선 그래프(3달치)
        fetch(`http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/calendars/statistics/line`, {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then((res) => {
            if (res.result === 'SUCCESS') {
                console.log(res.data);
                const typeToScore = {'WORST': 1, 'BAD': 2, 'NORMAL': 3, 'BETTER': 4, 'GOOD': 5}
                const lineChartData = [];
                for (let i = 1; i <= 3; i++) {
                    const key = `top${i}`;
                    lineChartData.push(res.data[key].map(({painType, scheduleDate}) => {
                        return {
                            score: typeToScore[painType],
                            date: scheduleDate
                        }
                    }))
                }

                console.log(lineChartData);
                setLineData(lineChartData);

            }
        }).catch(err => console.error(err))

        fetch(`http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/calendars/statistics/bubble`, {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then((res) => {
            if (res.result === 'SUCCESS') {
                const {bubbleResponseList} = res.data;
                // const data = []
                // let sum = bubbleResponseList.reduce((prev, curr) => prev + curr.count, 0);
                // bubbleResponseList.forEach(({count, diseaseType, painAverage}) => {
                //     data.labels.push(diseaseType);
                //     data.data.push(count/sum);
                // })
                // console.log(data);
                // setBubbleData(data);
                console.log(bubbleResponseList);
                const bubble = bubbleResponseList.map((data, index) => ({
                    x: data.diseaseType,
                    y: data.count,
                    amount: data.painAverage * 100
                }))
                setBubbleData(bubble);
            }
        }).catch(err => console.error(err))
    }, [])

    return (
        <>
            <ScreenContainer backgroundColor={colors.backgroundColor}>
                <NavigationTop navigation={navigation} title={"아픔일기 분석 차트"}/>
                <ScrollView>
                    <ScreenContainerView style={styles.chartContainer}>
                        <AppText style={styles.title}>최근 한 달 부위 별 증상 정도</AppText>
                        {
                            bubbleData && (<>
                                    <VictoryChart width={windowWidth}>
                                        <VictoryScatter data={bubbleData}
                                                        style={{data: {fill: colors.blue[2]}}}
                                                        theme={VictoryTheme.material}
                                                        domain={{y: [0, 5]}}
                                                        bubbleProperty="amount"
                                                        maxBubbleSize={30}
                                                        minBubbleSize={5}/>
                                    </VictoryChart>
                                </>
                            )
                        }
                    </ScreenContainerView>
                    <ScreenDivideLineLight/>
                    <ScreenContainerView style={styles.chartContainer}>
                        <AppText style={styles.title}>최근 세 달 간 가장 높은 빈도 질병의 증상 추이 </AppText>
                        {
                            lineData &&
                            <VictoryChart width={windowWidth} theme={VictoryTheme.material} domain={{y: [0, 5]}}>
                                <VictoryLine data={lineData[0]} x="date" y="score"/>
                                <VictoryLine data={lineData[1]} x="date" y="score"/>
                                <VictoryLine data={lineData[2]} x="date" y="score"/>
                            </VictoryChart>
                        }
                    </ScreenContainerView>
                </ScrollView>
            </ScreenContainer>
        </>
    );
}


export default HealthDiaryChartScreen;