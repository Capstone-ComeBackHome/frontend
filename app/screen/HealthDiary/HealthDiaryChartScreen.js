import React, {useContext, useEffect, useState} from 'react';
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    View
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
import {VictoryChart, VictoryScatter, VictoryLine, VictoryAxis, VictoryTheme} from "victory-native";
import moment from "moment";

const HealthDiaryChartScreen = ({navigation}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);
    const [bubbleData, setBubbleData] = useState(null);
    const [lineData, setLineData] = useState(null);
    const [minDate, setMinDate] = useState();
    const [maxDate, setMaxDate] = useState();
    const [diseaseList, setDiseaseList] = useState();

    const styles = StyleSheet.create({
        title: {
            fontWeight: '700',
            fontSize: 22,
            marginBottom: 20,
            color: colors.blue[1],
            alignSelf : 'flex-start'
        },
        chartContainer: {
            marginVertical: 30,
            alignItems: 'center'
        }
    })
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        // 버블 차트(1달치)
        fetch(`http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/calendars/statistics/bubble`, {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then((res) => {
            if (res.result === 'SUCCESS') {
                const {bubbleResponseList} = res.data;
                const bubble = bubbleResponseList.map((data, index) => ({
                    x: data.diseaseType,
                    y: data.count,
                    amount: data.painAverage
                }))
                setBubbleData(bubble);
            }
        }).catch(err => console.error(err))

        // 꺾은선 그래프(3달치)
        fetch(`http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/calendars/statistics/line`, {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then((res) => {
            if (res.result === 'SUCCESS') {
                const typeToScore = {'WORST': 5, 'BAD': 4, 'NORMAL': 3, 'BETTER': 2, 'GOOD': 1}
                const lineChartData = [];
                const diseases = [];
                const dateList = [];
                for (let i = 1; i <= 3; i++) {
                    const key = `top${i}`;
                    diseases.push(res.data[key][0].diseaseName);
                    lineChartData.push(res.data[key].map(({painType, scheduleDate}) => {
                        const [year, month, day] = scheduleDate.split('-');
                        const date = new Date(year, month - 1, day);
                        dateList.push(date);
                        return {
                            score: typeToScore[painType],
                            date
                        }
                    }))
                }
                console.log(lineChartData);
                setLineData(lineChartData);
                setDiseaseList(diseases);
                setMaxDate(new Date(Math.max(...dateList)));
                setMinDate(new Date(Math.min(...dateList)));
            }
        }).catch(err => console.error(err))
    }, [])

    const chartColor = [colors.blue[1], '#ff8848', '#17bb82'];
    return (
        <>
            <ScreenContainer backgroundColor={colors.backgroundColor}>
                <NavigationTop navigation={navigation} title={"아픔일기 분석 차트"}/>
                <ScrollView>
                    <ScreenContainerView style={styles.chartContainer}>
                        <AppText style={styles.title}>최근 3개월 간 자주 나타난 증상</AppText>
                        {
                            lineData
                            &&
                            <>
                                <View style={{flexDirection : 'row', marginTop : 20}}>
                                    {
                                        diseaseList && diseaseList.map((disease, index) => {
                                            return<View key={index} style={{flexDirection : 'row', marginHorizontal : 16}}>
                                                <AppText style={{fontSize: 20, color : colors.black[2]}}>
                                                    <AppText style={{color : chartColor[index]}}>{index + 1}</AppText>
                                                    위 </AppText>
                                                <AppText style={{fontSize : 16}} key={index}>{disease}</AppText>
                                            </View>
                                        })
                                    }
                                </View>

                                <VictoryChart
                                    scale={{ x: "time" }}
                                    domain={{ y: [0, 5] }}
                                    animate={{
                                        duration: 300,
                                    }}
                                    width={windowWidth} theme={VictoryTheme.material}>
                                    {
                                        lineData && lineData.map((data, index) =>
                                            <VictoryLine key={index} data={data} x="date" y="score" style={{ data: { stroke: chartColor[index] } }}/>
                                        )
                                    }
                                </VictoryChart>

                            </>

                        }
                    </ScreenContainerView>
                    <ScreenDivideLineLight/>
                    <ScreenContainerView style={styles.chartContainer}>
                        <AppText style={styles.title}>최근 한 달 부위 별 증상 정도</AppText>
                        {
                            bubbleData && (<>
                                    <VictoryChart width={windowWidth}>
                                        <VictoryScatter data={bubbleData}
                                                        style={{data: {fill: colors.blue[2]}}}
                                                        theme={VictoryTheme.material}
                                                        domain={{amount: [0, 5]}}
                                                        bubbleProperty="amount"
                                                        maxBubbleSize={30}
                                                        minBubbleSize={10}
                                        />
                                    </VictoryChart>
                                </>
                            )
                        }
                        <AppText style={{marginTop : 10, alignSelf: 'flex-end'}}>
                            <View>
                                <AppText style={{marginBottom: 10, fontSize: 14}}>-  y : 부위 별 증상 발현 빈도수</AppText>
                                <AppText style={{fontSize: 14}}>-  버블의 크기 : 아픔 평균치</AppText>
                            </View>
                        </AppText>
                    </ScreenContainerView>
                </ScrollView>
            </ScreenContainer>
        </>
    );
}


export default HealthDiaryChartScreen;