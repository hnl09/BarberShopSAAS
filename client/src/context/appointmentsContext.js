import { createContext, useReducer } from "react";

export const AppointmentsContext = createContext()

export const appointmentsReducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_APPOINTMENT':
            return {
                appointments: action.payload
            }
        default:
            return state
    }
}

export const AppointmentsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appointmentsReducer, {
        appointments: null
    })

    return (
        <AppointmentsContext.Provider value={{...state, dispatch}}>
            { children }
        </AppointmentsContext.Provider>
    )
}