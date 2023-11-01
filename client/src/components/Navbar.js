import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
    const { logout } = useLogout()

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
                    <div>
                        <button onClick={handleClick}>Sair</button>
                    </div>
                    <div>
                        <Link to='/login'>Entrar</Link>
                        <Link to='/signup'>Criar conta</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar