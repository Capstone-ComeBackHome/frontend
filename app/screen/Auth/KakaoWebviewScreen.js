import React from "react";
import ScreenContainer from '../../component/ScreenContainer'
import {WebView} from "react-native-webview";

const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(window.document.body.querySelector('pre').innerHTML);
})();`;

const KakaoWebviewScreen = ({navigation}) => {
    return (
        <ScreenContainer style={{flex: 1}}>
            <WebView
                originWhitelist={['*']}
                scalesPageToFit={false}
                source={{uri: 'http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/oauth2/authorization/kakao'}}
                javaScriptEnabled={true}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={(event) => {
                    if(event.nativeEvent.url.startsWith('http://ec2')){
                        navigation.navigate('Main', {screen : 'Home'})
                        const data = event.nativeEvent.data;
                        const res = JSON.parse(data.replace('\\',""))
                        console.log(res.accessToken)
                        console.log(res.refreshToken)
                    }
                }}
            />
        </ScreenContainer>
    )
}

export default KakaoWebviewScreen;