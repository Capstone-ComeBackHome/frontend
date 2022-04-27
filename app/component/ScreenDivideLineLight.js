import React from 'react';
import {View} from "react-native";
import {useTheme} from "@react-navigation/native";

const ScreenDivideLineLight = (props) => {
    const {colors} = useTheme();

    return (
        <View style={{
            height: 1,
            backgroundColor: colors.black[3],
            marginVertical: props?.style?.marginVertical ? props.style.marginVertical : 26,
            flex : 1
        }}/>
    )
}

export default ScreenDivideLineLight;