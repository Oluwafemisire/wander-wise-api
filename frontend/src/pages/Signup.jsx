import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import './SignUp.css'
import  { AppContext } from "../App"
import { useContext } from "react"
import HOST from "../helpers/host"



function SignUp(){
    const navigator = useNavigate()
    const {setToken} = useContext(AppContext)
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const jsonData = {
            "userName": username,
            "email": email,
            "password": password
        }
        try {
            const response = await fetch(HOST+'/api/users/signup', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(jsonData)
            });
        
            if (response.ok) {
              const data = await response.json();
              setToken(data.token);
              localStorage.setItem('token', data.token);
              console.log(data);
              navigator('/discover');
            } else {
              alert('Incorrect Details');
              throw new Error('Incorrect Credentials');
            }
          } catch (error) {
            console.log(error);
          }
    }

    const handleClick = ()=>{
        navigator('/')
    }

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return(
        <div>
        <div className="navbar">
            <div className="nav-logo" onClick={handleClick}><strong>WanderWise</strong></div>
            <div className="nav-text">Already have an account? <Link to={'/login'}>Log in</Link></div>
        </div>
        <div className="content">
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label> 
                <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} name="username"/>
                <label htmlFor="email">Email</label>
                <input name="email" type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
        <div className="footer">
            wanderwise 2023
        </div>
        </div>
        
    )
}

export default SignUp