import React, {useState, useEffect, useCallback,} from 'react';
import {Button, ScrollView, View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AppText from '../../component/AppText';
import ScreenContainer from '../../component/ScreenContainer';
import NavigationTop from "../../component/NavigationTop";
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';

import {request} from "../../api/api";


const ChatScreen = ({navigation}) => {
    const {colors} = useTheme();
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: '언제부터 증상이 시작되었나요?',
                user: {
                    _id: 2,
                    name: 'React Native',
                },
            },
        ])
    }, []);
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const [questions, setQuestions] = useState({});

    return (
        <ScreenContainer>
            <NavigationTop title={"AI 진료실"}/>
            <View style={{paddingTop: 13}}/>
            <GiftedChat
                renderAvatar={() => null}
                renderDay={() => null}
                renderTime = {() => null}
                alignTop={true}
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />

        </ScreenContainer>
    );
}

const renderBubble = props => (
    <Bubble
        {...props}
        wrapperStyle={{
            left: {
                backgroundColor: '#53B3EE',
                borderTopLeftRadius: 5,
                padding: 7,
            },
            right: {
                backgroundColor: '#F5F5F5',
                borderTopRightRadius: 5,
                padding: 7,
            },
        }}
        textStyle={{
            left: {
                color: '#fff',
                fontWeight : '700'
            },
            right: {
                color: '#303030',
                fontWeight : '700'
            },
        }}
    />
)

export default ChatScreen;