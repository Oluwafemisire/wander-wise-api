import './Dashboard.css'
import WeatherForecast from '../components/WeatherForecast'
import Destinations from '../components/Destinations'
import './SignUp.css'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Hotels from '../components/Hotels'


function Dashboard(){
  const navigator = useNavigate()

    const handleClick = ()=>{
        navigator('/discover')
    }
    
      const handleLogout = ()=>{
        localStorage.removeItem('token')
      }

    return(
        <>
        <div className="navbar">
            <div className="nav-logo" ><strong onClick={handleClick}> Discover</strong></div>
            <button className="secondary-button"><Link to={'/login'} onClick={handleLogout}>Logout</Link></button>
        </div>
        <div className='dashboard'>
        <WeatherForecast/>
        <h2>Available Hotels</h2>
        <Hotels/>
        <h2>Popular Attractions</h2>
        <Destinations/>
        </div>

   
        </>
    )
}

export default Dashboard