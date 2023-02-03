import React, { useState , useEffect} from 'react';
import axios from 'axios';
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'


const UpdateProperty = (props) => {

   

    console.log(props)
      
    const notyf = new Notyf()
    const successToast =() => {
        notyf.success("Success ! You are host now");

    }
    const errorToast =() => {
        notyf.error("Error! Unable to make you host. Please try again");

    }
    const prop_id = props.name;
    console.log(prop_id)
    
    const [name, setName] = useState(null);
    const [city, setCity] = useState(null);
    const [desc, setDesc] = useState(null);
    const [price, setPrice] = useState(null);
    const [is_available, setAvailable] = useState(null);

    
    useEffect(() => {
        getPr();

      }, []);

      const getPr = async () =>{
        const response = await fetch('/properties/'+prop_id,{
            method: 'GET'
        })
        const json = await response.json()
        console.log("ress")

        console.log(JSON.stringify(json))
        console.log(json.property_name)
        setName(json.property_name)
        setCity(json.property_city)
        setDesc(json.property_description)
        setPrice(json.property_nightly_fare)
        setAvailable(json.is_available)
        
       /*
        document.getElementById("name_id").value = json.property_name
        document.getElementById("city_id").value = json.property_city
        document.getElementById("desc_id").value = json.property_description
        document.getElementById("price_id").value = json.property_nightly_fare
        document.getElementById("is_available_id").value = json.is_available
*/


       };

       const [newProperty, setNewProperty] = useState(
        {
            property_name: name,
            property_city: city,
            property_description:desc,
            property_nightly_fare:price,
            is_available:is_available
    
        }
    );
      
const [error, setError] = useState(null)


const handleSubmit = (e) => {
    e.preventDefault();
    if(newProperty.property_name==''||
    newProperty.property_city==''||
    newProperty.property_description==''||
    newProperty.property_nightly_fare==''      )
    {
        setError("true")
    }
    else{
        setError()

    const formData1 = new FormData();
    formData1.append('property_name', newProperty.property_name);
    formData1.append('property_city', newProperty.property_city);
    formData1.append('property_description', newProperty.property_description);
    formData1.append('property_nightly_fare', newProperty.property_nightly_fare);
    formData1.append('is_available', newProperty.is_available);

    console.log("for,")
    console.log(formData1.property_name)
    console.log(formData1.property_city)
    console.log(formData1.property_description)
    console.log(formData1.property_nightly_fare)
    console.log(formData1.is_available)
    console.log(newProperty.property_name)
    console.log(newProperty.property_city)
    console.log(newProperty.property_description)
    console.log(newProperty.property_nightly_fare)
    console.log(newProperty.is_available)




    axios.post('/properties/updateProperty/'+prop_id, formData1)
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


return (
    <div>
    <div className='addProp'>
    <div className="addProp-container">
    <h2>Edit Property</h2>


    <form className='addProp-form' onSubmit={handleSubmit} encType='multipart/form-data'>
        
        <row>
        <label>Property Name:</label>
        <input 
         type="text"
         id="name_id"
            name="property_name"
            onChange={handleChange}
            value={newProperty.property_name}
           
        />
        </row>
        <row>
        <label>City:</label>

        <input 
            type="text"
            name="property_city"
            id="city_id"
            onChange={handleChange}
            value={newProperty.property_city}

            
           
        />
        </row>
        <row>
        <label>Description:</label>

        <input 
            type="textarea"
            name="property_description"
            id="desc_id"
            onChange={handleChange}
            value={newProperty.property_description}

            
        />
        </row>
        <row>
        <label>Nightly Fare:</label>

        <input 
            type="text"
            name="property_nightly_fare"
            id="price_id"
            onChange={handleChange}
            value={newProperty.property_nightly_fare}

         
        />
        </row>
        <row>
        <label>Is Available:</label>
        
        <input 
            type="text" 
            name="is_available"
            id="is_available_id"
            onChange={handleChange}
            value={newProperty.is_available}



        />
        </row>

        <button 
         className='click-to-add'   type="submit"
        >Update Property</button>
        {error && <div className="error">All Fields are mandatory</div>}

    </form>
    </div>
    </div>
    </div>
);

   


}

export default UpdateProperty;