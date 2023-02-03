import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Notyf} from 'notyf'
import 'notyf/notyf.min.css'
import ShowAndEditAProperty from './ShowAndEditAProperty';
import ReactDOM from 'react-dom'





const UpdateProperty1 = (props) => {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link)=> {
    link.addEventListener("click", function(){
        links.forEach((e)=> {e.classList.remove('active')})
        this.classList.add('active')
        console.log("linkssss")
    })
})

const notyf = new Notyf({
    duration: 5000,
    position: {
      x: 'right',
      y: 'center',
    },
    types: [
      {
        type: 'warning',
        background: 'indianred',
        text:'black',
        
      },
      {
        type: 'error',
        background: 'indianred',
        dismissible: true
      }
    ]
  });


const successToast =() => {
    notyf.open({
        type:'warning',
        message:"Success! Property Updated",

       
    });

}
const errorToast =() => {
    notyf.open({
        type:'error',
        message:"Success! Property Updated",
       
    });


}
const prop_id = props.name;

const current_user_details = localStorage.getItem('user');
console.log(current_user_details);

const current_user_details1 = JSON.parse(current_user_details);
console.log(current_user_details1.email);
const user_email = current_user_details1.email;


const [error, setError] = useState(null)
const [name, setName] = useState('')
const [city, setCity] = useState('')
const [desc, setDesc] = useState('')
const [price, setPrice] = useState('')
const [avail, setAvail] = useState('')

/*

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

*/


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
const handleChangeName = (e) => {
    setName(e.target.value);
}
const handleChangeCity = (e) => {
    setCity(e.target.value);
}
const handleChangeDesc = (e) => {
    setDesc(e.target.value);
}
const handleChangePrice = (e) => {
    setPrice(e.target.value);
}
const handleChangeAvail = (e) => {
    setAvail(e.target.value);
}


const handleSubmit = (e) => {
    e.preventDefault();
    if(name==''||
    city==''||
    desc==''||
    price==''||
    avail==''     )
    {
        setError("true")
    }
    else{
        setError()

    const {property_name,property_city, property_description,property_nightly_fare,is_available} = newProperty;
    console.log("here here")    
    console.log(name,city, property_description,property_nightly_fare,is_available)


    axios.post('/properties/updateProperty/'+prop_id, {
        property_name: name,
        property_city: city,
        property_description: desc,
        property_nightly_fare: price,
        is_available: avail

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
                value={name}
                onChange={handleChangeName}
               
            />
            </row>
            <row>
            <label>City:</label>

            <input 
                type="text"
                name="property_city"
                value={city}
                onChange={handleChangeCity}
                
               
            />
            </row>
            <row>
            <label>Description:</label>

            <input 
                type="textarea"
                name="property_description"
                value={desc}
                onChange={handleChangeDesc}

                
            />
            </row>
            <row>
            <label>Nightly Fare:</label>

            <input 
                type="text"
                name="property_nightly_fare"
                value={price}
                onChange={handleChangePrice}

             
            />
            </row>
            <row>
            <label>Is Available:</label>
            
            <input 
                type="text"
                name="is_available"
                value={avail}
                onChange={handleChangeAvail}

             
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

export default UpdateProperty1;
