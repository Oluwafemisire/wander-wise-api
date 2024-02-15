// import { AppContext } from "../App"
// import { useContext } from "react"
import Discover from "../pages/Discover"

import { Navigate } from "react-router-dom"
Navigate

function PrivateRoute(){

    const token = localStorage.getItem('token');
    console.log(token)
    return(
        token ? <Discover/> : <Navigate to={'/login'}/>
    )
}

export default PrivateRoute