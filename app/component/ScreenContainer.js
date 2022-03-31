import React from 'react'
import {SafeAreaView, Platform} from "react-native";
import {useTheme} from "@react-navigation/native";

const ScreenContainer = props => {
    const {colors} = useTheme();

    return (
        <SafeAreaView flex={1} style={{
            ...props.style,
            backgroundColor: props.backgroundColor || colors.backgroundColor,
            paddingTop: Platform.OS === 'android' ? 25 : 0,
        }}>
            {props.children}
        </SafeAreaView>
    )
}

export default ScreenContainer;