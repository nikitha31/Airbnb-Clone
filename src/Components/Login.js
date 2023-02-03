import { useLogin } from "../AuthorizationHooks/useLogin"
import {Link} from 'react-router-dom';
import {AuthContextProvider} from '../Context/AuthContext'
import ReactDOM from 'react-dom'



import React, {useState} from "react";
import Register from "./Register";

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email,password)
        console.log(email,password)


    }
    
    return(
        <div className="login">
            <div className="login-container">
                <h2>Login</h2>
        <form className = "login-form" onSubmit={handleSubmit}>

            <label>Email:</label>
            <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
            <label>Password:</label>
            <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />

            <button disabled={isLoading}> Login </button>
            {error && <div className="error">{error}</div>}
        </form>


        <button className="click-to-register-button" onClick={() => ReactDOM.render(<AuthContextProvider><Register></Register></AuthContextProvider>
	, document.getElementById('root1'))} >Don't have an account? Register here</button>
        </div>
        </div>
    )

}

export default Login