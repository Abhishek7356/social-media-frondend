import React, { createContext, useReducer } from 'react'
import { reducer } from './ContextReducers';

export const DispatchProvider = createContext();
export const StateProvider = createContext();

function AuthContext({ children }) {

    const initialState = {
        user: JSON.parse(localStorage.getItem("user"))
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(state);

    return (
        <DispatchProvider.Provider value={dispatch}>
            <StateProvider.Provider value={state}>
                {children}
            </StateProvider.Provider>
        </DispatchProvider.Provider>
    )
}

export default AuthContext