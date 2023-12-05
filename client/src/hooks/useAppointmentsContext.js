import { AppointmentsContext } from "../context/appointmentsContext";
import { useContext } from "react";

export const useAppointmentsContext = () => {
    const context = useContext(AppointmentsContext)

    if (!context) {
        throw Error('useAppointmentsContext must be used inside an AppointmentsContextProvider')
    }

    return context
}