import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <header>
            <div className="container">
                <Link to='/'>
                    <h1>Gerenciamento de barbearia</h1>
                </Link>
                <nav>
                    <div>
                        <Link to='/login'>
                            <h1>Entrar</h1>
                        </Link>
                        <Link to='signup'>
                            <h1>Criar conta</h1>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar