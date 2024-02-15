import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './SignUp.css'
import { AppContext } from "../App"
import HOST from "../helpers/host"



function Login(){
    const navigator = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setUserName,setToken} = useContext(AppContext)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const jsonData = {
            "email": email,
            "password": password
        }
        try {
            const response = await fetch(HOST+'/api/users/login', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(jsonData)
            });
        
            if (response.ok) {
              const data = await response.json();
              setUserName(data.user.userName);
              setToken(data.token)
              localStorage.setItem('token', data.token);
              console.log(data);
              navigator('/discover');
            } else {
              alert('Incorrect Details');
              console.log(response)
              throw new Error('Incorrect Credentials');
            }
          } catch (error) {
            console.log(error);
          }
    }

    const handleClick = ()=>{
        navigator('/')
    }
    return(
        <div>
        <div className="navbar">
            <div className="nav-logo" onClick={handleClick}><strong>WanderWise</strong></div>
            <div className="nav-text"> Do not have an account yet? <Link to={'/signup'}>Sign Up</Link></div>
        </div>
        <div className="content">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input name="email" type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <button type="submit">Login</button>
            </form>
        </div>
        <div className="footer">
            wanderwise 2023
        </div>
        </div>
        
    )
}

export default Login