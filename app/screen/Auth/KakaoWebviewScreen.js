import React, {useContext} from "react";
import ScreenContainer from '../../component/ScreenContainer'
import {WebView} from "react-native-webview";
import * as SecureStore from 'expo-secure-store';
import {AuthContext} from "../../context/AppContextProviders";

const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(window.document.body.querySelector('pre').innerHTML);
})();`;

const KakaoWebviewScreen = ({navigation}) => {
    const { dispatch } = useContext(AuthContext);
    return (
        <ScreenContainer style={{flex: 1}}>
            <WebView
                originWhitelist={['*']}
                scalesPageToFit={true}
                source={{uri: 'http://ec2-3-37-4-131.ap-northeast-2.compute.amazonaws.com:8080/api/oauth2/authorization/kakao'}}
                javaScriptEnabled={true}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={async (event) => {
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

export default KakaoWebviewScreen;