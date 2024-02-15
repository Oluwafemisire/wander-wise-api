import { Link } from 'react-router-dom'
import '../App.css'
import './Navbar.css'
function Navbar(){

    return(
        <div className='nav-bar'>
            <div className="nav-container">
            <div className='nav-logo'>
            <strong>WanderWise</strong>
            </div>
            <div className="nav-offset">
                <div className='nav-links'>
                    <Link to={'/discover'}>Discover</Link>
                </div>
                <div className='nav-buttons'>
                    <button><Link to={'/signup'}>Sign up</Link></button>
                    <button className="secondary-button"><Link to={'/login'}>Login</Link></button>
                </div>
            </div>
        </div>
        </div>
        
    
    )
}

export default Navbar