import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        // Removing user from local storage
        localStorage.removeItem('user')

        // Dispatch logout action
        dispatch({type: 'LOGOUT'})
    }

    return { logout }
}