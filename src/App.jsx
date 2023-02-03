import React, {Component,useState,useEffect,Fragment} from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Property from './Components/Property_Listings';
import Login from './Components/Login';
import Register from './Components/Register';
import UpdateProperty from './Components/UpdateProperty'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {AuthContextProvider} from './Context/AuthContext'
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  




function App() {
  const [currentForm, setCurrentForm] = useState(0);
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  /* <Link to="/users/Login">Login</Link>
        <Link to="/users/Register">Register</Link> */

  
    return(
      <Router>
       
        <Property></Property>
       
        <br />
        <Routes>

          <Route path="/allReservations"/> 
          <Route path="/users/Register" element={<Register />}/>
          <Route path="/users/Login" element={<Login />}/>


        </Routes>
        <ToastContainer/>
      </Router>
       
    );
    }


export default App




/*
class App extends Component {
    

      componentDidMount(){

        fetch('http://localhost:3000/login', {
          method: "POST",
          headers : { 
            'Content-Type': 'application/json',
             'Accept': 'application/json'
          },
          body: JSON.stringify( {  // you will get user information from login form

            "email": "user1@gmail.com",
            "password": "123",

          } )
        })
        .then( res => res.json() )
        .then( (data) => { 
            console.log(data);

            let inMemoryToken = data.token;
            console.log(inMemoryToken);

            localStorage.setItem('user', JSON.stringify(data));

            
        })
        .catch((error) => {
          console.log(error.message);
        
        });


        //request to a protected route
        const localstorage_user = JSON.parse(localStorage.getItem('user'))

        fetch( "http://localhost:3000/welcome/", {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localstorage_user.token
                
            }

        })
        .then( res => res.json() )
        .then( res => console.log( res ) );
      


      } 

      render () {
         return (
            <div>Homepage...</div>

        );
 
      }
}

export default App;
*/
