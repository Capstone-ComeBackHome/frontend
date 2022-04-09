import React from "react";
import ScreenContainer from '../../component/ScreenContainer'
import {WebView} from "react-native-webview";

const NaverWebviewScreen = () => {
    return (
        <ScreenContainer style={{flex: 1}}>
            <WebView
                originWhitelist={['*']}
                scalesPageToFit={true}
                source={{uri: 'http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/oauth2/authorization/naver'}}
                javaScriptEnabled={true}
                onMessage={(event) => {
                    console.log(event.nativeEvent.url);
                    fetch(event.nativeEvent.url).then(reponse => JSON.parse(reponse)).then(data => console.log(data)).catch(err => console.error(err))
                }}
            />
        </ScreenContainer>
    )
}

export default NaverWebviewScreen;