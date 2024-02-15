import './Header.css'
import '../App.css'
import { Link } from 'react-router-dom'

function Header(){
    return(
            <div className='header-card'>
               <div className='header-content'>
                  <div className='header-text'>
                    <h1>WanderWise</h1>
                    Gather all the necessary information for your trip
                    </div>
                    <div className='header-actions'>
                    <button><Link to={'/signup'}>Sign up</Link></button>
                    <button className='secondary-button'><Link to={'/login'}>Login</Link></button>
                    </div> 
                </div> 
                <img className='header-image' src="/timo-stern-iUBgeNeyVy8-unsplash.jpg" alt="banner" />
            </div>
        
    )
}

export default Header