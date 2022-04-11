import React from "react";
import AppText from "./AppText";
import {TouchableOpacity} from "react-native";
import {useTheme} from "@react-navigation/native";

// buttonStyle, textStyle
const customButton = ({buttonStyle, textStyle, onPress, title, ...props}) => {
    const {colors} = useTheme();

    return (
        <TouchableOpacity
            style={{
                backgroundColor : colors.mainColor,
                borderRadius : 12,

                // text 가운데로 오게
                alignItems : "center",
                justifyContent : 'center',

                // 그림자
                //IOS
                shadowColor: colors.black[3], //그림자색
                shadowOpacity: 0.2,//그림자 투명도
                shadowRadius : 6,
                shadowOffset: {width: 0, height: 0}, //그림자 위치

                //ANDROID
                elevation: 3
                , ...buttonStyle
            }}
            onPress={onPress}
            activeOpacity={props.activeOpacity || 0.8}
        >
            <AppText style={{
                marginVertical : 16,
                fontWeight : '700',
                fontSize: 16,
                color: "#fff",
                ...textStyle
            }}>
                {title}
            </AppText>
        </TouchableOpacity>
    )
};

export default customButton;