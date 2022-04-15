import React, {useContext} from "react";
import {Platform} from "react-native";
import ScreenContainer from '../../component/ScreenContainer'
import {WebView} from "react-native-webview";
import {AuthContext} from "../../context/AuthContextProviders";

const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(window.document.body.querySelector('pre').innerHTML);
})();`;

const GoogleWebviewScreen = () => {
    const { dispatch } = useContext(AuthContext);
    return (
        <ScreenContainer style={{flex: 1}}>
            <WebView
                source={{uri: 'http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/oauth2/authorization/google'}}
                userAgent={Platform.OS === 'android' ? 'Chrome/18.0.1025.133 Mobile Safari/535.19' : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'}
                originWhitelist={["https://*", "http://*", "file://*", "sms://*"]}
                scalesPageToFit={true}
                javaScriptEnabled={true}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={async (event) => {
                    console.log(event.nativeEvent.data);
                    if (event.nativeEvent.url.startsWith('http://ec2')) {
                        const data = event.nativeEvent.data;
                        const token = JSON.parse(data);
                        dispatch({type : 'SIGN_IN', token : token});
                        console.log('save token!');
                    }
                }}
            />
        </ScreenContainer>
    )
}

export default GoogleWebviewScreen;