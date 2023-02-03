import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'

export const useSignup =() => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    
    const notyf = new Notyf()
    const successToast =() => {
        notyf.success("Registration Successful, Please Login");

    }
    const errorToast =() => {
        notyf.error("Error! Please correct the errors and try again");

    }




    const register = async (email,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/users/register',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})
        })
        const json = await response.json()

        if(!response.ok)
        {
            setIsLoading(false)
            setError(json.error)
            errorToast();
        }
        if(response.ok)
        {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update authcontext
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false);
            successToast();

        }

    }

    return { register, isLoading, error}
}
