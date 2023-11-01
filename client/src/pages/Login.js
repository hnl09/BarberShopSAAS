import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {login, error, isLoading, hasEmailError, hasPasswordError} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault() // This prevents the page from refreshing on submit

        await login(email, password)
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
        <h3>Login</h3>

        <label>Email:</label>
        <input 
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={hasEmailError ? 'redErrorBorder' : ''}
        />
        <label>Senha:</label>
        <input 
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className={hasPasswordError ? 'redErrorBorder' : ''}
        />

        <button disabled={isLoading}>Entrar</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login