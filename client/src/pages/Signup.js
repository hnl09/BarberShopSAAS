import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [barberShopName, setBarberShopName] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault() // This prevents the page from refreshing on submit

        await signup(email, password)
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
        <h3>Registro</h3>

        <label>Email:</label>
        <input 
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />

        <label>Senha:</label>
        <input 
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        />
        
        <label>Nome:</label>
        <input 
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        />

        <label>Sobrenome:</label>
        <input 
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        />

        <label>Nome da Barbearia:</label>
        <input 
        type="text"
        onChange={(e) => setBarberShopName(e.target.value)}
        value={barberShopName}
        />

        <button disabled={isLoading}>Enviar</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup