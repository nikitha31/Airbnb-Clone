import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'


export const useLogin =() => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email,password) => {
        setIsLoading(true)
        setError(null)
        const notyf = new Notyf()
   
    const errorToast =() => {
        notyf.error("Login Failed! Please correct the errors and try again");

    }

        const response = await fetch('/users/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})
        })
        const json = await response.json()

        if(!response.ok)
        {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok)
        {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update authcontext
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false);
            console.log('logged in');
            window.location.reload(false);

        

        }

    }

    return { login, isLoading, error}
}
