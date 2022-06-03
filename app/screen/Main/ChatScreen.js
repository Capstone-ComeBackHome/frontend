import React, {useState, useEffect, useCallback, useContext, useRef,} from 'react';
import {View, Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';

import ScreenContainer from '../../component/ScreenContainer';
import NavigationTop from "../../component/NavigationTop";
import {GiftedChat, Bubble} from 'react-native-gifted-chat';

import {AuthContext} from "../../context/AuthContextProviders";
import uuid from 'react-native-uuid';
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
    const [questions, setQuestions] = useState(null);
    const [questionOrder, setQuestionOrder] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [userAdditionalInfo, setUserAdditionalInfo] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [disable, setDisable] = useState(true);
    const [firstChatResult, setFirstChatResult] = useState();
    const [chatResult, setChatResult] = useState(null);
    const chatData = useRef({});

    useEffect(() => {
        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users/essential', {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then((res) => {
            if (res.result === 'SUCCESS') {
                setUserInfo(res.data);
                setFirstChatResult({
                    Age: res.data.age,
                    Sex: res.data.sex === 'MAN' ? '남성' : '여성',
                    Height: res.data.height,
                    Weight: res.data.weight
                })
            }
        }).catch(err => console.error(err))

        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users/medicine', {
            headers: {Authorization: `Bearer ${state.userToken.accessToken}`}
        }).then(response => response.json()).then((res) => {
            if (res.result === 'SUCCESS') {
                setUserAdditionalInfo(res.data);
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
            setFirstChatResult(data => ({
                ...data,
                'Chief complaint': messages[0].text
            }))

            setTimeout(() => {
                onSend([
                    {
                        _id: uuid.v4(),
                        text: '언제부터 아프셨나요?',
                        user: AI,
                    },
                ])
                setDisable(false);
            }, 0);
        } else if(messages.length === 6){
            setDisable(true);
            const body = {
                ...firstChatResult,
                Onset : messages[0].text
            }

            fetch('http://3.34.55.178:5000/predict/level2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(response => response.json()).then((res) => {
                setQuestions(res.QuestionsList);
                setQuestionOrder(res.QuestionsOrderList);
            }).catch(err => console.error(err))

            setFirstChatResult(body);
        }
        else if (questionOrder.length > 0) {
            if (messages[0].user.name === 'USER') {
                setDisable(true);
                chatData.current = {...chatData.current, [questionOrder[currentQuestion]]: messages[0].text};
                if (currentQuestion < questionOrder.length - 1) {
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
                        ...firstChatResult,
                        ...chatData.current
                    }
                    fetch('http://3.34.55.178:5000/predict/diagnosis', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    }).then(response => response.json()).then((res) => {
                        const diseaseNameList = res.diseasesList;
                        const body = JSON.stringify({diseaseNameList : diseaseNameList});

                        fetch('http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/v1/diagnoses', {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${state.userToken.accessToken}`,
                                Accept: 'application/json',
                                'Content-Type': 'application/json; charset=UTF-8'
                            },
                            body: body
                        }).then(response => response.json()).then((res) => {
                            if(res.result === 'SUCCESS'){
                                setChatResult(diseaseNameList);
                            }
                        }).catch(err => console.error(err))
                        // setTimeout(() => {
                        //     setChatResult(res.diseasesList);
                        // }, 2000)
                        // setChatResult(res.diseasesList);
                    })
                }
            }
        }
    }, [messages]);

    useEffect(() => {
        if (questionOrder.length > 0) {
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
            const order = questionOrder[currentQuestion];
            onSend([
                {
                    _id: uuid.v4(),
                    text: questions[order],
                    user: AI,
                },
            ]);
            setDisable(false);
        }
    }, [questionOrder, currentQuestion])

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
                                      onPress={() => navigation.replace('DiagnosisTop3', {diseaseList: chatResult})}/>
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