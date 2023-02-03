import React, {Component,useState,useEffect,Fragment} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import ReactDOM from 'react-dom'
import App from './App'
import SearchPropert from './Components/SearchProperty';
import SearchApp   from './SearchApp';
 

function Search(){
    var [searchTerm,setSearchTerm] = useState('')
    return(
      /*  <input class="form-control text-center mr-sm-2" type="text" placeholder="Start Searching.." id="tg" aria-label="Search"
        onChange={(event)=>{setSearchTerm(event.target.value);  
            ReactDOM.render(<SearchPropert/>, document.getElementById('root'))
    }}> */
    <input class="form-control text-center mr-sm-2" type="text" placeholder="Start Searching.." id="tg" aria-label="Search"
      onChange={(event)=>{setSearchTerm(event.target.value);  
            ReactDOM.render(<SearchPropert/>, document.getElementById('root'))
    }}>
       

            </input>

    )
    
}
//export var abcc = abccc;

export default Search

