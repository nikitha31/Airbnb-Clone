import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'
import ShowAndEditAProperty from './ShowAndEditAProperty';
import ReactDOM from 'react-dom'



const DeleteProperty = (props) => {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link)=> {
    link.addEventListener("click", function(){
        links.forEach((e)=> {e.classList.remove('active')})
        this.classList.add('active')
        console.log("linkssss")
    })
})
const notyf = new Notyf()

const successToast =() => {
    notyf.success("Success! Property Deleted");

}
const errorToast =() => {
    notyf.error("Unable to delete Property. Please try Again !");


}
const [error, setError] = useState(null)

const [name, setName] = useState('')
const [city, setCity] = useState('')
const [desc, setDesc] = useState('')
const [price, setPrice] = useState('')
const [avail, setAvail] = useState('')
const prop_id = props.name;


const [newProperty, setNewProperty] = useState(
    {
        property_name: '',
        property_city: '',
        property_image: '',
        property_description:'',
        property_nightly_fare:'',    
        property_owner: ''        

    }
);


 
useEffect(() => {
    getPropData();

  }, []);
    const getPropData = async () =>{
        const response = await fetch('/properties/'+prop_id,{
            method: 'GET'
        })
        const json = await response.json()
        console.log("ress")

        console.log(JSON.stringify(json))
        console.log(json.property_name)
        
        setNewProperty({
            property_name: json.property_name,
            property_city: json.property_city,
            property_description:json.property_description,
            property_nightly_fare:json.property_nightly_fare,
            is_available:json.is_available

        });
        setName(json.property_name);
        setCity(json.property_city);
        setDesc(json.property_description);
        setPrice(json.property_nightly_fare);
        setAvail(json.is_available);
  
}

const handleTakeBack = (e) =>{

}


const handleSubmit = (e) => {
    e.preventDefault();
    

    const {property_name,property_city, property_description,property_nightly_fare,is_available} = newProperty;
    console.log("here here")    
    console.log(name,city, property_description,property_nightly_fare,is_available)


    axios.post('/properties/softDelete/'+prop_id, {
        is_deleted : true

    })
         .then(res => {
            console.log(res);
            successToast();
            ReactDOM.render(<ShowAndEditAProperty/>, document.getElementById('root'));


         })
         .catch(err => {
            console.log(err);
            errorToast();
         });
        
}


    return (
        <div>
        <div className='addProp'>
        <div className="addProp-container">
        <h2>Are you sure you want to delete this property ?</h2>


        <form className='addProp-form' onSubmit={handleSubmit} encType='multipart/form-data'>
            
            <row>
            <label>Property Name:</label>
            <label style={{'color':'black'}}>{name}</label>
            
            </row>
            <row>
            <label>City:</label>
            <label style={{'color':'black'}}>{city}</label>

            </row>
            <row>
            <label>Description:</label>
            <label style={{'color':'black'}}>{desc}</label>

            </row>
            <row>
            <label>Nightly Fare:</label>

            <label style={{'color':'black'}}>{price}</label>

            </row>
            <row>
            <label>Is Available:</label>
            <label style={{'color':'black'}}>{avail.toString()}</label>

            </row>

            <button 
             className='click-to-add'   type="submit" onClick={handleSubmit}
            >Yes, Delete</button><button 
            className='click-to-add'   type="submit" onClick={handleTakeBack}
           >Cancel</button>
            {error && <div className="error">All Fields are mandatory</div>}

        </form>
        </div>
        </div>
        </div>
    );
}

export default DeleteProperty;
