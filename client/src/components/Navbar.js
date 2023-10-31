import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <header>
            <div className="container">
                <Link to='/'>
                    <h1>Barber SaaS</h1>
                </Link>
                <nav>
                    <div>
                        <Link to='/login'>Entrar</Link>
                        <Link to='signup'>Criar conta</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar