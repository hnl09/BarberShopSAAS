import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return(
        <header>
            <div className="container">
                <Link to='/'>
                    <h1>Barber SaaS</h1>
                </Link>
                <nav>
                {user && ( 
                    <div className="navbar-user">
                        <p>Olá, {user.email}</p>
                        <button onClick={handleClick}>Sair</button>
                    </div>)}
                {!user && (
                    <div>
                        <Link to='/login'>Entrar</Link>
                        <Link to='/signup'>Criar conta</Link>
                    </div>
                )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar