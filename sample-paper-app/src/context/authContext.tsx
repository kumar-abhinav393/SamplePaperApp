import { authReducer } from "../reducers/authReducer"
import type { AuthState } from "../types/types"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase.config"
import React, { useEffect, useReducer, type ReactNode } from "react"

export const AuthContext = React.createContext<AuthState>({
    user: null,
    authIsReady: false,
    pending: false,
    dispatch: () => {},
})

export const AuthContextProvider = ({ children } : { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false,
        pending: false,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                dispatch({ type: "AUTH_IS_READY", payload: user })
            } else {
                dispatch({ type: "AUTH_IS_READY", payload: null })
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}