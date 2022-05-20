import React, {useState, useEffect, useCallback, useContext, useRef,} from 'react';
import {Button, ScrollView, View, StyleSheet, Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import NavigationTop from "../../component/NavigationTop";
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';

import {request} from "../../api/api";
import {AuthContext} from "../../context/AuthContextProviders";
import uuid from 'react-native-uuid';
import questionData from '../../assets/question.json';
import CustomButton from "../../component/CustomButton";
import ScreenContainerView from "../../component/ScreenContainerView";

const renderBubble = props => {

    return (
        <Bubble
            {...props}
            wrapperStyle={{
                left: {
                    backgroundColor: '#53B3EE',
                    borderTopLeftRadius: 5,
                    padding: 7,
                },
                right: {
                    backgroundColor: '#f2f2f2',
                    borderTopRightRadius: 5,
                    padding: 7,
                },
            }}
            textStyle={{
                left: {
                    color: '#fff',
                    fontWeight: '700'
                },
                right: {
                    color: '#303030',
                    fontWeight: '700'
                },
            }}
        />
    )
}

const AI = {
    _id: 1,
    name: 'AI'
}
const USER = {
    _id: 2,
    name: 'USER',
}


const ChatScreen = ({navigation}) => {
    const {colors} = useTheme();
    const {state, dispatch} = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [disable, setDisable] = useState(true);
    const [chatResult, setChatResult] = useState(null);
    const chatData = useRef({});

    useEffect(() => {
        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users/essential', {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then((res) => {
            if (res.result === 'SUCCESS') {
                setUserInfo(res.data);
            }
        }).catch(err => console.error(err))

        setTimeout(() => {
            onSend([
                {
                    _id: uuid.v4(),
                    text: '지금부터 AI 진료를 시작합니다.',
                    user: AI,
                },
            ])
        }, 1000);
        setTimeout(() => {
            onSend([
                {
                    _id: uuid.v4(),
                    text: '진료 중 뒤로가거나 앱 종료 시 상담 내용이 저장되지 않으니 유의하시기 바랍니다.',
                    user: AI,
                },
            ])
        }, 2000);
        setTimeout(() => {
            onSend([
                {
                    _id: uuid.v4(),
                    text: '가장 큰 증상을 말해주세요.',
                    user: AI,
                },
            ])
            setDisable(false);
        }, 3000);
    }, []);

    useEffect(async () => {
        if (messages.length === 4) { // 유저가 처음 입력했을 때
            setDisable(true);
            const body = {
                'Chief complaint': messages[0].text,
                Age: userInfo.age,
                Sex: userInfo.sex === 'MAN' ? '남성' : '여성',
                Height: userInfo.height,
                Weight: userInfo.weight
            }
            setUserInfo(body);
            fetch('http://3.34.55.178:5000/predict/level2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(response => response.json()).then((res) => {
                setQuestions(Object.entries(questionData[res.level2]));
            }).catch(err => console.error(err))
        } else if (questions.length > 0) {
            if (messages[0].user.name === 'USER') {
                setDisable(true);
                chatData.current = {...chatData.current, [questions[currentQuestion][0]]: messages[0].text};
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(cur => cur + 1);
                } else {
                    onSend([
                        {
                            _id: uuid.v4(),
                            text: "모든 질문이 끝났습니다. 분석이 진행중입니다.",
                            user: AI,
                        },
                    ])

                    const body = {
                        ...userInfo,
                        ...chatData.current
                    }
                    fetch('http://3.34.55.178:5000/predict/diagnosis', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    }).then(response => response.json()).then((res) => {
                        setTimeout(() => {
                            setChatResult(res.diseasesList);
                        }, 2000)
                        // setChatResult(res.diseasesList);
                    })
                }
            }
        }
    }, [messages]);

    useEffect(() => {
        if (questions.length > 0) {
            // setTimeout(() => {
            //     onSend([
            //         {
            //             _id: uuid.v4(),
            //             text: questions[currentQuestion][1],
            //             user: AI,
            //         },
            //     ])
            //     setDisable(false);
            // }, 1000)
            onSend([
                {
                    _id: uuid.v4(),
                    text: questions[currentQuestion][1],
                    user: AI,
                },
            ])
            setDisable(false);
        }
    }, [questions, currentQuestion])

    const generateAnswer = async (message) => {
        try {
            // const response = await fetch(CHAT_URL, {
            //     method: 'POST',
            //     headers: {
            //         Authorization: ENDPOINT_KEY,
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         question: message,
            //     })
            // })
            // const json = await response.json();
            // const responseMessages = {
            //     _id: uuid.v4(),
            //     text: json.answers[0].answer,
            //     createdAt: new Date(),
            //     user: BOT,
            // }
            // /* レスポンスをmessagesに追加 */
            // setMessages(previousMessages => GiftedChat.append(previousMessages, responseMessages))
        } catch (error) {
            console.error(error);
        }
    }

    const onSend = useCallback((msg = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
    }, [])


    return (
        <ScreenContainer>
            <NavigationTop title={"AI 진료실"}/>
            <View style={{paddingTop: 13}}/>
            <GiftedChat
                renderAvatar={() => null}
                renderDay={() => null}
                renderTime={() => null}
                alignTop={true}
                messages={messages}
                renderBubble={renderBubble}
                onSend={onSend}
                user={USER}
                renderInputToolbar={disable ? () => null : undefined}
            />
            {
                chatResult && (
                    <ScreenContainerView style={{marginBottom : 20}}>
                        <CustomButton title={"분석 결과 보기"}
                                      buttonStyle={{backgroundColor : colors.blue[2]}}
                                      textStyle={{fontWeight : '700', color : colors.black[1]}}
                                      onPress={() => navigation.navigate('DiagnosisTop3', {diseaseList: chatResult})}/>
                    </ScreenContainerView>
                )
            }
            {
                Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding"/>
            }
        </ScreenContainer>
    );
}


export default ChatScreen;