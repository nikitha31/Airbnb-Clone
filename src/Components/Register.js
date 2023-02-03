import React, { useState } from "react"
import { useSignup } from "../AuthorizationHooks/useRegister"
import ReactDOM from 'react-dom'
import {AuthContextProvider} from '../Context/AuthContext'
import Login from "./Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {register, isLoading , error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email,password)
        await register(email, password)
    }
    
    return(
        <div className="register">
                        <div className="register-container">
        <h2>Register</h2>
        <form className = "register-form" onSubmit={handleSubmit}>

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

            <button disabled={isLoading}> Register </button>
            {error && <div className="error">{error}</div>}
        </form>
        <button className="click-to-login-button" onClick={()=>ReactDOM.render(<AuthContextProvider><Login></Login></AuthContextProvider>
	, document.getElementById('root1'))}  >Already have an account? Login here</button>
        </div>
        </div>
    )

}

export default Register