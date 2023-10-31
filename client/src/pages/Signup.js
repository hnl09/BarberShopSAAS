import { useState } from "react"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault() // This prevents the page from refreshing on submit

        console.log(email, password)
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

        <button>Enviar</button>
        </form>
    )
}

export default Signup