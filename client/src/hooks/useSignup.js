import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [hasEmailError, setHasEmailError] = useState(false)
    const [hasPasswordError, setHasPasswordError] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, firstName, lastName, barberShopName, telephone) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            barberShopName: barberShopName,
            telephone: telephone
        })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            let errors = json.errors.join(', ')
            setError(errors)
            setHasEmailError(true)

            if (errors.includes('Email')) {
                setHasEmailError(true)
            }
            if (!errors.includes("Email")) {
                setHasEmailError(false)
            }
            if (errors.includes('Password')){
                setHasPasswordError(true)
            }
            if (!errors.includes('Password')){
                setHasPasswordError(false)
            }

        }

        if (response.ok) {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // Update the auth context
            dispatch({type: 'LOGIN', paylod: json})

            setIsLoading(false)
        }
    }

    return { signup, isLoading, error, hasEmailError, hasPasswordError }
}