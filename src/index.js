import React, { Component, useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Search from './Search'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Card from './Components/CardContent'
import Content_Section from './Content_Section'
import Reservation from "./Components/Reservations";
import SideBar from "./Components/SideBar";
import LogOutButton from "./Components/LogOutButton"
import {AuthContextProvider} from './Context/AuthContext'
import {useLogout} from "./AuthorizationHooks/useLogout"
import Login from "./Components/Login"
import { Link } from 'react-router-dom'
import BecomeHost from './Components/BecomeHost'
import Favourites from './Components/Favourites'
import 'bootstrap/dist/css/bootstrap.min.css';
/*
import {useNavigate} from "react-router-dom"

const navigate = useNavigate()

useEffect(()=>{
	if(!localStorage.getItem('token')) {
		navigate('/login')
	}
}, [])
	*/
	
if(localStorage.getItem('user'))
{

ReactDOM.render(<Search />,document.getElementById('search_id'))
ReactDOM.render(<AuthContextProvider><App /></AuthContextProvider>, document.getElementById('root'))
ReactDOM.render(<SideBar/>, document.getElementById('sidebar_id'))
ReactDOM.render(<AuthContextProvider><LogOutButton/></AuthContextProvider>,document.getElementById('logoutBUTTONDIVID'))
ReactDOM.render(<AuthContextProvider><BecomeHost/></AuthContextProvider>,document.getElementById('becomeHostDivID'))
ReactDOM.render(<Favourites/>,document.getElementById('favouritesID'))
console.log('ssss')
console.log(localStorage.getItem('user'))
}
else{
	ReactDOM.render(<AuthContextProvider><Login></Login></AuthContextProvider>
	, document.getElementById('root1'))
}

const links = document.querySelectorAll(".nav-link");
    links.forEach((link)=> {
    link.addEventListener("click", function(){
        links.forEach((e)=> {e.classList.remove('active')})
        this.classList.add('active')
        console.log("linkssss")
    })
})




//var express = require('express').Router;
//var router = express.Router();
/*

const jwt = require('react-jwt');

const auth = require('./middleware/auth');
var monk = require('monk');
const { response } = require('express');
var db = monk('http://localhost:4000/T_SignUp');

db.then(() => {
    console.log('Connected correctly to server')
  })
var collection = db.get('users');



router.get('/', function(req, res) {
	res.render('index', { title: 'Express'} );

});

//protected route
router.get('/welcome', auth, function(req, res) {
	res.json({ message: "Welcome!!" } );

});


router.post('/register', function(req, res) {
	
	const {username, email, password } = req.body;

	if(!(username && email && password)){

		res.json( { error: "All fields are required!" } );
	}
	else{

		collection.findOne({ email: email }, function(err, user){
			if (err) throw err;

			if (user){
				res.json({ error : "User already exists. Please login!"} );

			}
			else{
				let newUser = {
					username,
					email,
					password

				}
				collection.insert(newUser, function(err, user){
					
                     if (err) throw err;
					 var token = jwt.sign({ user_id: user._id, email}, 'secretkey');

					 if (token){
						user.token = token;

					 }
					 res.json(user);

				})


			}


		});	

	}



});

router.post('/login', function(req, res) {
	const {email, password } = req.body;

	if(!(email && password)){

		res.json({ error: "All fields are required!" } );
	}
	else{

		collection.findOne({ email: email }, function(err, user){
			if (err) throw err;
			if(user == null){

				res.json({ error: "User doesn't exist" } );

			}
			else{
				if (user.password === password ){
					var token = jwt.sign({ user_id: user._id, email}, 'secretkey');
					user.token = token;
					res.json(user);

				}
				else{
					res.json( {error: "User email or password is incorrect!" } );

				}

			}

		});

	}

});




module.exports = router;

*/
