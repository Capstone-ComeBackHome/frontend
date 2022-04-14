import React, {createContext, useReducer} from 'react';
import * as SecureStore from "expo-secure-store";

// reducer
const initialState = {
    isLoading: true,
    isSignOut: false,
    userToken: null,
}

const reducer = async (prevState, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            console.log('reducer restore token!');
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
            };
        case 'SIGN_IN':
            console.log('reducer sign in!');
            await SecureStore.setItemAsync('token', action.token);
            return {
                ...prevState,
                isSignOut: false,
                userToken: action.token,
            };
        case 'SIGN_OUT':
            console.log('reducer sign out!');
            await SecureStore.deleteItemAsync('token');
            return {
                ...prevState,
                isSignOut: true,
                userToken: null,
            };
        case 'TEST':
            console.log('TEST!')
    }
}

export const AuthContext = createContext({
    state: {
        isLoading: true,
        isSignOut: false,
        userToken: null,
    },
    dispatch: () => { console.log('default...')}
});

export const AuthContextProviders = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState, () => initialState);
    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
};