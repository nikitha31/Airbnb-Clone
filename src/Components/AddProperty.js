import React, { useState } from 'react';
import axios from 'axios';
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'


const AddProperty = () => {
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
    notyf.success("Success! Property Added");

}
const errorToast =() => {
    notyf.error("Unable to add Property. Try Again !");


}

const current_user_details = localStorage.getItem('user');
console.log(current_user_details);

const current_user_details1 = JSON.parse(current_user_details);
console.log(current_user_details1.email);
const user_email = current_user_details1.email;



const [error, setError] = useState(null)

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newProperty.property_name==''||
        newProperty.property_city==''||
        newProperty.property_image==''||
        newProperty.property_description==''||
        newProperty.property_nightly_fare==''     )
        {
            setError("true")
        }
        else{
            setError()

        const formData = new FormData();
        formData.append('property_name', newProperty.property_name);
        formData.append('property_city', newProperty.property_city);
        formData.append('property_image', newProperty.property_image);
        formData.append('property_description', newProperty.property_description);

        formData.append('property_nightly_fare', newProperty.property_nightly_fare);
        formData.append('property_owner', user_email)


        axios.post('/properties/add', formData)
             .then(res => {
                console.log(res);
                successToast();


             })
             .catch(err => {
                console.log(err);
                errorToast();
             });
            }
    }

    const handleChange = (e) => {
        setNewProperty({...newProperty, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewProperty({...newProperty, property_image: e.target.files[0]});
    }




    return (
        <div>
        <div className='addProp'>
        <div className="addProp-container">
        <h2>Add a Property</h2>


        <form className='addProp-form' onSubmit={handleSubmit} encType='multipart/form-data'>
            
            <row>
            <label>Property Name:</label>
            <input 
             type="text"
                name="property_name"
                value={newProperty.property_name}
                onChange={handleChange}
               
            />
            </row>
            <row>
            <label>City:</label>

            <input 
                type="text"
                name="property_city"
                value={newProperty.property_city}
                onChange={handleChange}
                
               
            />
            </row>
            <row>
            <label>Description:</label>

            <input 
                type="textarea"
                name="property_description"
                value={newProperty.property_description}
                onChange={handleChange}
                
            />
            </row>
            <row>
            <label>Nightly Fare:</label>

            <input 
                type="text"
                name="property_nightly_fare"
                value={newProperty.property_nightly_fare}
                onChange={handleChange}
             
            />
            </row>
            <row>
            <label>Upload Image of your property:</label>
            
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="property_image"
                onChange={handlePhoto}

            />
            </row>

            <button 
             className='click-to-add'   type="submit"
            >Add Property</button>
            {error && <div className="error">All Fields are mandatory</div>}

        </form>
        </div>
        </div>
        </div>
    );
}

export default AddProperty;
