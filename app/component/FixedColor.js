import {DefaultTheme} from "@react-navigation/native";

const ColorTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        mainColor: 'rgba(83,179,238, 1.0)',
        backgroundColor: '#ffffff',
        blue: {
            1: 'rgba(83,179,238,1.0)',
            2: 'rgba(83,179,238,0.4)',
            3: 'rgba(83,179,238,0.5)',
            4: 'rgba(75,155,204,0.05)',
        },
        black: {
            1: 'rgba(48,48,48,1.0)',
            2: 'rgba(48,48,48,0.3)',
            3: 'rgba(48,48,48,0.1)',
            4: 'rgba(48,48,48,0.05)'
        }
    }
};

export default ColorTheme;